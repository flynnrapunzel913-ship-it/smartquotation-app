import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultRate: number;
  imagePath?: string | null;
  hsnCode?: string;
}

interface Props {
  onClose: () => void;
}

export default function ProductManagerModal({ onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"catalog" | "add" | "upload">("catalog");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    category: "",
    defaultRate: "" as string | number,
    hsnCode: "",
    imagePath: ""
  });
  const [addFormData, setAddFormData] = useState({
    name: "",
    description: "",
    category: "MACHINE",
    defaultRate: "" as string | number,
    hsnCode: "",
    imagePath: ""
  });
 
  useEffect(() => {
    fetchProducts(0);
  }, []);
 
  const fetchProducts = async () => {
    setLoading(true);
    try {
      let allProducts: Product[] = [];
      let pageNum = 0;
      let hasMore = true;
      
      while (hasMore) {
        const res = await fetch(`/api/cleantech/products?limit=100&offset=${pageNum * 100}`);
        if (!res.ok) {
          console.error("API request failed with status:", res.status);
          break;
        }
        const data = await res.json();
        if (data.products && Array.isArray(data.products)) {
          allProducts = [...allProducts, ...data.products];
          setProducts(allProducts); // Update UI progressively
          setTotal(data.total);
          
          if (allProducts.length >= data.total || data.products.length < 100) {
            hasMore = false;
          } else {
            pageNum++;
          }
        } else {
          console.error("API did not return products array:", data);
          break;
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/cleantech/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    if (!editingProduct) return;
    try {
      const res = await fetch(`/api/cleantech/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData)
      });
      if (res.ok) {
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert("Failed to save changes");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch("/api/cleantech/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addFormData,
          defaultRate: parseFloat(addFormData.defaultRate.toString() || "0")
        })
      });
      if (res.ok) {
        setAddFormData({
          name: "",
          description: "",
          category: "MACHINE",
          defaultRate: "",
          hsnCode: "",
          imagePath: ""
        });
        setActiveTab("catalog");
        fetchProducts();
      } else {
        alert("Failed to create product");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      
      const productsToUpload = data.map((row: any) => {
        const hsnCode =
          row["HSN"] ??
          row["Hsn"] ??
          row["hsn"] ??
          row["HSN Code"] ??
          row["Hsn Code"] ??
          row["hsnCode"] ??
          row["HSNCODE"] ??
          "";
        const normalizedHsn = hsnCode !== null && hsnCode !== undefined ? String(hsnCode).trim() : "";
        
        return {
          name: row["Name"] || row["name"],
          description: row["Description"] || row["description"] || "",
          category: (row["Type"] || row["type"] || "MACHINE").toString().toUpperCase(),
          defaultRate: parseFloat(row["Price"] || row["price"] || "0"),
          hsnCode: normalizedHsn,
        };
      });

      const res = await fetch("/api/cleantech/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productsToUpload)
      });
      if (res.ok) {
        alert("Products uploaded successfully");
        setActiveTab("catalog");
        fetchProducts();
      } else {
        alert("Failed to upload products");
      }
    };
    reader.readAsBinaryString(file);
  };

  const getMissingFields = (p: Product) => {
    const missing = [];
    if (!p.name) missing.push("Product Name");
    if (!p.description) missing.push("Description");
    if (!p.category) missing.push("Product Type");
    if (!p.defaultRate) missing.push("Unit Price");
    if (!p.hsnCode) missing.push("HSN Code");
    if (!p.imagePath) missing.push("Product Image");
    return missing;
  };

  const filteredProducts = Array.isArray(products) ? products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || p.category === filterType;
    return matchesSearch && matchesType;
  }) : [];

  if (!isAuthenticated) {
    return (
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
        <div style={{ background: "white", padding: "32px", borderRadius: "16px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <h3 style={{ margin: "0 0 8px 0", fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}>Admin Access Required</h3>
            <p style={{ fontSize: "0.875rem", color: "#64748b", margin: 0 }}>Please enter the admin password to manage products.</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input 
              type="password" 
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "12px 16px", 
                border: "1px solid #e2e8f0", 
                borderRadius: "10px", 
                fontSize: "0.875rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                transition: "border-color 0.2s"
              }}
              placeholder="Enter password"
            />
            {passwordError && <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "6px", fontWeight: "500" }}>{passwordError}</p>}
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button 
              onClick={onClose} 
              style={{ 
                flex: 1,
                padding: "12px", 
                background: "white", 
                color: "#475569", 
                border: "1px solid #e2e8f0", 
                borderRadius: "10px", 
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.875rem",
                transition: "all 0.2s"
              }}
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                if (adminPassword === "AdminSecure@12#") {
                  setIsAuthenticated(true);
                } else {
                  setPasswordError("Incorrect password!");
                }
              }}
              style={{ 
                flex: 1,
                padding: "12px", 
                background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)", 
                color: "white", 
                border: "none", 
                borderRadius: "10px", 
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.875rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s"
              }}
            >
              Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "white", padding: "32px", borderRadius: "16px", width: "90%", maxWidth: "1200px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "700", color: "#0f172a" }}>Product Catalog Management</h2>
          <button 
            onClick={onClose} 
            style={{ 
              background: "#fee2e2", 
              color: "#dc2626", 
              border: "none", 
              padding: "8px 16px", 
              borderRadius: "8px", 
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.875rem",
              transition: "all 0.2s"
            }}
          >
            Close
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", borderBottom: "1px solid #e2e8f0", paddingBottom: "12px" }}>
          <button 
            onClick={() => setActiveTab("catalog")}
            style={{ 
              padding: "10px 20px", 
              background: activeTab === "catalog" ? "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)" : "transparent", 
              color: activeTab === "catalog" ? "white" : "#64748b", 
              border: "none", 
              borderRadius: "8px",
              cursor: "pointer", 
              fontWeight: "600",
              fontSize: "0.875rem",
              transition: "all 0.2s"
            }}
          >
            Catalog
          </button>
          <button 
            onClick={() => setActiveTab("add")}
            style={{ 
              padding: "10px 20px", 
              background: activeTab === "add" ? "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)" : "transparent", 
              color: activeTab === "add" ? "white" : "#64748b", 
              border: "none", 
              borderRadius: "8px",
              cursor: "pointer", 
              fontWeight: "600",
              fontSize: "0.875rem",
              transition: "all 0.2s"
            }}
          >
            Add Product
          </button>
          <button 
            onClick={() => setActiveTab("upload")}
            style={{ 
              padding: "10px 20px", 
              background: activeTab === "upload" ? "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)" : "transparent", 
              color: activeTab === "upload" ? "white" : "#64748b", 
              border: "none", 
              borderRadius: "8px",
              cursor: "pointer", 
              fontWeight: "600",
              fontSize: "0.875rem",
              transition: "all 0.2s"
            }}
          >
            Upload Excel
          </button>
        </div>

        {activeTab === "catalog" && (
          <div>
            <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
              <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  padding: "12px 16px", 
                  border: "1px solid #e2e8f0", 
                  borderRadius: "10px", 
                  flex: 1,
                  fontSize: "0.875rem",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                }}
              />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ 
                  padding: "12px 16px", 
                  border: "1px solid #e2e8f0", 
                  borderRadius: "10px",
                  background: "white",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                }}
              >
                <option value="all">All Types</option>
                <option value="MACHINE">Machines</option>
                <option value="SPARE">Spare Parts</option>
              </select>
            </div>

            {loading ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading products...</div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    <th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Image</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Name</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Type</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>HSN</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Price</th>
                    <th style={{ padding: "14px 16px", textAlign: "left", borderBottom: "2px solid #e2e8f0", fontSize: "0.75rem", fontWeight: "700", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #e2e8f0", transition: "background 0.2s" }}>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ width: "50px", height: "50px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                          {p.imagePath ? (
                            <img 
                              src={p.imagePath.startsWith("/") ? p.imagePath : `/${p.imagePath}`} 
                              alt={p.name} 
                              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
                            />
                          ) : (
                            <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "500" }}>No Image</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: "600", color: "#1e293b", fontSize: "0.875rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          {p.name}
                          {getMissingFields(p).length > 0 && (
                            <span 
                              title={`Incomplete product.\nMissing:\n${getMissingFields(p).map(f => `• ${f}`).join("\n")}\nClick Edit to complete this product.`}
                              style={{ color: "#ef4444", cursor: "help", fontSize: "14px" }}
                            >
                              ⚠️
                            </span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#64748b", maxWidth: "320px", wordBreak: "break-word" }}>
                        {(p.description || "").split("\n").join(" ").length > 100 ? (p.description || "").split("\n").join(" ").slice(0, 100) + "..." : (p.description || "").split("\n").join(" ")}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "0.875rem", color: "#0f172a" }}>
                        <span style={{ 
                          padding: "4px 8px", 
                          borderRadius: "6px", 
                          fontSize: "0.75rem", 
                          fontWeight: "600",
                          background: p.category === "MACHINE" ? "#e0f2fe" : "#fef3c7",
                          color: p.category === "MACHINE" ? "#0369a1" : "#b45309"
                        }}>
                          {p.category}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#64748b", fontSize: "0.875rem" }}>{p.hsnCode || "N/A"}</td>
                      <td style={{ padding: "14px 16px", fontWeight: "700", color: "#0f172a", fontSize: "0.875rem" }}>₹ {p.defaultRate.toLocaleString()}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button 
                            onClick={() => {
                              setEditingProduct(p);
                              setEditFormData({
                                name: p.name,
                                description: p.description,
                                category: p.category,
                                defaultRate: p.defaultRate,
                                hsnCode: p.hsnCode || "",
                                imagePath: p.imagePath || ""
                              });
                            }}
                            style={{ 
                              padding: "6px 12px", 
                              background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)", 
                              color: "white", 
                              border: "none", 
                              borderRadius: "6px", 
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "0.75rem",
                              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                            }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(p.id)}
                            style={{ 
                              padding: "6px 12px", 
                              background: "#fee2e2", 
                              color: "#dc2626", 
                              border: "none", 
                              borderRadius: "6px", 
                              cursor: "pointer",
                              fontWeight: "600",
                              fontSize: "0.75rem"
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        )}

        {activeTab === "add" && (
          <div style={{ maxWidth: "600px" }}>
            <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}>Add New Product</h3>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product Name *</label>
              <input 
                type="text" 
                value={addFormData.name}
                onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.875rem", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}
                placeholder="Enter product name"
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Description *</label>
              <textarea 
                value={addFormData.description}
                onChange={(e) => setAddFormData({ ...addFormData, description: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.875rem", minHeight: "100px", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}
                placeholder="Enter product description"
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product Type *</label>
              <select 
                value={addFormData.category}
                onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.875rem", background: "white", cursor: "pointer", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}
              >
                <option value="MACHINE">Machine</option>
                <option value="SPARE">Spare Part</option>
              </select>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Unit Price *</label>
              <input 
                type="number" 
                value={addFormData.defaultRate}
                onChange={(e) => setAddFormData({ ...addFormData, defaultRate: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.875rem", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}
                placeholder="0.00"
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>HSN Code</label>
              <input 
                type="text" 
                value={addFormData.hsnCode}
                onChange={(e) => setAddFormData({ ...addFormData, hsnCode: e.target.value })}
                style={{ width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.875rem", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" }}
                placeholder="Enter HSN code"
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (evt) => {
                      setAddFormData({ ...addFormData, imagePath: evt.target?.result as string });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                style={{ width: "100%", padding: "12px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "0.875rem" }}
              />
              {addFormData.imagePath && (
                <div style={{ marginTop: "12px", width: "120px", height: "120px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src={addFormData.imagePath} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
              )}
            </div>
            <button 
              onClick={handleCreate}
              style={{ 
                padding: "12px 24px", 
                background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)", 
                color: "white", 
                border: "none", 
                borderRadius: "10px", 
                cursor: "pointer", 
                fontWeight: "600",
                fontSize: "0.875rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                transition: "all 0.2s"
              }}
            >
              Create Product
            </button>
          </div>
        )}

        {activeTab === "upload" && (
          <div style={{ maxWidth: "600px" }}>
            <h3 style={{ marginTop: 0, marginBottom: "12px", fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}>Upload Excel</h3>
            <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "24px", lineHeight: "1.6" }}>
              Upload an Excel file to bulk import products. The file should have the following columns:
              <br />
              <strong style={{ color: "#0f172a" }}>Name, Description, Type, Price, HSN</strong>
            </p>
            <div style={{ 
              border: "2px dashed #cbd5e1", 
              padding: "40px", 
              borderRadius: "12px", 
              textAlign: "center", 
              background: "#f8fafc",
              transition: "all 0.2s",
              cursor: "pointer"
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = "#4f46e5"}
            onMouseOut={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
            >
              <input 
                type="file" 
                accept=".xlsx, .xls" 
                onChange={handleFileUpload}
                style={{ display: "block", margin: "0 auto", fontSize: "0.875rem", color: "#64748b" }}
              />
              <p style={{ marginTop: "12px", fontSize: "0.75rem", color: "#94a3b8" }}>Supported formats: .xlsx, .xls</p>
            </div>
          </div>
        )}
      </div>

      {editingProduct && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100
        }}>
          <div style={{
            background: "white",
            padding: "32px",
            borderRadius: "16px",
            width: "100%",
            maxWidth: "500px",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          }}>
            <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: "1.25rem", fontWeight: "700", color: "#0f172a" }}>Edit Product</h3>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product Name</label>
              <input 
                type="text" 
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.875rem" }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Description</label>
              <textarea 
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.875rem", minHeight: "100px" }}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product Type</label>
              <select 
                value={editFormData.category}
                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.875rem", background: "white", cursor: "pointer" }}
              >
                <option value="MACHINE">Machine</option>
                <option value="SPARE">Spare Part</option>
              </select>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Unit Price</label>
              <input 
                type="number" 
                value={editFormData.defaultRate}
                onChange={(e) => setEditFormData({ ...editFormData, defaultRate: parseFloat(e.target.value) })}
                style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.875rem" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>HSN Code</label>
              <input 
                type="text" 
                value={editFormData.hsnCode}
                onChange={(e) => setEditFormData({ ...editFormData, hsnCode: e.target.value })}
                style={{ width: "100%", padding: "10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "0.875rem" }}
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "0.85rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>Product Image</label>
              {editFormData.imagePath && (
                <div style={{ marginBottom: "12px", position: "relative", width: "100px", height: "100px" }}>
                  <img 
                    src={editFormData.imagePath.startsWith("data:") ? editFormData.imagePath : editFormData.imagePath.startsWith("/") ? editFormData.imagePath : `/${editFormData.imagePath}`} 
                    alt="Preview" 
                    style={{ width: "100%", height: "100%", objectFit: "contain", border: "1px solid #e2e8f0", borderRadius: "8px" }} 
                  />
                  <button 
                    onClick={() => setEditFormData({ ...editFormData, imagePath: "" })}
                    style={{ position: "absolute", top: "-5px", right: "-5px", background: "#ef4444", color: "white", border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}
                  >
                    ×
                  </button>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (evt) => {
                    setEditFormData({ ...editFormData, imagePath: evt.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }}
                style={{ fontSize: "0.875rem" }}
              />
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button 
                onClick={() => setEditingProduct(null)}
                style={{ 
                  padding: "10px 20px", 
                  background: "white", 
                  color: "#475569", 
                  border: "1px solid #e2e8f0", 
                  borderRadius: "8px", 
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.875rem"
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                style={{ 
                  padding: "10px 20px", 
                  background: "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)", 
                  color: "white", 
                  border: "none", 
                  borderRadius: "8px", 
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

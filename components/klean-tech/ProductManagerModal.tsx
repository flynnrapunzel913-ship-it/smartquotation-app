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
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
        <div style={{ background: "white", padding: "20px", borderRadius: "8px", width: "400px" }}>
          <h3 style={{ marginTop: 0 }}>Admin Access Required</h3>
          <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "15px" }}>Please enter the admin password to manage products.</p>
          <input 
            type="password" 
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px", marginBottom: "10px" }}
            placeholder="Enter password"
          />
          {passwordError && <p style={{ color: "#ef4444", fontSize: "12px", marginBottom: "10px" }}>{passwordError}</p>}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button onClick={onClose} style={{ padding: "8px 16px", background: "#cbd5e1", color: "#334155", border: "none", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
            <button 
              onClick={() => {
                if (adminPassword === "AdminSecure@12#") {
                  setIsAuthenticated(true);
                } else {
                  setPasswordError("Incorrect password!");
                }
              }}
              style={{ padding: "8px 16px", background: "#0f172a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "white", padding: "20px", borderRadius: "8px", width: "90%", maxWidth: "1200px", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0 }}>Product Catalog Management</h2>
          <button onClick={onClose} style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}>Close</button>
        </div>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #e2e8f0" }}>
          <button 
            onClick={() => setActiveTab("catalog")}
            style={{ padding: "10px 20px", background: activeTab === "catalog" ? "#0f172a" : "transparent", color: activeTab === "catalog" ? "white" : "#475569", border: "none", cursor: "pointer", fontWeight: "500" }}
          >
            Catalog
          </button>
          <button 
            onClick={() => setActiveTab("add")}
            style={{ padding: "10px 20px", background: activeTab === "add" ? "#0f172a" : "transparent", color: activeTab === "add" ? "white" : "#475569", border: "none", cursor: "pointer", fontWeight: "500" }}
          >
            Add Product
          </button>
          <button 
            onClick={() => setActiveTab("upload")}
            style={{ padding: "10px 20px", background: activeTab === "upload" ? "#0f172a" : "transparent", color: activeTab === "upload" ? "white" : "#475569", border: "none", cursor: "pointer", fontWeight: "500" }}
          >
            Upload Excel
          </button>
        </div>

        {activeTab === "catalog" && (
          <div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
              <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px", flex: 1 }}
              />
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{ padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              >
                <option value="all">All Types</option>
                <option value="MACHINE">Machines</option>
                <option value="SPARE">Spare Parts</option>
              </select>
            </div>

            {loading ? (
              <p>Loading products...</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Image</th>
                    <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Name</th>
                    <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Description</th>
                    <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Type</th>
                    <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>HSN</th>
                    <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Price</th>
                    <th style={{ padding: "10px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => (
                    <tr key={p.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                      <td style={{ padding: "10px" }}>
                        <div style={{ width: "40px", height: "40px", background: "#f1f5f9", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                          {p.imagePath ? (
                            <img 
                              src={p.imagePath.startsWith("/") ? p.imagePath : `/${p.imagePath}`} 
                              alt={p.name} 
                              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
                            />
                          ) : (
                            <span style={{ fontSize: "10px", color: "#94a3b8" }}>No Image</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "10px", display: "flex", alignItems: "center", gap: "5px" }}>
                        {p.name}
                        {getMissingFields(p).length > 0 && (
                          <span 
                            title={`Incomplete product.\nMissing:\n${getMissingFields(p).map(f => `• ${f}`).join("\n")}\nClick Edit to complete this product.`}
                            style={{ color: "#ef4444", cursor: "help", fontSize: "16px" }}
                          >
                            ❗
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "10px", fontSize: "12px", color: "#555", maxWidth: "320px", wordBreak: "break-word" }}>
                        {(p.description || "").split("\n").join(" ").length > 100 ? (p.description || "").split("\n").join(" ").slice(0, 100) + "..." : (p.description || "").split("\n").join(" ")}
                      </td>
                      <td style={{ padding: "10px" }}>{p.category}</td>
                      <td style={{ padding: "10px" }}>{p.hsnCode || "N/A"}</td>
                      <td style={{ padding: "10px" }}>₹ {p.defaultRate.toLocaleString()}</td>
                      <td style={{ padding: "10px" }}>
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
                          style={{ marginRight: "5px", padding: "4px 8px", background: "#3b82f6", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          style={{ padding: "4px 8px", background: "#ef4444", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                        >
                          Delete
                        </button>
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
            <h3 style={{ marginTop: 0 }}>Add New Product</h3>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>Product Name *</label>
              <input 
                type="text" 
                value={addFormData.name}
                onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
                placeholder="Enter product name"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>Description *</label>
              <textarea 
                value={addFormData.description}
                onChange={(e) => setAddFormData({ ...addFormData, description: e.target.value })}
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px", minHeight: "100px" }}
                placeholder="Enter product description"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>Product Type *</label>
              <select 
                value={addFormData.category}
                onChange={(e) => setAddFormData({ ...addFormData, category: e.target.value })}
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              >
                <option value="MACHINE">Machine</option>
                <option value="SPARE">Spare Part</option>
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>Unit Price *</label>
              <input 
                type="number" 
                value={addFormData.defaultRate}
                onChange={(e) => setAddFormData({ ...addFormData, defaultRate: e.target.value })}
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
                placeholder="0.00"
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>HSN Code</label>
              <input 
                type="text" 
                value={addFormData.hsnCode}
                onChange={(e) => setAddFormData({ ...addFormData, hsnCode: e.target.value })}
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
                placeholder="Enter HSN code"
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>Product Image</label>
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
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              />
              {addFormData.imagePath && (
                <div style={{ marginTop: "10px", width: "100px", height: "100px", background: "#f1f5f9", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src={addFormData.imagePath} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                </div>
              )}
            </div>
            <button 
              onClick={handleCreate}
              style={{ padding: "10px 20px", background: "#0f172a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "500" }}
            >
              Create Product
            </button>
          </div>
        )}

        {activeTab === "upload" && (
          <div style={{ maxWidth: "600px" }}>
            <h3 style={{ marginTop: 0 }}>Upload Excel</h3>
            <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "15px" }}>
              Upload an Excel file to bulk import products. The file should have the following columns:
              <br />
              <strong>Name, Description, Type, Price, HSN</strong>
            </p>
            <div style={{ border: "2px dashed #cbd5e1", padding: "30px", borderRadius: "8px", textAlign: "center", background: "#f8fafc" }}>
              <input 
                type="file" 
                accept=".xlsx, .xls" 
                onChange={handleFileUpload}
                style={{ display: "block", margin: "0 auto" }}
              />
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
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100
        }}>
          <div style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            width: "500px",
            maxHeight: "90vh",
            overflowY: "auto"
          }}>
            <h3 style={{ marginTop: 0 }}>Edit Product</h3>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>Product Name</label>
              <input 
                type="text" 
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>Description</label>
              <textarea 
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px", minHeight: "100px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>Product Type</label>
              <select 
                value={editFormData.category}
                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              >
                <option value="MACHINE">Machine</option>
                <option value="SPARE">Spare Part</option>
              </select>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>Unit Price</label>
              <input 
                type="number" 
                value={editFormData.defaultRate}
                onChange={(e) => setEditFormData({ ...editFormData, defaultRate: parseFloat(e.target.value) })}
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>HSN Code</label>
              <input 
                type="text" 
                value={editFormData.hsnCode}
                onChange={(e) => setEditFormData({ ...editFormData, hsnCode: e.target.value })}
                style={{ width: "100%", padding: "8px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: "14px" }}>Product Image</label>
              {editFormData.imagePath && (
                <div style={{ marginBottom: "10px", position: "relative", width: "100px", height: "100px" }}>
                  <img 
                    src={editFormData.imagePath.startsWith("data:") ? editFormData.imagePath : editFormData.imagePath.startsWith("/") ? editFormData.imagePath : `/${editFormData.imagePath}`} 
                    alt="Preview" 
                    style={{ width: "100%", height: "100%", objectFit: "contain", border: "1px solid #cbd5e1", borderRadius: "4px" }} 
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
                style={{ fontSize: "12px" }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button 
                onClick={() => setEditingProduct(null)}
                style={{ padding: "8px 16px", background: "#cbd5e1", color: "#334155", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                style={{ padding: "8px 16px", background: "#0f172a", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
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

"use client";

import React, { useState, useEffect } from "react";
import DatabaseUploadModal from "./DatabaseUploadModal";
import DatabaseProductsTable from "./DatabaseProductsTable";

interface Database {
  id: string;
  name: string;
  isActive: boolean;
  sourceFile: string;
  createdAt: string;
  _count: { products: number };
}

export default function InvoiceDatabaseManager() {
  const [databases, setDatabases] = useState<Database[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewingDatabaseId, setViewingDatabaseId] = useState<string | null>(null);
  const [editingNameId, setEditingNameId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState("");

  useEffect(() => {
    fetchDatabases();
  }, []);

  const fetchDatabases = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/invoice-databases");
      const data = await response.json();
      setDatabases(data);
    } catch (error) {
      console.error("Error fetching databases:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this database? All its products will be removed.")) return;
    try {
      const response = await fetch(`/api/invoice-databases/${id}`, { method: "DELETE" });
      if (response.ok) fetchDatabases();
    } catch (error) {
      console.error("Error deleting database:", error);
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    if (currentActive) return; // Cannot deactivate manually, must activate another
    try {
      const response = await fetch(`/api/invoice-databases/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: true })
      });
      if (response.ok) fetchDatabases();
    } catch (error) {
      console.error("Error setting active database:", error);
    }
  };

  const startRename = (db: Database) => {
    setEditingNameId(db.id);
    setEditNameValue(db.name);
  };

  const handleRename = async (id: string) => {
    try {
      const response = await fetch(`/api/invoice-databases/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editNameValue })
      });
      if (response.ok) {
        setEditingNameId(null);
        fetchDatabases();
      }
    } catch (error) {
      console.error("Error renaming database:", error);
    }
  };

  return (
    <div className="database-manager">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h2 style={{ margin: 0 }}>Product Databases</h2>
          <div className="badge badge-warning" style={{ opacity: 0.7 }}>
            Security PIN Protection: Not Enabled (Disabled)
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setIsUploadModalOpen(true)}>
          Upload New Database
        </button>
      </div>

      <div className="card" style={{ padding: "0", overflow: "hidden" }}>
        <table className="items-table" style={{ margin: 0 }}>
          <thead>
            <tr>
              <th>Status</th>
              <th>Database Name</th>
              <th>Products</th>
              <th>Source File</th>
              <th>Upload Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="text-center" style={{ padding: "40px" }}>Loading databases...</td></tr>
            ) : databases.length === 0 ? (
              <tr><td colSpan={6} className="text-center" style={{ padding: "40px", color: "#64748b" }}>No databases uploaded yet.</td></tr>
            ) : (
              databases.map((db) => (
                <tr key={db.id} style={{ background: db.isActive ? "#f0f9ff" : "transparent" }}>
                  <td className="text-center">
                    <button 
                      onClick={() => toggleActive(db.id, db.isActive)}
                      style={{ 
                        background: "none", 
                        border: "none", 
                        cursor: db.isActive ? "default" : "pointer",
                        fontSize: "20px" 
                      }}
                      title={db.isActive ? "Active Database" : "Set as Active"}
                    >
                      {db.isActive ? "⭐" : "☆"}
                    </button>
                  </td>
                  <td>
                    {editingNameId === db.id ? (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input 
                          className="form-control" 
                          value={editNameValue} 
                          onChange={(e) => setEditNameValue(e.target.value)} 
                          style={{ padding: "4px 8px", height: "30px" }}
                        />
                        <button className="btn btn-primary btn-sm" onClick={() => handleRename(db.id)}>Save</button>
                        <button className="btn btn-outline btn-sm" onClick={() => setEditingNameId(null)}>×</button>
                      </div>
                    ) : (
                      <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "8px" }}>
                        {db.name}
                        <button className="btn-text" onClick={() => startRename(db)} style={{ fontSize: "12px", color: "#0ea5e9" }}>✏</button>
                      </div>
                    )}
                  </td>
                  <td className="text-center">{db._count.products} items</td>
                  <td style={{ fontSize: "12px", color: "#64748b" }}>{db.sourceFile}</td>
                  <td style={{ fontSize: "12px", color: "#64748b" }}>{new Date(db.createdAt).toLocaleDateString()}</td>
                  <td className="text-right">
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button className="btn btn-outline btn-sm" onClick={() => setViewingDatabaseId(db.id)}>View</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(db.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DatabaseUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onSuccess={fetchDatabases} 
      />

      {viewingDatabaseId && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "1000px", height: "80vh", display: "flex", flexDirection: "column" }}>
            <div className="modal-header">
              <h3>View Products</h3>
              <button className="close-btn" onClick={() => setViewingDatabaseId(null)}>×</button>
            </div>
            <div className="modal-body" style={{ flex: 1, overflowY: "auto" }}>
              <DatabaseProductsTable databaseId={viewingDatabaseId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

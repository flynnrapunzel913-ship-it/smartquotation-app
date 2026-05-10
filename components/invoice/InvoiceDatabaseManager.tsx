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

interface Props {
  onRefresh?: () => void;
}

export default function InvoiceDatabaseManager({ onRefresh }: Props) {
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
      setDatabases(Array.isArray(data) ? data : []);
      if (onRefresh) onRefresh();
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
    if (currentActive) return; 
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
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-[#1e293b]">Product Databases</h3>
        <button 
          className="btn btn-primary rounded-xl px-6 py-2.5 text-sm font-bold shadow-lg hover:shadow-xl transition-all" 
          onClick={() => setIsUploadModalOpen(true)}
        >
          + Upload Database
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 text-center text-[#94a3b8] animate-pulse">Loading catalogs...</div>
        ) : databases.length === 0 ? (
          <div className="col-span-full py-24 text-center">
            <div className="text-6xl mb-4 grayscale opacity-20">🗄️</div>
            <p className="text-[#64748b] font-medium text-lg">No product databases uploaded yet.</p>
            <p className="text-[#94a3b8] mt-1">Upload an Excel, PDF, or Word file to create your first database.</p>
          </div>
        ) : (
          databases.map((db) => (
            <div key={db.id} className={`card p-6 flex flex-col justify-between border-2 transition-all ${db.isActive ? "border-blue-500 ring-4 ring-blue-50" : "border-transparent hover:border-slate-200"}`}>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-2xl">📦</div>
                  {db.isActive && (
                    <span className="badge badge-blue text-[10px] py-1 px-3">Active Database</span>
                  )}
                </div>
                
                {editingNameId === db.id ? (
                  <div className="flex flex-col gap-2 mb-4">
                    <input 
                      className="form-control text-sm py-2" 
                      value={editNameValue} 
                      onChange={(e) => setEditNameValue(e.target.value)} 
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button className="btn btn-primary btn-xs py-1" onClick={() => handleRename(db.id)}>Save</button>
                      <button className="btn btn-outline btn-xs py-1" onClick={() => setEditingNameId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-[#1e293b] flex items-center gap-2 group">
                      {db.name}
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 text-xs font-medium" onClick={() => startRename(db)}>Rename</button>
                    </h4>
                    <p className="text-sm text-[#64748b] mt-1">{db._count.products} Products Found</p>
                  </div>
                )}

                <div className="text-[10px] text-[#94a3b8] uppercase tracking-widest font-bold mt-auto mb-6">
                  Uploaded: {new Date(db.createdAt).toLocaleDateString("en-IN")}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    className="text-xs font-bold py-2.5 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all"
                    onClick={() => setViewingDatabaseId(db.id)}
                  >
                    View Products
                  </button>
                  <button 
                    className={`text-xs font-bold py-2.5 rounded-lg transition-all ${db.isActive ? "bg-emerald-50 text-emerald-600 cursor-default" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    onClick={() => toggleActive(db.id, db.isActive)}
                  >
                    {db.isActive ? "✓ Currently Active" : "Set Active"}
                  </button>
                </div>
                <button 
                  className="text-xs font-bold py-2 rounded-lg text-red-500 hover:bg-red-50 transition-all mt-1"
                  onClick={() => handleDelete(db.id)}
                >
                  Delete Database
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <DatabaseUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        onSuccess={fetchDatabases} 
      />

      {viewingDatabaseId && (
        <div className="modal-overlay">
          <div className="modal-content !max-w-5xl !h-[85vh] flex flex-col p-0 overflow-hidden rounded-3xl shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold text-[#1e293b]">Database Products</h3>
                <p className="text-xs text-[#64748b] mt-1">Review the contents of this catalog</p>
              </div>
              <button className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all text-2xl" onClick={() => setViewingDatabaseId(null)}>×</button>
            </div>
            <div className="flex-1 overflow-auto bg-white">
              <div className="p-6">
                <DatabaseProductsTable databaseId={viewingDatabaseId} />
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-end">
               <button className="btn btn-outline px-6" onClick={() => setViewingDatabaseId(null)}>Close Viewer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

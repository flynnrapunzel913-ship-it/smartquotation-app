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
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#334155]">Available Price Lists</h3>
        <button 
          className="btn btn-primary btn-sm flex items-center gap-2" 
          onClick={() => setIsUploadModalOpen(true)}
        >
          <span className="text-lg">+</span> Upload New
        </button>
      </div>

      <div className="overflow-hidden border border-[#f1f5f9] rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f8fafc] text-[#64748b] text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 font-semibold">Active</th>
              <th className="px-4 py-3 font-semibold">Database Name</th>
              <th className="px-4 py-3 font-semibold">Products</th>
              <th className="px-4 py-3 font-semibold">Created</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9]">
            {isLoading ? (
              <tr><td colSpan={5} className="text-center py-12 text-[#94a3b8]">Loading price lists...</td></tr>
            ) : databases.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16">
                  <div className="text-4xl mb-4">📂</div>
                  <p className="text-[#64748b] font-medium">No product databases uploaded yet.</p>
                  <p className="text-[#94a3b8] text-sm mt-1">Upload an Excel, PDF, or Word file to get started.</p>
                </td>
              </tr>
            ) : (
              databases.map((db) => (
                <tr key={db.id} className={`${db.isActive ? "bg-blue-50/50" : "hover:bg-slate-50"} transition-colors`}>
                  <td className="px-4 py-4">
                    <button 
                      onClick={() => toggleActive(db.id, db.isActive)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${db.isActive ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white border border-slate-200 text-slate-300 hover:border-blue-400 hover:text-blue-400"}`}
                      title={db.isActive ? "Currently Active" : "Set as Active"}
                    >
                      {db.isActive ? "✓" : ""}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    {editingNameId === db.id ? (
                      <div className="flex gap-2">
                        <input 
                          className="form-control text-sm py-1 h-8" 
                          value={editNameValue} 
                          onChange={(e) => setEditNameValue(e.target.value)} 
                          autoFocus
                        />
                        <button className="btn btn-primary btn-sm px-2 h-8" onClick={() => handleRename(db.id)}>Save</button>
                        <button className="text-slate-400 hover:text-slate-600" onClick={() => setEditingNameId(null)}>×</button>
                      </div>
                    ) : (
                      <div>
                        <div className="font-semibold text-[#1e293b] flex items-center gap-2">
                          {db.name}
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 text-xs" onClick={() => startRename(db)}>edit</button>
                        </div>
                        <div className="text-[10px] text-[#94a3b8] truncate max-w-[200px]">{db.sourceFile}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#475569]">{db._count.products} items</td>
                  <td className="px-4 py-4 text-xs text-[#94a3b8]">{new Date(db.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-medium text-[#475569] hover:border-blue-500 hover:text-blue-500 transition-all" onClick={() => setViewingDatabaseId(db.id)}>View</button>
                      <button className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-medium text-red-500 hover:border-red-500 hover:bg-red-50 transition-all" onClick={() => handleDelete(db.id)}>Delete</button>
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
          <div className="modal-content !max-w-4xl !h-[80vh] flex flex-col p-0 overflow-hidden rounded-3xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-bold text-[#1e293b]">Database Products</h3>
              <button className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all" onClick={() => setViewingDatabaseId(null)}>×</button>
            </div>
            <div className="flex-1 overflow-auto p-0">
              <DatabaseProductsTable databaseId={viewingDatabaseId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

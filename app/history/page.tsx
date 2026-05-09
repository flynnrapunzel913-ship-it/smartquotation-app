"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/styles/history.css";
import "@/styles/globals.css";

export default function HistoryPage() {
  const router = useRouter();
  const [quotations, setQuotations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchQuotations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/quotations?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setQuotations(data);
    } catch (e) {
      console.error("Failed to fetch", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotations();
  }, [search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quotation?")) return;
    try {
      await fetch(`/api/quotations/${id}`, { method: "DELETE" });
      fetchQuotations();
    } catch (e) {
      alert("Delete failed");
    }
  };

  const handleDuplicate = async (id: string) => {
    const q = quotations.find((item) => item.id === id);
    const specs = q?.projectSpecifications as any;
    if (q?.quotationType === "KLEAN_TECH_SYSTEMS" || specs?.quotationType === "KLEAN_TECH_SYSTEMS") {
      router.push(`/quotations/klean-tech/new?id=${id}&mode=duplicate`);
    } else {
      router.push(`/quotations/mr-swimming-pools/new?id=${id}&mode=duplicate`);
    }
  };

  return (
    <div className="history-page">
      <div className="history-container">
        <div className="history-header">
          <div>
            <h1>Quotation History</h1>
            <p>Manage and track all generated quotations</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="btn" style={{ background: "#0f172a", color: "white" }} onClick={() => router.push("/quotations/mr-swimming-pools/new")}>
              + New Quotation
            </button>
          </div>
        </div>

        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by quote #, title, or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="quotation-table-card">
          {loading ? (
            <div style={{ padding: "40px", textAlign: "center" }}>Loading quotations...</div>
          ) : quotations.length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center" }}>No quotations found.</div>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Quote #</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((q) => (
                   <tr key={q.id} className={q.isDraft ? "row-draft" : ""}>
                    <td style={{ fontWeight: "600" }}>{q.quoteNumber}</td>
                    <td><div style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={q.title}>{q.title || "Untitled"}</div></td>
                    <td>{new Date(q.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    <td>{q.customer?.name}</td>
                    <td style={{ fontWeight: "600" }}>₹ {Number(q.grandTotal).toLocaleString()}</td>
                    <td>
                      <span className={`status-badge ${q.isDraft ? "status-draft" : "status-final"}`}>
                        {q.isDraft ? "DRAFT" : "FINAL"}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button 
                          className="btn btn-small btn-edit" 
                          onClick={() => {
                            const specs = q.projectSpecifications as any;
                            if (q.quotationType === "KLEAN_TECH_SYSTEMS" || specs?.quotationType === "KLEAN_TECH_SYSTEMS") {
                              router.push(`/quotations/klean-tech/${q.id}/edit`);
                            } else {
                              router.push(`/quotations/mr-swimming-pools/new?id=${q.id}`);
                            }
                          }}
                        >
                          Edit
                        </button>
                        <button className="btn btn-small btn-duplicate" style={{ background: "#e0f2fe", color: "#0369a1" }} onClick={() => handleDuplicate(q.id)}>
                          Duplicate
                        </button>
                        <button className="btn btn-small" style={{ background: "#f1f5f9" }} onClick={() => window.open(`/api/quotations/${q.id}/pdf?disposition=inline`, "_blank")}>
                          Preview
                        </button>
                        <button className="btn btn-small" style={{ background: "#f1f5f9" }} onClick={() => window.open(`/api/quotations/${q.id}/pdf?disposition=attachment`, "_blank")}>
                          PDF
                        </button>
                        <button className="btn btn-small" style={{ background: "#f1f5f9" }} onClick={() => window.open(`/api/quotations/${q.id}/docx`, "_blank")}>
                          Word
                        </button>
                        <button className="btn btn-small btn-delete" onClick={() => handleDelete(q.id)}>
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
      </div>
    </div>
  );
}

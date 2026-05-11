"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Mail, Lock } from "lucide-react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/quotation-types");
      } else {
        setError(data.error || "Login failed");
        setPending(false);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setPending(false);
    }
  };



  return (
    <div style={{ width: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
        <div style={{ 
          width: "56px", 
          height: "56px", 
          borderRadius: "16px", 
          background: "white", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid #e2e8f0"
        }}>
          <LogIn size={24} style={{ color: "#0f172a" }} />
        </div>
      </div>

      <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0f172a", textAlign: "center", marginBottom: "8px" }}>Sign in with email</h1>
      <p style={{ fontSize: "13px", color: "#64748b", textAlign: "center", marginBottom: "32px", lineHeight: "1.5" }}>
        Make a new doc to bring your words, data, and teams together. For free
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {error && (
          <div style={{ 
            padding: "12px", 
            background: "rgba(239, 68, 68, 0.1)", 
            color: "#ef4444", 
            borderRadius: "12px", 
            fontSize: "14px", 
            fontWeight: "500",
            border: "1px solid rgba(239, 68, 68, 0.2)"
          }}>
            {error}
          </div>
        )}
        
        <div style={{ position: "relative" }}>
          <Mail size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: userFocus ? "#0f172a" : "#94a3b8", transition: "color 0.2s" }} />
          <input 
            style={{ 
              width: "100%", 
              padding: "14px 16px 14px 44px", 
              background: "#F9FAFB", 
              border: userFocus ? "1px solid #e2e8f0" : "1px solid #f1f5f9", 
              borderRadius: "12px", 
              fontSize: "15px",
              color: "#0f172a",
              outline: "none",
              transition: "all 0.2s ease"
            }} 
            id="username" 
            type="text" 
            required 
            placeholder="Email"
            value={username}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div style={{ position: "relative" }}>
          <Lock size={18} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: passFocus ? "#0f172a" : "#94a3b8", transition: "color 0.2s" }} />
          <input 
            style={{ 
              width: "100%", 
              padding: "14px 16px 14px 44px", 
              background: "#F9FAFB", 
              border: passFocus ? "1px solid #e2e8f0" : "1px solid #f1f5f9", 
              borderRadius: "12px", 
              fontSize: "15px",
              color: "#0f172a",
              outline: "none",
              transition: "all 0.2s ease"
            }} 
            id="password" 
            type="password" 
            required 
            placeholder="Password"
            value={password}
            onFocus={() => setPassFocus(true)}
            onBlur={() => setPassFocus(false)}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span style={{ fontSize: "13px", color: "#0f172a", fontWeight: "600", cursor: "pointer" }}>Forgot password?</span>
        </div>
        
        <button 
          type="submit" 
          style={{ 
            width: "100%", 
            padding: "14px", 
            background: "#000000", 
            color: "white", 
            fontWeight: "700", 
            fontSize: "16px",
            borderRadius: "12px", 
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.2s ease",
            opacity: pending ? 0.7 : 1
          }} 
          onMouseEnter={(e) => e.currentTarget.style.background = "#262626"}
          onMouseLeave={(e) => e.currentTarget.style.background = "#000000"}
          disabled={pending}
        >
          {pending ? "Signing in…" : "Get Started"}
        </button>
      </form>



    </div>
  );
}

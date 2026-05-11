"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
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

  const handleGoogleSuccess = async (response: any) => {
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/quotation-types");
      } else {
        setError(data.error || "Google sign-in failed");
        setPending(false);
      }
    } catch (err) {
      setError("Google authentication failed.");
      setPending(false);
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label className="form-label" htmlFor="username">Username</label>
          <input 
            className="form-input" 
            id="username" 
            type="text" 
            required 
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <input 
            className="form-input" 
            id="password" 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '0.5rem' }} 
          disabled={pending}
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="divider">or continue with</div>

      <div className="google-button-container">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google Sign-In was cancelled")}
          useOneTap
          theme="outline"
          size="large"
          text="continue_with"
          shape="rectangular"
          width="100%"
        />
      </div>
    </div>
  );
}

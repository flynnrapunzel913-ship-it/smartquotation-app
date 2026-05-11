import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { LoginForm } from "@/components/LoginForm";
import "@/styles/login.css";

export default async function LoginPage() {
  const session = await getSession();
  if (session.isLoggedIn) redirect("/quotation-types");

  return (
    <div className="login-page" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Background with light opacity */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/login-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.3,
        zIndex: 0
      }} />
      
      {/* Card Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "40px", width: "100%", maxWidth: "440px", background: "white", borderRadius: "24px", boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>
        <LoginForm />
      </div>
    </div>
  );
}

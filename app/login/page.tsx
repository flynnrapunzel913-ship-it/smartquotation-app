import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { LoginForm } from "@/components/LoginForm";
import "@/styles/login.css";

export default async function LoginPage() {
  const session = await getSession();
  if (session.isLoggedIn) redirect("/quotation-types");

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">SQ</div>
          <h1 className="login-title">SmartQuotation</h1>
          <p className="login-desc">Sign in with admin credentials.</p>
        </div>
        <div className="login-content">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

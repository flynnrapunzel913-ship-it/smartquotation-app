"use client";

import React, { useCallback, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import "@/styles/dialog.css";

export type AlertOptions = {
  title: string;
  message: string;
  variant?: "error" | "success" | "info";
  buttonLabel?: string;
};

type AppAlertProps = AlertOptions & {
  onClose: () => void;
};

function AlertIcon({ variant }: { variant: AlertOptions["variant"] }) {
  const size = 22;
  if (variant === "success") return <CheckCircle2 size={size} />;
  if (variant === "info") return <Info size={size} />;
  return <AlertCircle size={size} />;
}

export function AppAlert({
  title,
  message,
  variant = "error",
  buttonLabel = "OK",
  onClose,
}: AppAlertProps) {
  const iconVariant = variant === "success" ? "success" : variant === "info" ? "info" : "danger";

  return (
    <div className="app-dialog-overlay" onClick={onClose} role="presentation">
      <div
        className="app-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="app-alert-title"
        aria-describedby="app-alert-message"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="app-dialog-header">
          <div className={`app-dialog-icon app-dialog-icon--${iconVariant}`}>
            <AlertIcon variant={variant} />
          </div>
          <div className="app-dialog-title-wrap">
            <h3 id="app-alert-title" className="app-dialog-title">{title}</h3>
            <p id="app-alert-message" className="app-dialog-message">{message}</p>
          </div>
        </div>
        <div className="app-dialog-actions">
          <button type="button" className="app-dialog-btn app-dialog-btn--confirm" onClick={onClose}>
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function useAppAlert() {
  const [options, setOptions] = useState<AlertOptions | null>(null);
  const resolveRef = useRef<(() => void) | null>(null);

  const showAlert = useCallback((opts: AlertOptions) => {
    return new Promise<void>((resolve) => {
      resolveRef.current = resolve;
      setOptions(opts);
    });
  }, []);

  const close = () => {
    resolveRef.current?.();
    resolveRef.current = null;
    setOptions(null);
  };

  const alertDialog = options ? <AppAlert {...options} onClose={close} /> : null;

  return { showAlert, alertDialog };
}

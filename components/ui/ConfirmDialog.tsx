"use client";

import React, { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle } from "lucide-react";
import "@/styles/dialog.css";

export type ConfirmOptions = {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
};

type ConfirmDialogProps = ConfirmOptions & {
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="app-dialog-overlay" onClick={onCancel} role="presentation">
      <div
        className="app-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="app-dialog-header">
          <div className={`app-dialog-icon app-dialog-icon--${variant === "danger" ? "danger" : "warning"}`}>
            <AlertTriangle size={22} />
          </div>
          <div className="app-dialog-title-wrap">
            <h3 id="confirm-dialog-title" className="app-dialog-title">{title}</h3>
            <p id="confirm-dialog-message" className="app-dialog-message">{message}</p>
          </div>
        </div>
        <div className="app-dialog-actions">
          <button type="button" className="app-dialog-btn app-dialog-btn--cancel" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`app-dialog-btn ${variant === "danger" ? "app-dialog-btn--danger" : "app-dialog-btn--confirm"}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function useConfirmDialog() {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const showConfirm = useCallback((opts: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
      setOptions(opts);
    });
  }, []);

  const close = (result: boolean) => {
    resolveRef.current?.(result);
    resolveRef.current = null;
    setOptions(null);
  };

  const dialog =
    options && typeof document !== "undefined"
      ? createPortal(
          <ConfirmDialog
            {...options}
            onConfirm={() => close(true)}
            onCancel={() => close(false)}
          />,
          document.body,
        )
      : null;

  return { showConfirm, dialog };
}

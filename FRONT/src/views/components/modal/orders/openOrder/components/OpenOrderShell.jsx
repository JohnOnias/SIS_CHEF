import React from "react";

function OpenOrderShell({ children, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 99999,
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(980px, 96vw)",
          height: "min(92vh, 760px)",
          background: "#f5f6fa",
          borderRadius: 16,
          padding: 18,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default OpenOrderShell;

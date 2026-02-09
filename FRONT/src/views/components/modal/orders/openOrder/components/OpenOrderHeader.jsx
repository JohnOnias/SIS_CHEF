import React from "react";

function OpenOrderHeader({ mesa, onClose }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <h2 style={{ margin: 0 }}>Mesa {mesa}</h2>

      <button className="bntPadrao" onClick={onClose} type="button">
        Fechar
      </button>
    </div>
  );
}

export default OpenOrderHeader;

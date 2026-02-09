import React from "react";
import ProductRow from "./ProductRow";

function ProductsList({ produtos, carrinho, onAdd, onSub, formatMoney }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", paddingRight: 6 }}>
      {produtos.length === 0 ? (
        <div
          style={{
            padding: 14,
            borderRadius: 10,
            border: "1px solid #e5e5e5",
            fontWeight: 700,
          }}
        >
          Nenhum produto cadastrado
        </div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {produtos.map((p) => {
            const qtd = carrinho[p.id]?.qtd || 0;

            return (
              <ProductRow
                key={p.id}
                p={p}
                qtd={qtd}
                onAdd={() => onAdd(p)}
                onSub={() => onSub(p)}
                formatMoney={formatMoney}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductsList;

import React from "react";
import { PencilIcon, TrashIcon } from "./Icons";

function RoleTable({ title, users, emptyText, onEdit, onDelete, style }) {
  console.log("-------------------dados recebidos de user----------------")
  console.log(users);
console.log("---------------------fin dos dados -----------------------")
  return (
    
    <div className="role-section" style={style}>
      <div className="role-title">{title}</div>
      <table className="role-table">
        <tbody>
          {users.map((u) => (
           <tr key={u.id}>
  <td>{u?.nome ?? "Nome não informado"}</td>
  <td>
    <div className="actions">
      <button
        className="icon-btn icon-edit"
        title="Editar"
        onClick={() => onEdit(u)}
      >
        <PencilIcon />
      </button>
      <button
        className="icon-btn icon-del"
        title="Excluir"
        onClick={() => onDelete(u.id)}
      >
        <TrashIcon />
      </button>
    </div>
  </td>
</tr>

          ))}

          {users.length === 0 && (
            <tr>
              <td style={{ color: "#667085" }}>{emptyText}</td>
              <td />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RoleTable;

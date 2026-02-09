// --------- validações ----------
export function isValidEmail(email) {
  const e = String(email || "").trim().toLowerCase();
  // simples e eficaz para front (não tenta cobrir todos os casos do RFC)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(e);
}

export function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

export function isValidCPF(cpf) {
  const c = onlyDigits(cpf);

  if (c.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(c)) return false; // 000.. 111.. etc

  // cálculo dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(c[i]) * (10 - i);
  let d1 = (sum * 10) % 11;
  if (d1 === 10) d1 = 0;
  if (d1 !== Number(c[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(c[i]) * (11 - i);
  let d2 = (sum * 10) % 11;
  if (d2 === 10) d2 = 0;
  if (d2 !== Number(c[10])) return false;

  return true;
}

export function formatCPF(value) {
  const c = onlyDigits(value).slice(0, 11);
  if (c.length <= 3) return c;
  if (c.length <= 6) return `${c.slice(0, 3)}.${c.slice(3)}`;
  if (c.length <= 9) return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6)}`;
  return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9)}`;
}
// -------------------------------

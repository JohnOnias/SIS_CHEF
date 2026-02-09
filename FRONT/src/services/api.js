// FRONT/src/services/api.js
export const api = (typeof window !== "undefined" && window.api) ? window.api : null;

export const isElectron = !!api;

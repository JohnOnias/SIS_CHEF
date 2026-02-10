// src/services/api.js

export const isElectron = !!(window?.api);

export const api = isElectron ? window.api : null;

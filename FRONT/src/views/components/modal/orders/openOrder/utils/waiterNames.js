const KEY_WAITER_NAMES = "waiter_names_v1";

export function readWaiterNames() {
  try {
    const raw = localStorage.getItem(KEY_WAITER_NAMES);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

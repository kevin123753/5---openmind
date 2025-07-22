export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getItem(key) {
  const item = localStorage.getItem(key);
  if (!item || item === "undefined" || item === "null") return null;

  try {
    return JSON.parse(item);
  } catch (e) {
    console.error(`❌ JSON parse error for key "${key}"`, e);
    return null;
  }
}
export function removeItem(key) {
  localStorage.removeItem(key);
}

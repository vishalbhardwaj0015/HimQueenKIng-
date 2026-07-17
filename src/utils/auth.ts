export function requireAuth(): boolean {
  const user = JSON.parse(localStorage.getItem("hqk_user") || "null");
  return !!user;
}

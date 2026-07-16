export function handleBookClick(e) {
  const user = JSON.parse(localStorage.getItem("hqk_user") || "null");
  if (!user) {
    e.preventDefault();
    window.location.href = "/login";
    return false;
  }
  return true;
}

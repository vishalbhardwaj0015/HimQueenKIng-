export function handleBookClick(e: React.MouseEvent, details?: string) {
  const user = JSON.parse(localStorage.getItem("hqk_user") || "null");
  if (!user) {
    e.preventDefault();
    window.location.href = "/login";
    return false;
  }
  e.preventDefault();
  const msg = details || "Hi, I want to book a trip with HimQueenKing!";
  window.open(`https://wa.me/919805556015?text=${encodeURIComponent(msg)}`, "_blank");
  return true;
}

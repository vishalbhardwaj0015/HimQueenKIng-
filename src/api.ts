const API_BASE = "/api";

function getToken(): string | null {
  return localStorage.getItem("hqk_token");
}

interface RequestOptions extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

async function request(url: string, options: RequestOptions = {}): Promise<Record<string, unknown>> {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json", ...options.headers };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

interface ItemData {
  [key: string]: unknown;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (name: string, email: string, password: string) =>
    request("/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),

  // Tours
  getTours: () => request("/tours"),
  getToursAll: () => request("/tours/all"),
  createTour: (data: ItemData) => request("/tours", { method: "POST", body: JSON.stringify(data) }),
  updateTour: (id: number, data: ItemData) => request(`/tours/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTour: (id: number) => request(`/tours/${id}`, { method: "DELETE" }),

  // Treks
  getTreks: () => request("/treks"),
  getTreksAll: () => request("/treks/all"),
  createTrek: (data: ItemData) => request("/treks", { method: "POST", body: JSON.stringify(data) }),
  updateTrek: (id: number, data: ItemData) => request(`/treks/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTrek: (id: number) => request(`/treks/${id}`, { method: "DELETE" }),

  // Hotels
  getHotels: () => request("/hotels"),
  getHotelsAll: () => request("/hotels/all"),
  createHotel: (data: ItemData) => request("/hotels", { method: "POST", body: JSON.stringify(data) }),
  updateHotel: (id: number, data: ItemData) => request(`/hotels/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteHotel: (id: number) => request(`/hotels/${id}`, { method: "DELETE" }),

  // Packages
  getPackages: () => request("/packages"),
  getPackagesAll: () => request("/packages/all"),
  createPackage: (data: ItemData) => request("/packages", { method: "POST", body: JSON.stringify(data) }),
  updatePackage: (id: number, data: ItemData) => request(`/packages/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePackage: (id: number) => request(`/packages/${id}`, { method: "DELETE" }),

  // Contact & Dream
  submitContact: (data: ItemData) => request("/contact", { method: "POST", body: JSON.stringify(data) }),
  submitDream: (data: ItemData) => request("/dream-destination", { method: "POST", body: JSON.stringify(data) }),

  // Requests (admin)
  getRequests: () => request("/requests"),
  getStats: () => request("/requests/stats"),
  updateStatus: (type: string, id: number, status: string) =>
    request(`/requests/${type}/${id}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
};

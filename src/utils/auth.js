export const getRole = () => localStorage.getItem("role");
export const getToken = () => localStorage.getItem("token");
export const setAuth = (role, token) => {
  localStorage.setItem("role", role);
  localStorage.setItem("token", token);
};
export const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("token");
};

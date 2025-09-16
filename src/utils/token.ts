const TOKEN_KEY = "mh_token";
export function setToken(token: string){ if(!token) return; localStorage.setItem(TOKEN_KEY, token); }
export function getToken(){ return localStorage.getItem(TOKEN_KEY); }
export function clearToken(){ localStorage.removeItem(TOKEN_KEY); }

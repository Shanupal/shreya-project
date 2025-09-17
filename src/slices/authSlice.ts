import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";
import { setToken, clearToken } from "../utils/token";

export const signup = createAsyncThunk("auth/signup", async (payload:any, { rejectWithValue }) => {
  try { const res = await api.post("/api/auth/signup", payload); return res.data; }
  catch (e:any){ return rejectWithValue(e.response?.data || e.message); }
});

export const login = createAsyncThunk("auth/login", async (payload:any, { rejectWithValue }) => {
  try { const res = await api.post("/api/auth/login", payload); if(res.data?.token) setToken(res.data.token); return res.data; }
    // Check if this is demo data
    if (payload.user && payload.token) {
      // This is demo login data, return it directly
      return payload;
    }
    
    // Otherwise, make API call
  catch (e:any){ return rejectWithValue(e.response?.data || e.message); }
});

export const logout = createAsyncThunk("auth/logout", async () => { clearToken(); return { success: true }; });

const initialState = { user: null as any, token: typeof window !== "undefined" ? localStorage.getItem("mh_token") : null, loading:false, error:null as any };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(signup.pending, s=>{s.loading=true;s.error=null})
     .addCase(signup.fulfilled, s=>{s.loading=false})
     .addCase(signup.rejected, (s,a:any)=>{s.loading=false;s.error=a.payload})
     .addCase(login.pending, s=>{s.loading=true;s.error=null})
     .addCase(login.fulfilled, (s,a:any)=>{s.loading=false;s.token=a.payload.token||null;s.user=a.payload.user||null})
     .addCase(login.rejected, (s,a:any)=>{s.loading=false;s.error=a.payload})
     .addCase(logout.fulfilled,(s)=>{s.token=null;s.user=null});
  }
});

export default authSlice.reducer;

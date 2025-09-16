import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const getAnalytics = createAsyncThunk("admin/analytics", async (_, { rejectWithValue })=>{
  try{ const res = await api.get("/api/analytics/summary"); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

export const sendNotification = createAsyncThunk("admin/notify", async (payload:any,{rejectWithValue})=>{
  try{ const res = await api.post("/api/notify/send", payload); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

export const getAuditLogs = createAsyncThunk("admin/audit", async (params:any, { rejectWithValue })=>{
  try{ const res = await api.get("/api/compliance/audit", { params }); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

const adminSlice = createSlice({
  name:"admin",
  initialState:{analytics:null as any,notifications:[] as any[],auditLogs:[] as any[],loading:false,error:null as any},
  reducers:{},
  extraReducers:(b)=>{
    b.addCase(getAnalytics.pending,s=>{s.loading=true;s.error=null})
     .addCase(getAnalytics.fulfilled,(s,a:any)=>{s.loading=false;s.analytics=a.payload})
     .addCase(getAnalytics.rejected,(s,a:any)=>{s.loading=false;s.error=a.payload})
     .addCase(sendNotification.fulfilled,(s,a:any)=>{ s.notifications.push(a.payload) })
     .addCase(getAuditLogs.fulfilled,(s,a:any)=>{ s.auditLogs = a.payload })
  }
});

export default adminSlice.reducer;

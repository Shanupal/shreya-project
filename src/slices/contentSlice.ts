import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const listContent = createAsyncThunk("content/list", async (_, { rejectWithValue })=>{
  try{ const res = await api.get("/api/content/list"); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

export const filterByTag = createAsyncThunk("content/byTag", async (params={tag:''},{rejectWithValue})=>{
  try{ const res = await api.get("/api/content/by-tag", { params }); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

export const uploadContent = createAsyncThunk("content/upload", async (payload:any,{rejectWithValue})=>{
  try{ const res = await api.post("/api/content/upload", payload); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

const contentSlice = createSlice({
  name:"content",
  initialState:{items:[] as any[],loading:false,error:null as any},
  reducers:{},
  extraReducers:(b)=>{
    b.addCase(listContent.pending,s=>{s.loading=true;s.error=null})
     .addCase(listContent.fulfilled,(s,a:any)=>{s.loading=false;s.items=a.payload})
     .addCase(listContent.rejected,(s,a:any)=>{s.loading=false;s.error=a.payload})
     .addCase(filterByTag.pending,s=>{s.loading=true;s.error=null})
     .addCase(filterByTag.fulfilled,(s,a:any)=>{s.loading=false;s.items=a.payload})
     .addCase(filterByTag.rejected,(s,a:any)=>{s.loading=false;s.error=a.payload})
     .addCase(uploadContent.pending,s=>{s.loading=true;s.error=null})
     .addCase(uploadContent.fulfilled,(s,a:any)=>{s.loading=false; s.items.unshift(a.payload)})
     .addCase(uploadContent.rejected,(s,a:any)=>{s.loading=false;s.error=a.payload});
  }
});

export default contentSlice.reducer;

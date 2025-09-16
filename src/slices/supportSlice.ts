import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchRecommendations = createAsyncThunk("support/recommendations", async (params={mood:''},{rejectWithValue})=>{
  try{ const res = await api.get("/api/support/recommendations", { params }); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

export const matchCounselor = createAsyncThunk("support/match", async (payload:any,{rejectWithValue})=>{
  try{ const res = await api.post("/api/support/match", payload); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

const supportSlice = createSlice({
  name:"support",
  initialState:{recommendations:[] as any[],matched:null as any,loading:false,error:null as any},
  reducers:{},
  extraReducers:(b)=>{
    b.addCase(fetchRecommendations.pending,s=>{s.loading=true;s.error=null})
     .addCase(fetchRecommendations.fulfilled,(s,a:any)=>{s.loading=false;s.recommendations=a.payload})
     .addCase(fetchRecommendations.rejected,(s,a:any)=>{s.loading=false;s.error=a.payload})
     .addCase(matchCounselor.pending,s=>{s.loading=true;s.error=null})
     .addCase(matchCounselor.fulfilled,(s,a:any)=>{s.loading=false;s.matched=a.payload})
     .addCase(matchCounselor.rejected,(s,a:any)=>{s.loading=false;s.error=a.payload})
  }
});

export default supportSlice.reducer;

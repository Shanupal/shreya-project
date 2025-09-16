import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const logEmotion = createAsyncThunk("emotion/log", async (payload:any,{rejectWithValue})=>{
  try{ const res = await api.post("/api/emotion/log", payload); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

export const fetchEmotionHistory = createAsyncThunk("emotion/history", async (params={range:'weekly'},{rejectWithValue})=>{
  try{ const res = await api.get("/api/emotion/history", { params }); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

const emotionSlice = createSlice({
  name:"emotion",
  initialState:{logs:[] as any[],loading:false,error:null as any},
  reducers:{},
  extraReducers:(b)=>{
    b.addCase(logEmotion.pending, s=>{s.loading=true;s.error=null})
     .addCase(logEmotion.fulfilled, (s,a:any)=>{s.loading=false; if(Array.isArray(a.payload)) s.logs = a.payload; else s.logs.push(a.payload)})
     .addCase(logEmotion.rejected,(s,a:any)=>{s.loading=false;s.error=a.payload})
     .addCase(fetchEmotionHistory.pending, s=>{s.loading=true;s.error=null})
     .addCase(fetchEmotionHistory.fulfilled,(s,a:any)=>{s.loading=false;s.logs=a.payload})
     .addCase(fetchEmotionHistory.rejected,(s,a:any)=>{s.loading=false;s.error=a.payload})
  }
});

export default emotionSlice.reducer;

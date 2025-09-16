import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const sendMessage = createAsyncThunk("chat/send", async (payload:any,{rejectWithValue})=>{
  try{ const res = await api.post("/api/chat/send", payload); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

export const fetchChatHistory = createAsyncThunk("chat/history", async (params:any,{rejectWithValue})=>{
  try{ const res = await api.get("/api/chat/history", { params }); return res.data; }
  catch(e:any){ return rejectWithValue(e.response?.data || e.message); }
});

const chatSlice = createSlice({
  name:"chat",
  initialState:{messages:[] as any[],loading:false,error:null as any},
  reducers:{},
  extraReducers:(b)=>{
    b.addCase(sendMessage.pending,s=>{s.loading=true;s.error=null})
     .addCase(sendMessage.fulfilled,(s,a:any)=>{s.loading=false; s.messages.push(a.payload)})
     .addCase(sendMessage.rejected,(s,a:any)=>{s.loading=false;s.error=a.payload})
     .addCase(fetchChatHistory.pending,s=>{s.loading=true;s.error=null})
     .addCase(fetchChatHistory.fulfilled,(s,a:any)=>{s.loading=false;s.messages=a.payload})
     .addCase(fetchChatHistory.rejected,(s,a:any)=>{s.loading=false;s.error=a.payload})
  }
});

export default chatSlice.reducer;

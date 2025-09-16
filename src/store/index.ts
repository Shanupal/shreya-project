import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import emotionReducer from "../slices/emotionSlice";
import supportReducer from "../slices/supportSlice";
import chatReducer from "../slices/chatSlice";
import contentReducer from "../slices/contentSlice";
import adminReducer from "../slices/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    emotion: emotionReducer,
    support: supportReducer,
    chat: chatReducer,
    content: contentReducer,
    admin: adminReducer,
  },
  middleware: (gdm) => gdm({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

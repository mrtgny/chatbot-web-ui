import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "utils/types";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [] as IMessage[],
  },
  reducers: {
    addMessage: (state, action) => {
      const { message } = action.payload;
      console.log(message);
      state.messages = [
        ...state.messages.filter(
          (i) => message.status === "typing" || i.status !== "typing"
        ),
        message,
      ];
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;

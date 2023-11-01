import { createSlice } from '@reduxjs/toolkit';

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages : []
    },
    reducers: {
        setMessages: (state, action ) => {
            state.messages = action.payload;
        },
    }
});



export const { setMessages } = messagesSlice.actions;
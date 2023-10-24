import { configureStore } from '@reduxjs/toolkit'
import { recipeSlice } from './receta/recipeSlice'
import { authSlice } from './auth/authSlice'
import { userSlice } from './user/userSlice'
import { messagesSlice } from './messages/messagesSlice'
export const store = configureStore({
  reducer: { 
    recipe: recipeSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    messages: messagesSlice.reducer
  },
})
import { configureStore } from '@reduxjs/toolkit'
import { recipeSlice } from './receta/recipeSlice'
import { authSlice } from './auth/authSlice'
export const store = configureStore({
  reducer: { 
    recipe: recipeSlice.reducer,
    auth: authSlice.reducer
  },
})
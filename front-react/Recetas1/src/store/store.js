import { configureStore } from '@reduxjs/toolkit'
import { recipeSlice } from './receta/recipeSlice'
export const store = configureStore({
  reducer: { 
    recipe: recipeSlice.reducer
  },
})
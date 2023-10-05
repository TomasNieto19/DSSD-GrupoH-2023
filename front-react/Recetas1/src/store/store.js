import { configureStore } from '@reduxjs/toolkit'
import { recipeSlice } from './receta/recipeSlice'
import { authSlice } from './auth/authSlice'
import { userSlice } from './user/userSlice'
import { popularUsersSlice } from './popularUsers/popularUsersSlice'
import { popularRecipesSlice } from './popularRecipes/popularRecipesSlice'
export const store = configureStore({
  reducer: { 
    recipe: recipeSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    popularUsers: popularUsersSlice.reducer,
    popularRecipes: popularRecipesSlice.reducer
  },
})
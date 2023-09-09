import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddRecipe } from '../components/AddRecipe'
import MyRecipesContainer from '../components/MyRecipesContainer'
import RecipeDetail from '../components/RecipeDetailContainer'
import RecipesListContainer from '../components/RecipesListContainer'

export const RecipeRoutes = () => {
    return (
        <Routes>
            <Route path='/addRecipe' element={<AddRecipe />} />
            <Route path='/myRecipes' element={<MyRecipesContainer />} />
            <Route path='/recipe/:id' element={<RecipeDetail/>}/>
            <Route path='/' element={<RecipesListContainer/>}/>
        </Routes>
    )
}

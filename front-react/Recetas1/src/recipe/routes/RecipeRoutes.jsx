import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddRecipe } from '../components/AddRecipe'
import MyRecipesContainer from '../components/MyRecipesContainer'
import RecipeDetail from '../components/RecipeDetailContainer'
import RecipesListContainer from '../components/RecipesListContainer'
import FavoriteContainer from '../components/FavoriteContainer'
import PopularRecipesListContainer from '../components/PopularRecipesListContainer'
import DraftListContainer from '../components/DraftListContainer'
import DraftDetailContainer from '../components/DraftDetailContainer'
import AddRecipesBook from '../components/AddRecipesBook'
import RecipesBooks from '../components/RecipesBooks'
import ReportRecipesContainer from '../components/ReportRecipesContainer'


export const RecipeRoutes = () => {
    return (
        <Routes>
            <Route path='/addRecipe' element={<AddRecipe />} />
            <Route path='/myRecipes' element={<MyRecipesContainer />} />
            <Route path='/recipe/:id' element={<RecipeDetail/>}/>
            <Route path='/favorites' element={<FavoriteContainer/>}/>
            <Route path='/popularRecipes' element={<PopularRecipesListContainer/>}/>
            <Route path='/drafts' element={<DraftListContainer/>}/>
            <Route path='/draft/:id' element={<DraftDetailContainer/>}/>
            <Route path='/addRecipesBooks' element={<AddRecipesBook/>}/>
            <Route path='/recipesBooks' element={<RecipesBooks/>}/>
            <Route path='/reports' element={<ReportRecipesContainer/>}/>
            <Route path='/' element={<RecipesListContainer/>}/>
        </Routes>
    )
}

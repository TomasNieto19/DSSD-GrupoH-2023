import React from 'react'
import { Provider } from 'react-redux'
import RecipesListContainer from './components/recipe/RecipesListContainer'
import { store } from './store/store'
import { NavBar } from './components/utils/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AddRecipe } from './components/recipe/AddRecipe'
import MyRecipesContainer from './components/recipe/MyRecipesContainer'
import RecipeDetail from './components/recipe/RecipeDetailContainer'
import Register from './components/auth/Register'
import Login from './components/auth/Login'


const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<RecipesListContainer/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/addRecipe' element={<AddRecipe/>}/>
        <Route path='/myRecipes' element={<MyRecipesContainer/>}/>
        <Route path='/recipe/:id' element={<RecipeDetail/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
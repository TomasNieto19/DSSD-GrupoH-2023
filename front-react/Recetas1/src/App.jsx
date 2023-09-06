import React from 'react'
import { Provider } from 'react-redux'
import RecipesListContainer from './components/RecipesListContainer'
import { store } from './store/store'
import { NavBar } from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AddRecipe } from './components/AddRecipe'
import MyRecipesContainer from './components/MyRecipesContainer'
import RecipeDetail from './components/RecipeDetailContainer'

const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<RecipesListContainer/>}/>
        <Route path='/addRecipe' element={<AddRecipe/>}/>
        <Route path='/myRecipes' element={<MyRecipesContainer/>}/>
        <Route path='/recipe/:id' element={<RecipeDetail/>}/>
      </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
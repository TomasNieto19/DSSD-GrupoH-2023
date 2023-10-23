import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDraftsThunk } from '../../store/receta/thunksRecipe';
import { Container, Typography } from '@mui/material';
import Loader from '../../utils/components/Loader';
import RecipeNotFound from './RecipeNotFound';
import { RecipesList } from './RecipesList';

const DraftListContainer = () => {

    const dispatch = useDispatch();
    const {drafts, isLoading} = useSelector(state=> state.recipe);
    useEffect(() => {
        dispatch(getDraftsThunk());
    }, [])
    

  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 10}} >
      <Typography variant='h3'>Drafts</Typography>
        {isLoading ? <Loader/> : (drafts && drafts.length !== 0) ? <RecipesList recipes={drafts} type={"draftList"}/>: <RecipeNotFound/>}
    </Container>
  )
}

export default DraftListContainer
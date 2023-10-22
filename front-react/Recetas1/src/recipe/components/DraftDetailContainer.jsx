import React, { useEffect } from 'react'
import RecipeDetailItem from './RecipeDetailItem'
import { useDispatch, useSelector } from 'react-redux'
import { getDraftById } from '../../store/receta/thunksRecipe';
import { useParams } from 'react-router-dom';
import DraftItem from './DraftItem';
import { Container } from '@mui/material';
import Loader from '../../utils/components/Loader';

const DraftDetailContainer = () => {
    const {id} = useParams();
    const {draftDetail, isLoading} = useSelector(state => state.recipe);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getDraftById(id));
    }, [])
    console.log(draftDetail);

  return (
    <Container sx={{display: "flex", justifyContent: "center", padding: 10}}>
        {isLoading ? <Loader/>: <DraftItem draft={draftDetail}/>}
    </Container>
  )
}

export default DraftDetailContainer
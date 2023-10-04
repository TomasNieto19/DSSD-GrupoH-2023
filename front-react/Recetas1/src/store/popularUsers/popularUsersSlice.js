import { createSlice } from '@reduxjs/toolkit';

export const popularUsersSlice = createSlice({
    name: 'popularUsers',
    initialState: {
        popularUsers: [],
        isLoading: false
    },
    reducers: {
        setPopularUsers: (state, action ) => {
            state.popularUsers = action.payload.users;
            state.isLoading = false;
        },
        popularUsersLoading: (state, action) => {

            state.isLoading = true;

        }
    }
});



export const { setPopularUsers, popularUsersLoading } = popularUsersSlice.actions;
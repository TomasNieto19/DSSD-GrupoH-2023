import { recetasApi } from "../../api/api";
import { setUsersFollowing } from "../auth/authSlice";
import { setFollow, setUsers } from "./userSlice";

export const getUsers = () => {

    return async (dispatch, getState) => {
        const {auth} = getState();
        const {user} = auth;
        const {usersFollowing} = user;
        const {data, status} = await recetasApi.get("/users");
        if(status === 200){
            let usersMaped = data.users.map((user)=>{
                let userFind = usersFollowing.find(userFollowing => userFollowing.idUser === user.idUser);

                if(userFind){

                    return {

                        idUser: user.idUser,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        password: user.password,
                        followed: true
    
                    }

                }else{
                    return {

                        idUser: user.idUser,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        password: user.password,
                        followed: false
    
                    }
                }

                
            })
            dispatch(setUsers({users: usersMaped}));

        }
        

    }

}
export const setFollowThunk = (id, user) =>{

    return async (dispatch, getState) => {

        const {idUser} = user;
        const {data, status} = await recetasApi.post(`/followAction?idFollower=${id}&idFollowing=${idUser}`);
        if(status === 200){
            
            dispatch(setUsersFollowing({user: user}));
            dispatch(setFollow({id: idUser}));

        }
        

    }

}
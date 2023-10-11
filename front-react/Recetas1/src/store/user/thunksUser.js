import { recetasApi } from "../../api/api";
import { kafkaApi } from "../../api/api";
import { setUsersFollowing } from "../auth/authSlice";
import { popularUsersLoading, setFollow, setPopularUsers, setUsers } from "./userSlice";

export const getUsers = () => {

    return async (dispatch, getState) => {
        const {auth} = getState();
        const {user} = auth;
        const {usersFollowing} = user;
        const {data, status} = await recetasApi.get("/users");
        const {users} = data;
        if(status === 200){
            let usersMaped = data.users.map((user)=>{
                let userFind = usersFollowing.find(userFollowing => userFollowing.idUser === user.idUser);
                    return {
                        idUser: user.idUser,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                        password: user.password,
                        followed: userFind ? true : false
                    }     
            })
            dispatch(setUsers({users: usersMaped}));
        }
    }
}
export const setFollowThunk = (id, user) =>{

    return async (dispatch, getState) => {
        const {idUser, followed} = user;
        const {data, status} = await recetasApi.post(`/followAction?idFollower=${id}&idFollowing=${idUser}`);
        if(status === 200){
            const userKafka = {

                "idUser": idUser,
                "followed": followed

            }
            const {data: dataKafka, status: statusKafka} = await kafkaApi.post("/kafka/sendFollower", userKafka);
            dispatch(setUsersFollowing({user: user}));
            dispatch(setFollow({id: idUser}));

        }
        

    }

}

export const getPopularUsers = () =>{

    return async (dispatch, getState) =>{
        dispatch(popularUsersLoading());
        let dataMapped = [];
        const {data, status} = await kafkaApi.get("/kafka/followersUser");
        const {data: dataUsers, status: statusUsers} = await recetasApi.get("/users");
        if(status === 200 && data.length !== 0){

            dataMapped = data.map(userPop=>{
                
                let dataFind = dataUsers.users.find((user) => user.idUser === userPop.idUser );
                if(dataFind && userPop.follow !== 0){
                    
                return {

                    "idUser": userPop.idUser,
                    "followers": userPop.follow,
                    "username": dataFind.username,
                    "name": dataFind.name

                }
                }
            }
            ).filter((user)=> user!== undefined && user!==null)
        }
        dispatch(setPopularUsers({users: dataMapped}))

    }

}
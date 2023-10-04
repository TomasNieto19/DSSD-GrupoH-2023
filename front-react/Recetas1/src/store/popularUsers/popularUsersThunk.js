import { kafkaApi, recetasApi } from "../../api/api"
import { popularUsersLoading, setPopularUsers } from "./popularUsersSlice";

export const getPopularUsers = () =>{

    return async (dispatch, getState) =>{
        dispatch(popularUsersLoading());
        let dataMapped;
        const {data, status} = await kafkaApi.get("/kafka/followersUser");
        const {data: dataUsers, status: statusUsers} = await recetasApi.get("/users");
        if(data.length !== 0){

            dataMapped = data.map(userPop=>{

                let dataFind = dataUsers.users.find((user) => user.idUser === userPop.idUser );

                return {

                    "idUser": userPop.idUser,
                    "followers": userPop.follow,
                    "username": dataFind.username,
                    "name": dataFind.name

                }

            })

        }

        dispatch(setPopularUsers({users: dataMapped}))

    }

}
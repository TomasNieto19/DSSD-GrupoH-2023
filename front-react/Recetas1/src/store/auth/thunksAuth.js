import { recetasApi } from "../../api/api";
import { toRegisterUser } from "./authSlice";

export const registerUser = (username, name, email, password) => {

    return async (dispatch, getState) => {


        const bodyPost = {

            "name": name,
            "email": email,
            "username": username,
            "password": password

        }

        

        const {data, status} = await recetasApi.post("/addUser", bodyPost);
        if(status ==200){

            const bodyState = {

                "username": username,
                "userId": data.idUser
    
            }
            console.log(bodyState);
            localStorage.setItem('user', JSON.stringify(bodyState));
            dispatch(toRegisterUser({ user: bodyState }));

        }
        

    }

}
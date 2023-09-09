import { recetasApi } from "../../api/api";
import { toLoginUser } from "./authSlice";

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

            console.log("Usuario registrado correctamente");

        }
        

    }

}

export const loginUserThunk = (username, password) => {

    return async (dispatch, getState) => {

        const {data: dataLogin, status} = await recetasApi.post(`/login?username=${username}&password=${password}`);
        if(status === 200){
            
            const {data, status} = await recetasApi.get(`/followings/${dataLogin.userId}`);
            console.log(data);
            const bodyState = {

                "username": username,
                "userId": dataLogin.userId,
                "usersFollowing": data.followers

            }
            dispatch(toLoginUser({user: bodyState}));
            localStorage.setItem('user', JSON.stringify(bodyState))
            console.log("Usuario logueado correctamente correctamente");

        }
        

    }

}
import { toast } from "react-toastify";
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

            

        }
        

    }

}

export const loginUserThunk = (username, password) => {

    return async (dispatch, getState) => {
        const {data: dataLogin, status} = await recetasApi.post(`/login?username=${username}&password=${password}`);
        const {userId, message} = dataLogin;    
        if(status === 200 && userId !== 0){
            const {data, status} = await recetasApi.get(`/followings/${dataLogin.userId}`);
            const bodyState = {

                "username": username,
                "userId": dataLogin.userId,
                "usersFollowing": data.followers

            }
            dispatch(toLoginUser({user: bodyState}));
            localStorage.setItem('user', JSON.stringify(bodyState))
            

        }else{
            
            toast.error(message, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
        

    }

}
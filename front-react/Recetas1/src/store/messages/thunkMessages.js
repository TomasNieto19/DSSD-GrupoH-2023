import { toast } from "react-toastify";
import { restApi } from "../../api/api";
import { setMessages } from "./messagesSlice";

export const sendMsgThunk = (idRemitente, idDestinatario, asunto, mensaje) =>{

    return async (dispatch, getState) => {
        const msgToSend = {
            "idRemitente": idRemitente,
            "idDestinatario": idDestinatario,
            "asunto": asunto,
            "mensaje": mensaje
        }
        const {data, status} = await restApi.post(`/rest/sendMessage`, msgToSend);
        if(status === 200){
            console.log("se envió bien");
        }   
    }
}

export const getMessages = (id) =>{

    return async (dispatch, getState) => {
        const {data, status} = await restApi.get(`/rest/readMessage/${id}`);
        console.log(status)
        if(status === 200){
            
            dispatch(setMessages(data));

        }else{

            dispatch(setMessages([]))

        }   
    }

}

export const sendReplyThunk = (idMensaje, reply) =>{

    return async (dispatch, getState) => {
        const bodyReply = {

            "idMensaje": idMensaje,
            "respuesta": reply

        }
        const {data, status} = await restApi.post(`/rest/replyMessage`, bodyReply);
        if(status === 200){
            
            toast.success("Respuesta enviada correctamente");

        }else{

            toast.error("No ha sido posible enviar la respuesta");

        }   
    }

}
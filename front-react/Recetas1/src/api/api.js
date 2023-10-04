import axios from 'axios';

export const recetasApi = axios.create({

    baseURL: "https://localhost:7238",

})

export const imgurApi = axios.create({

    baseURL: "https://api.imgur.com",

})

export const kafkaApi = axios.create({
    baseURL: "http://localhost:8080"
})

const headersKafka = {

    'Access-Control-Allow-Origin' : '*'

}

kafkaApi.defaults.headers.common = {...kafkaApi.defaults.headers.common, ...headersKafka};
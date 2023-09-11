import axios from 'axios';

export const recetasApi = axios.create({

    baseURL: "https://localhost:7238",

})

export const imgurApi = axios.create({

    baseURL: "https://api.imgur.com",

})
import axios from 'axios';

export const recetasApi = axios.create({

    baseURL: "https://localhost:7238",

})
import axios from 'axios'
import { parseCookies } from 'nookies'


export const api = axios.create({
    baseURL: "http://127.0.0.1:3001"
}) 


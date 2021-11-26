import axios from "axios"
import { API_URL } from "./config"



 const data2021  = axios.get(`${API_URL}/2021/drivers`).then(
     (res) =>{
         if (res.data){
             
         }
})
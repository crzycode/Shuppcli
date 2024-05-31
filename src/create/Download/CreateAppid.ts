import axios from "axios";
import fs from 'fs'
import { UpdateWebConfig } from "../../Common/UpdateWebconfig";

export const CreateAppid = async(name:string) =>{
    const data = {
        name: name
    };
    const headers = {
        'Content-Type': 'application/json'
    };
    axios.post("http://localhost:2027/api/appstore/create", data, { headers })
    .then((response:any) => {
        UpdateWebConfig(`${name}/Frontend/webpack.config.js`,response.data.App_id).then(res =>{
            const updatedJson = JSON.stringify(response.data, null, 2);
            fs.writeFileSync(`${name}/Appstore.json`, updatedJson, 'utf8');
            console.log('Data:', response.data);
            return "done"
        })
       
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
import axios from "axios"
import FormData from 'form-data';
import fs from 'fs'
import path from "path";
import { Pack } from "../Pack/Pack";
import fse from 'fs-extra'
import { copyDirectory } from "../Common/CopyDirectory";

export class Publish{
    static publish =async() =>{
        try{
            Pack.CreateTar().then((res:any) =>{
                const filePath = `${res.out}`;
                const form = new FormData();
                form.append('file', fs.createReadStream(filePath));
                axios.post('http://localhost:2027/api/appstore/upload', form, {
                    headers: {
                        ...form.getHeaders()
                    }
                }).then(res =>{
                    console.log(JSON.stringify(res.data.data))
                    fse.remove(filePath)
                }).catch(err =>{
                    console.log(err)
                })
            }).catch(err =>{
                console.log(err)
            })
         
        }catch(err){
            console.log(err)
        }
      
    }
}
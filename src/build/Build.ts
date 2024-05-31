import { Commander } from "../Common/Commander"
import { BuildProject } from "./Build/BuildProject"
import fse from 'fs-extra'
import fs from 'fs'

export class Build{
    static build = async() =>{
        BuildProject().then(res =>{
            console.log(res)
            if (!fs.existsSync("lib")) {
              fs.mkdir("lib", (err) => {
                    if(err){
                        console.log(err)
                        return
                    }
                   fse.copy("Frontend/lib","lib").then(res =>{
                    fse.copy("Backend/lib","lib").then(res =>{
                        fse.copy("Backend/package.json","lib/Backend/package.json")
                        return
                       })
                   })
                 

                });
            }

        }).catch(err =>{
            console.log(err)
        })
    }
}
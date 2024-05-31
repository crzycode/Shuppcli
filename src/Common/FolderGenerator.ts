
import fs from 'fs'

export const FolderGenerator = async(data:any) =>{
    return new Promise((resolve,reject) =>{
        for(let i =0; i < data.length; i++){
            if (!fs.existsSync(data[i])) {
                fs.mkdir(data[i], () => {});
            }
            if(i == data.length -1){
                resolve("done")
            }
        }
    })



}

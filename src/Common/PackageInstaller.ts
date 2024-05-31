import { exec } from "child_process";
import { fileExists } from "./Fileexist";
import fs from 'fs'
import { Tsconfig } from "./Tsconfig";
import { Commander } from "./Commander";

var count = 0;
var Name = ''

export const Initialize = async(name:any,command:any) =>{
        return new Promise((resolve,reject) =>{
            InitializePackageJson(name).then(res =>{
                PackageInstall(name,command).then(res =>{
                    Tsconfig(name).then(res =>{
                        resolve("Package Installed Success and Tscofig Configuration Done !")
                    }).catch(err =>{
                        reject(err)
                    })
                }).catch(err =>{
                    reject(err)
                })
            })
        })
       
    
}
export const InitializePackageJson = async(name:string) =>{
    try{
        new Promise((resolve, reject) =>{
                    exec(`cd ${name} && npm init -y`, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error: ${error.message}`);
                            reject(error.message)
                        }
                        if (stderr) {
                            console.error(`stderr: ${stderr}`);
                            reject(stderr)
                        }
                        console.log(`stdout: ${stdout}`);
                        var data = fs.readFileSync(`${name}/package.json`,'utf8')
                        var pack = JSON.parse(data);
                        pack.scripts.dev = "nodemon ./app.ts"
                        pack.scripts.build ="tsc"
                        pack.scripts.start = "node app.js"
                        pack.main = "app.js"
                        pack.name = name.toLowerCase()
                        const updatedJson = JSON.stringify(pack, null, 2);
                        fs.writeFileSync(`${name}/package.json`, updatedJson, 'utf8');
                        console.log('Package.json updated successfully.');
                        resolve("Done")
                       
                    });
               
   
        })
            
        
       
    }catch(err){
        console.error('Error updating package.json:', err);
        process.exit(0)
    }
  

}
export const PackageInstall = async(name:string,command:any) =>{
    count = 0
for await(let i of command){
  if(count < command.length){
   await Commander(name,i).then(res =>{
      count++
    }).catch(err =>{
      count++
    })
  }else{
   return await Commander(name,i).then(res =>{
    console.log('Packages installed Successfully !')
      return'Packages installed Successfully !'
    })
   
  }
}
}

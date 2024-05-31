import { exec } from "child_process";

export const Commander = (name:string,Command:string) =>{
    return new Promise((resolve,rejects) =>{
      exec(`cd ${name} && ${Command}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          rejects(error.message)
      }
      if (stderr) {
          console.error(`stderr: ${stderr}`);
          rejects(stderr)
      }
      console.log("Package Intall Successfully:"+Command,stdout);
      resolve("done")
      })
    })
  }
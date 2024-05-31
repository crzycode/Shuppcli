import { exec } from "child_process";
import { Commander } from "../../Common/Commander";

export const BuildProject = async() => {

    var paths: any[] = [
      { path: "Frontend", Command: "ng build" },
      { path: "Backend", Command: "tsc" },
    ];
    for await (let i of paths) {
      await Commander(i.path, i.Command)
        .then((res) => {
          console.log(res);
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return await "Successfully Build"



  
};

import { exec } from "child_process";
import fs from 'fs'

export const Tsconfig = (name:string) =>{
    var UpdateFile: any;
    var Value: any[] = [
      `// "outDir": "./"`,
      `// "rootDir": "./"`,
      `// "experimentalDecorators": true`,
      `// "emitDecoratorMetadata": true`,
      `// "moduleResolution": "node10"`,
      `// "resolveJsonModule": true`,
      `// "sourceMap": true`,
    ];
    var Replace: any[] = [
      `"outDir": "./lib"`,
      `"rootDir": "./"`,
      `"experimentalDecorators": true`,
      `"emitDecoratorMetadata": true`,
      `"moduleResolution": "node10"`,
      `"resolveJsonModule": true`,
      `"sourceMap": true`
    ];
    return new Promise((resolve,rejects) =>{
      try{
        exec(`cd ${name} && tsc --init`, (err, out, stde) => {
          if (err) {
            console.error(`Error: ${err.message}`);
            rejects(err.message)
          }
          if (stde) {
            console.error(`stderr: ${stde}`);
            rejects(stde)
          }
          console.log(`stdout: ${out}`);
          UpdateFile = fs.readFileSync(`${name}/tsconfig.json`, "utf8");
          for (let i = 0; i < Value.length; i++) {
            let regex = new RegExp(Value[i], "g");
            UpdateFile = UpdateFile.replace(regex, Replace[i]);
          }
          fs.writeFileSync(`${name}/tsconfig.json`, UpdateFile, "utf8");
          resolve("tsconfig Generated Successfully !")
        });
      }catch(err){
        rejects(err)
      }
  
    })
  
  }
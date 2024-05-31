import fs from "fs";
export const UpdateWebConfig = async(path:any,id:any) => {
  await fs.readFile(path, "utf8", (err, data) => {
   var v = data.replace(/frontend/gi, id.toLowerCase())
    fs.writeFileSync(path, v, 'utf8');
  });
return await "done"
};

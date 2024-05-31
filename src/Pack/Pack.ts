import fs from "fs";
import * as tar from "tar";
import zlib from "zlib";
import path from "path";
import * as fse from "fs-extra";
import { Filereader } from "../Common/FileReader";


export class Pack {
  static CreateTar = async() => {
        const mode = 0o755;
        var res:any = await Filereader("./package.json")
        var App:any = await Filereader("./Appstore.json")
        var Getappid = JSON.parse(App);
        var data = JSON.parse(res);
        var src = "lib";
        const out = `${src}/${data.name}-${data.version}.tgz`;
        const Foldername = Getappid.App_id;
        const tempDir = path.join(path.dirname(src), "temp");
         fse.ensureDir(tempDir,mode);
        const tempFolderPath = path.join(tempDir, Foldername);
        await fs.promises.chmod(src,mode)
        await fs.promises.chmod(tempDir,mode)
        await fse.copy(src, tempFolderPath);
        return await fse.copy("./package.json", `${tempFolderPath}/package.json`).then(res =>{
         return  tar
             .c(
               {
                 gzip: true,
                 file: out,
                 cwd: tempDir,
               },
               [Foldername]
             )
             .then((res) => {
               fse.remove(tempDir);
               console.log(`Created ${out} successfully.`);
               return {src:src,out:out}
             });
        })
  };
  static CreatePack = async() => {
    const mode = 0o755;
    var res:any = await Filereader("./package.json")
    var App:any = await Filereader("./Appstore.json")
    var Getappid = JSON.parse(App);
    var data = JSON.parse(res);
    var src = "lib";
    const out = `${data.name}-${data.version}.tgz`;
    const Foldername = Getappid.App_id;
    const tempDir = path.join(path.dirname(src), "temp");
     fse.ensureDir(tempDir,mode);
    const tempFolderPath = path.join(tempDir, Foldername);
    await fs.promises.chmod(src,mode)
    await fs.promises.chmod(tempDir,mode)
    await fse.copy(src, tempFolderPath);
    return await fse.copy("./package.json", `${tempFolderPath}/package.json`).then(res =>{
     return  tar
         .c(
           {
             gzip: true,
             file: out,
             cwd: tempDir,
           },
           [Foldername]
         )
         .then((res) => {
           fse.remove(tempDir).then(res =>{
            console.log(`Created ${out} successfully.`);
            process.exit(0)
           });
         });
    })
};
}
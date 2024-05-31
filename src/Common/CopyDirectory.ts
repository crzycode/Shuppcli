import fs from 'fs'
import path from 'path';
export const copyDirectory = async(src:any, dest:any) => {
    try {
        // const mode = 0o755;
        // fs.chmodSync(dest,mode)
        fs.mkdir(dest, { recursive: true },err => {});
        const entries:any = await fs.readdir(src, { withFileTypes: true },(err,data) =>{
            if(err){
                console.log(err)
            }
            for (let entry of data) {
                const srcPath = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);
                if (entry.isDirectory()) {
                     copyDirectory(srcPath, destPath).then(res =>{});
                } else {
                     fs.copyFile(srcPath, destPath,(err) =>{
                        console.log(err)
                    });
                }
            }
        });
       
        console.log(`Copied ${src} to ${dest}`);
    } catch (err:any) {
        if (err.code === 'EACCES' || err.code === 'EPERM') {
            console.error(`Permission denied: ${err.message}`);
        } else {
            console.error(`Error copying directory: ${err.message}`);
        }
    }
}
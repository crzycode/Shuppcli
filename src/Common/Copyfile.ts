import fs from 'fs'
export const copyFileSync =  async(src:any, dest:any) => {
    try {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${src} to ${dest}`);
    } catch (err:any) {
        if (err.code === 'EACCES' || err.code === 'EPERM') {
            console.error(`Permission denied: ${err.message}`);
        } else {
            console.error(`Error copying file: ${err.message}`);
        }
    }
}
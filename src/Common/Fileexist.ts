
import fs from 'fs'
export const fileExists = async(filePath:any) => {
    try {
        fs.accessSync(filePath, fs.constants.F_OK);
        return true;
    } catch (err:any) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            throw err;
        }
    }
}
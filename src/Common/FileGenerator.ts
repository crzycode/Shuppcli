import fs from 'fs'
export const FileGenerate = async(Filepath:any,Content:any) =>{
    return new Promise((resolove, rejects) =>{
        fs.writeFile(Filepath,Content , (error) => {
            if (error) {
                console.error('Error writing file:', error);
                rejects(error)
            } else {
                console.log('Updated Successfully');
                resolove("Success")
            }
        });
    })
       
}
import fs from 'fs'
export const Filereader =(Filename:string) =>{
    return new Promise((resolve,rejects) =>{
        fs.readFile(Filename, 'utf8', (err, data) => {
            if (err) {
                rejects(err)
            }
            resolve(data)
          });
    })
}
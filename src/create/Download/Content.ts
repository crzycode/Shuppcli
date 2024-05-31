
import fs from 'fs'
import path, { resolve } from 'path';
import http from 'http'
import * as tar from "tar";
import zlib from "zlib";
import fse from 'fs-extra'
import request from 'request';
import { rejects } from 'assert';


export const downloadFile = async(names:any) => {
    const url:any = 'http://localhost:8080/Structure/Project.tgz';
    return new Promise((resolve,rejects) =>{
         downloading(url, names).then((res) => {
            resolve(res)
        });
    })
}
const downloading = (url:any,name:any) =>{
    return new Promise((resolve, reject) => {
        const filePath = `${name}/${path.basename(url)}`;
        request(url)
        .pipe(fs.createWriteStream(filePath))
        .on('close', () => {
              tar.x({
                file: filePath,
                C: name
            }).then(res =>{ 
                fse.remove(filePath)
                resolve(url)
            }).catch(err =>{
                console.log(err)
                reject(err)
            })
        })
        .on('error', (err) => {
            console.error(`Error: ${err.message}`);
            reject(err)
        });
    });
}

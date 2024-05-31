
import readline from 'readline'
import { program } from "commander"
import inquirer from "inquirer";
import { askQuestion } from '../Common/AskQuestion';
import {downloadFile } from './Download/Content';
import fs from 'fs'
import { Filereader } from '../Common/FileReader';
import { exec } from 'child_process';
import { InitializePackageJson, PackageInstall } from '../Common/PackageInstaller';
import { Commander } from '../Common/Commander';
import { startAnimation } from '../Common/Animation';
import { CreateAppid } from './Download/CreateAppid';
export class Create {
    private static Data: any[] = ["Tiktok", "project"];
    private static availableTypes = ['Create New Project', 'Existing Project'];

  static create = async(Type: any) => {
    program
  .option('-t, --type <type>', 'Specify the type')
  .option('-v, --verbose', 'Enable verbose mode')
  .parse(process.argv);
  const options = program.opts();
  if (options.verbose) console.log(options);
  if (!options.type) {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Select One:',
          choices: this.availableTypes,
          when: !options.type,          
        }
      ])
      .then(answers => {
        const type = options.type || answers.type;  
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
      });
        if (type == "Create New Project") {
          const rarFilePath = askQuestion('? Project Name: ',rl).then((res:any) =>{
            fs.mkdir(`${res}`, (err) => {
              if (err) {
                console.log(err?.message);
              }else{
                downloadFile(res).then(da =>{
                  const animationInterval = startAnimation();
                  InitializePackageJson(res).then((p) =>{
                    CreateAppid(res).then(hg =>{
                      Commander(`${res}/Frontend`,"npm install --force").then(r =>{
                        console.log(r)
                        Commander(`${res}/Backend`,"npm install --force").then(r =>{
                          console.log(r)
                          clearInterval(animationInterval)
                          process.exit(0)
                         
                        }).catch(err =>{
                          console.log(err)
                          clearInterval(animationInterval)
                          process.exit(0)
                        })
                      }).catch(err =>{
                        console.log(err)
                        Commander(`${res}/Backend`,"npm install --force").then(r =>{
                          console.log(r)
                          clearInterval(animationInterval)
                          process.exit(0)
                         
                        }).catch(err =>{
                          console.log(err)
                          clearInterval(animationInterval)
                          process.exit(0)
                        })
                      })
                    })
                  
                  })
                })
              }
            });
          });
        } else {
          const rarFilePath = askQuestion('App Id: ',rl).then(res =>{
            console.log(res)
            rl.close()
          
          });
        }
      });
  } else {
    console.log(`Type: ${options.type}`);
  }
  };
}

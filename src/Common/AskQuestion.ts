
const readline = require('readline');
export const askQuestion =(query:any,rl:any) => {
    return new Promise((resolve) => rl.question(query, resolve));
}

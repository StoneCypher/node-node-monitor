
const cpu = () => new Promise( (resolve, reject) => resolve('cpu auto-pass') );
const ram = () => new Promise( (resolve, reject) => resolve('ram auto-pass') );

export { ram, cpu };

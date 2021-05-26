const { get_cone_data } = require('./build/Release/addon');

const NATIVE = 'C++';
const args = [3,2,5];

console.time(NATIVE);
console.log(get_cone_data(...args));
console.timeEnd(NATIVE);

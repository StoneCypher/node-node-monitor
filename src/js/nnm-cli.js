
import * as nnm from './nnm.js';

nnm.lib.monitorTick()
       .then(res => console.log('Result:\n------\n\n' + JSON.stringify(res, undefined, 4)));

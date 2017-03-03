
import { runMetrics } from './metrics.js';





const seq = to => new Array(to).fill(false).map( (_, i) => i);





const boundedAll = promiseArray => {

    const started_at = (new Date()).getTime();

    return Promise.all(promiseArray).then( results => {

        const ended_at = (new Date()).getTime();
        return { start: started_at, end: ended_at, time: ended_at - started_at, results: results };

    } );

};





const monitorTick = ({ promises = runMetrics() } = {}) =>

    boundedAll(promises);





export { monitorTick, boundedAll, seq };

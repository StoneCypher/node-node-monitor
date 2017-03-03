
const seq       = to                  => new Array(to).fill(false).map( (_, i) => i);
      randTime  = (slow, fast)        => slow + Math.trunc( Math.random() * (fast-slow) ),
      randTimes = (count, slow, fast) => seq(count).map( _ => randTime(slow, fast) );





const promiseLater = async (time, index, behavior, context) => {

    return new Promise( (resolve, reject) => {

        window.setTimeout(() => {
            behavior(context, index, resolve, reject);
        }, time);

    });

}





const cpu = () => new Promise( (resolve, reject) => resolve('cpu auto-pass') );
const ram = () => new Promise( (resolve, reject) => resolve('ram auto-pass') );

const promiseLookup = { cpu, ram };

const getMetrics = (whichMetrics = ['cpu','ram']) => whichMetrics.map(key => promiseLookup[key]);
const runMetrics = (whichMetrics = ['cpu','ram']) => whichMetrics.map(key => promiseLookup[key]());





const llog = (context, index, resolve, reject) => { console.log(index + ': ' + context); resolve(1); }
const flog = (context, index, resolve, reject) => { console.log(index + ': ' + context); reject(); }





const manyLaterPromises = (count, slow, fast, behavior, context) => {
    return randTimes(count, slow, fast).map( (time, i) => promiseLater( time, i, behavior, context ));
}





const boundedAll = promiseArray => {

    const started_at = (new Date()).getTime();

    return Promise.all(promiseArray).then( results => {

        const ended_at = (new Date()).getTime();
        return { start: started_at, end: ended_at, time: ended_at - started_at, results: results };

    } );

}





const monitorTick = config =>

    boundedAll(config.promises).then(res => console.log('Result:\n------\n\n' + JSON.stringify(res)));

const uTick = () => monitorTick({ promises: manyLaterPromises(25, 1500, 5000, llog, 'abc') });
const vTick = () => monitorTick({ promises: runMetrics() });

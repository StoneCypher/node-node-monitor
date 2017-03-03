
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





const llog = (context, index, resolve, reject) => { console.log(index + ': ' + context); resolve(); }
const flog = (context, index, resolve, reject) => { console.log(index + ': ' + context); reject(); }





const manyLaterPromises = (count, slow, fast, behavior, context) => {
    return randTimes(count, slow, fast).map( (time, i) => promiseLater( time, i, behavior, context ));
}





const boundedAll = promiseArray => {

    const started_at = (new Date()).getTime();

    return Promise.all(promiseArray).then( results => {

        const ended_at = (new Date()).getTime();
        return { start: started_at, end: ended_at, results: results };

    } );

}





const monitorTick = config =>

    new Promise(
        (resolve, reject) => {

        }
    );

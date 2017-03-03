
const cpu = () => new Promise( (resolve, reject) => resolve({ which: 'cpu', pass: true, data: 'cpu auto-pass'}) );
const ram = () => new Promise( (resolve, reject) => resolve({ which: 'ram', pass: true, data: 'ram auto-pass'}) );




const metricsLookup  = { cpu, ram },
      allMetrics     = Object.keys(metricsLookup),
      defaultMetrics = allMetrics;




const getMetrics = (whichMetrics = defaultMetrics) => whichMetrics.map(key => metricsLookup[key]);
const runMetrics = (whichMetrics = defaultMetrics) => whichMetrics.map(key => metricsLookup[key]());





export {
	ram, cpu,
	metricsLookup, getMetrics, runMetrics,
	allMetrics, defaultMetrics
};

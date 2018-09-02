
const yaml = require('js-yaml');
const fs = require('fs');
const {Seq} = require('immutable')
const {filter} = require('fuzzaldrin');

const consonantsSource = yaml.safeLoad(fs.readFileSync('./consonants.yaml'))
const consonants = new Seq(consonantsSource)

const candidates = consonants.map(
	c => ({
		...c,
		searchName: [c.voicing, c.place, c.manner, c.mechanism, c.airstream].join(' ')
	})
).toJS();

// // console.log(searchableNames.toJS());
//
// const symbols = consonants.toKeyedSeq().toMap();

// console.log(symbols.toJS());

const results = filter(candidates, process.argv[2], {key: 'searchName'});

if (results[0]) {
	console.log(results[0].symbol);
} else {
	console.log("error!")
}

// console.log(
// 	consonants.map()
// );

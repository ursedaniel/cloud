'use strict';

const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'tema-3-200116';

// Instantiates a client
const translate = new Translate({
    projectId: projectId,
});

// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'ro';

// Translates some text into Russian
translate
    .translate(text, target)
    .then(results => {
        const translation = results[0];

        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
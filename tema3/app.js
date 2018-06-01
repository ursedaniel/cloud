'use strict';

var express = require('express');


var app = express();

app.get('/translate', function (req, res) {
    //res.status(200).send('hello mama');
    // Imports the Google Cloud client library
    const Logging = require('@google-cloud/logging');

// Your Google Cloud Platform project ID
    const projectId = 'tema-3-200116';

// Creates a client
    const logging = new Logging({
        projectId: projectId,
    });

// The name of the log to write to
    const logName = 'my-log';
// Selects the log to write to
    const log = logging.log(logName);

// The data to write to the log
    const route = 'Ruta: /translate';
    const api = 'Serviciu: Google Cloud Translation API';
    var date = new Date();
// The metadata associated with the entry
    const metadata = {resource: {type: 'global'}};
// Prepares a log entry
    const entry = log.entry(metadata, route, api, date);

// Writes the log entry
    log
        .write(entry)
        .then(() => {
            console.log(`Logged: ${route}. Date: ${date}. Serviciu: ${api}`);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
    res.sendFile('index.html', {root: '.'});
});

app.get('/analyzeentities', function (req, res) {
     // Imports the Google Cloud client library
    const Logging = require('@google-cloud/logging');

// Your Google Cloud Platform project ID
    const projectId = 'tema-3-200116';

// Creates a client
    const logging = new Logging({
        projectId: projectId,
    });

// The name of the log to write to
    const logName = 'my-log';
// Selects the log to write to
    const log = logging.log(logName);

// The data to write to the log
    const route = 'Ruta: /analyzeentities';
    const api = 'Serviciu: Cloud Natural Language API';
    var date = new Date();
// The metadata associated with the entry
    const metadata = {resource: {type: 'global'}};
// Prepares a log entry
    const entry = log.entry(metadata, route, api, date);

// Writes the log entry
    log
        .write(entry)
        .then(() => {
            console.log(`Logged: ${text}. Date: ${date}. Serviciu: ${api}`);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
    res.sendFile('index2.html', {root: '.'});
});

app.get('/checkimage', function (req, res) {

    // Imports the Google Cloud client library
    const Logging = require('@google-cloud/logging');

// Your Google Cloud Platform project ID
    const projectId = 'tema-3-200116';

// Creates a client
    const logging = new Logging({
        projectId: projectId,
    });

// The name of the log to write to
    const logName = 'my-log';
// Selects the log to write to
    const log = logging.log(logName);

// The data to write to the log
    const route = 'Ruta: /checkimage';
    const api = 'Serviciu: Google Compute Engine API';
    var date = new Date();
// The metadata associated with the entry
    const metadata = {resource: {type: 'global'}};
// Prepares a log entry
    const entry = log.entry(metadata, route, api, date);

// Writes the log entry
    log
        .write(entry)
        .then(() => {
            console.log(`Logged: ${text}. Date: ${date}. Serviciu: ${api}`);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
    res.sendFile('index3.html', {root: '.'});
});

var server = app.listen(process.env.PORT || '8080', function () {
    console.log('App listening to port %s', server.address().port);
});


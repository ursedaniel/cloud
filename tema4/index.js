var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World')

});

app.get('/translate', function (req, res) {
    res.sendFile('translate.html', {root: '.'});

    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
    day = new Date().getDate();
    hour = new Date().getHours();
    minutes = new Date().getMinutes();
    seconds = new Date().getSeconds();
    date = day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds;
    insertDatabase('translate', date, networkInterfaces['Wi-Fi'][1].address);

});

app.get('/face', function (req, res) {
    res.sendFile('face.html', {root: '.'});

    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
    day = new Date().getDate();
    hour = new Date().getHours();
    minutes = new Date().getMinutes();
    seconds = new Date().getSeconds();
    date = day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds;
    insertDatabase('face', date, networkInterfaces['Wi-Fi'][1].address);
});

app.get('/keywords', function (req, res) {
    res.sendFile('keywords.html', {root: '.'});

    year = new Date().getFullYear();
    month = new Date().getMonth() + 1;
    day = new Date().getDate();
    hour = new Date().getHours();
    minutes = new Date().getMinutes();
    seconds = new Date().getSeconds();
    date = day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds;
    insertDatabase('keywords', date, networkInterfaces['Wi-Fi'][1].address);
});


app.listen(3000);

var os = require('os');

var networkInterfaces = os.networkInterfaces();

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

// Create connection to database
var config =
    {
        userName: 't4cc', // update me
        password: 'tema4@cc', // update me
        server: 't4cc.database.windows.net', // update me
        options:
            {
                database: 't4' //update me
                , encrypt: true
            }
    }
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through

connection.on('connect', function (err) {
        if (err) {
            console.log(err)
        }
        else {
            queryDatabase()
        }
    }
);

function queryDatabase() {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
        "SELECT * from Log order by id desc",
        function (err, rowCount, rows) {
            console.log(rowCount + ' row(s) returned');
        }
    );

    request.on('row', function (columns) {
            // columns.forEach(function(column) {
            //     console.log("%s\t%s", column.metadata.colName, column.value);
            // });
            // console.log(columns);
            var j = 0;
            var row = "";
            for (i = 0; i < columns.length; i++) {
                row = row + columns[i].metadata.colName + ": " + columns[i].value + "   ";
                j++;
                if (j == 4) {
                    console.log(row);
                    row = "";
                    j = 0;
                }
            }
        }
    );
    connection.execSql(request);
}

function insertDatabase(route, time, ip) {
    // console.log('Reading rows from the Table...');

    // Read all rows from table
    var string = "INSERT INTO Log (date,route,ip) VALUES ('" + time + "','" + route + "','" + ip + "')";
    request = new Request(
        "INSERT INTO Log (date,route,ip) VALUES ('" + time + "','" + route + "','" + ip + "')",
        function (err, rowCount, rows) {
            // console.log(rowCount + ' row(s) returned');
        }
    );

    request.on('row', function (columns) {
        // columns.forEach(function(column) {
        //     console.log("%s\t%s", column.metadata.colName, column.value);
        // });
        console.log(columns);
    });
    connection.execSql(request);
}
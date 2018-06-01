const http = require('http');
var books = [{id: 1, name: 'Best Book'}, {id: 2, name: 'Weak Book'}];
var lastId = books[books.length - 1].id + 1;

http.createServer((request, response) => {
    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });
    response.on('error', (err) => {
        console.error(err);
    });
    var url = request.url.split('/');
    if (request.method === 'GET' && url[1] === 'books' && url[2] === undefined) {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(books));
        response.end();
    } else if (request.method === 'POST' && url[1] === 'books' && url[2] === undefined) {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            if (isJson(body)) {
                for (var i = 0; i < JSON.parse(body).length; i++) {
                    books.push({id: lastId, name: JSON.parse(body)[i].name});
                    lastId++;
                }
                response.statusCode = 200;
                response.end();
            }
            else {
                response.statusCode = 400;
                response.end('Wrong JSON!');
            }
        });
    } else if (request.method === 'PUT' && url[1] === 'books' && url[2] === undefined) {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            if (isJson(body) && JSON.parse(body).length >= 0 ) {
                books = JSON.parse(body);
                lastId = books[books.length - 1].id + 1;
                response.statusCode = 200;
                response.end();
            }
            else {
                response.statusCode = 400;
                response.end('Wrong JSON!');
            }
        });
    } else if (request.method === 'DELETE' && url[1] === 'books' && url[2] === undefined) {
        books = [];
        lastId = 1;
        response.statusCode = 200;
        response.end();
    } else if (request.method === 'GET' && url[1] === 'books' && url[2] !== undefined && url.length == 3) {
        var object = books.find(x => x.id === Number(url[2]));
        if (object != undefined) {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(object));
            response.end();
        }
        else {
            response.end('Object with id ' + url[2] + ' doesnt exist!');
        }
    } else if (request.method === 'PUT' && url[1] === 'books' && url[2] !== undefined && url.length == 3) {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            if (isJson(body)) {
                var objectId = books.find(x => x.id === Number(url[2]));
                if (objectId != undefined) {
                    var elementPos = books.map(function (x) {
                        return x.id;
                    }).indexOf(objectId.id);
                    books[elementPos].name = JSON.parse(body).name;
                }
                else {
                    books.push({id: url[2], name: JSON.parse(body).name});
                    response.write(url[2]);
                }
                response.statusCode = 200;
                response.end();
            }
            else {
                response.statusCode = 400;
                response.end('Wrong JSON!');
            }
        });
    } else if (request.method === 'POST' && url[1] === 'books' && url[2] !== undefined && url.length == 3) {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            if (isJson(body)) {
                books.push({id: lastId, name: JSON.parse(body).name});
                lastId++;
                response.statusCode = 200;
                response.end();
            }
            else {
                response.statusCode = 400;
                response.end('Wrong JSON!');
            }
        });
    } else if (request.method === 'DELETE' && url[1] === 'books' && url[2] !== undefined && url.length == 3) {
        var objectId = books.find(x => x.id === Number(url[2]));
        if (objectId != undefined) {
            var elementPos = books.map(function (x) {
                return x.id;
            }).indexOf(objectId.id);
            books.splice(elementPos, 1);
            response.statusCode = 200;
            response.end();
        }
        else {
            response.statusCode = 400;
            response.end('Object with id ' + url[2] + ' doesnt exist!');
        }
    }
    else {
        response.statusCode = 404;
        response.end();
    }
}).listen(8080);

function isJson(string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}
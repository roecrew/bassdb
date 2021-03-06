﻿function bassdb() {
    this.fs = require('fs');
    if (!this.fs.existsSync(__dirname + '/baasdb')) {
        this.fs.mkdirSync(__dirname + '/baasdb');
    }
}

bassdb.prototype.create = function(collection, json) {
    let fs = this.fs;
    return new Promise(function (resolve, reject) {
        if(!json) {
            fs.open(__dirname + '/baasdb/' + collection + '.json', 'w', function(err, file) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } else {
            fs.writeFile(__dirname + '/baasdb/' + collection + '.json', JSON.stringify(json), function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }
    });
}

bassdb.prototype.destroy = function(collection) {
    let fs = this.fs;
    return new Promise(function (resolve, reject) {
        fs.unlink(__dirname + '/baasdb/' + collection + '.json', function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

bassdb.prototype.fetch = function(collection) {
    let fs = this.fs;
    return new Promise(function (resolve, reject) {
        fs.readFile(__dirname + '/baasdb/' + collection + '.json', function(err, json) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(json));
            }
        });
    });
}

bassdb.prototype.update = function(collection, json) {
    let fs = this.fs;
    return new Promise(function (resolve, reject) {
        fs.writeFile(__dirname + '/baasdb/' + collection + '.json', JSON.stringify(json), function(err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = new bassdb();
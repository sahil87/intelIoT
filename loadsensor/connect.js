'use strict';

var Cloudant = require('cloudant');
var me = 'sahilahuja';
var key = 'amedivermsectedrevellymo'; // Set this to your own account
var password = '87e39d008ed0f56ff2853766beac88a8436b8611';

// Initialize the library with my account.
var cloudant = Cloudant({account: me, key: key, password: password});
var db = cloudant.db.use('loadsensor');

function print(results)
{
    console.dir(results.docs);
    // console.log('{');
    // for (var i = 0; i < results.docs.length; i++) {
    //
    //     console.log('%s,', JSON.stringify(results.docs[i]));
    // }
    // console.log('}');
}

function find(query, callback) {
    db.find(query, function (er, results) {
        if (er) {
            throw er;
        }
        console.log('Found %d documents.', results.docs.length);
        callback(results);
    });
}

function insert(object, callback) {
    db.insert(object, function (err, body, header) {
        if (err)
            return console.log('[alice.insert] ', err.message);
        console.log('you have inserted the rabbit.');
        console.log(body);
        callback();
    });
}

function initialize() {
    var createTimeIndex = {name: 'createTime', type: 'json', index: {fields: ['createTime']}};
    var configIndex = {name: 'config', type: 'json', index: {fields: ['config']}};

    db.index(createTimeIndex, function (er, response) {
        if (er) {
            throw er;
        }
        console.log('Index creation result: %s', response.result);
    });
    db.index(configIndex, function (er, response) {
        if (er) {
            throw er;
        }
        console.log('Index creation result: %s', response.result);
    });
    db.index(function (er, result) {
        if (er) {
            throw er;
        }
        console.log('The database has %d indexes', result.indexes.length);
        for (var i = 0; i < result.indexes.length; i++) {
            console.log('  %s (%s): %j', result.indexes[i].name, result.indexes[i].type, result.indexes[i].def);
        }
    });
}

exports.print = print;
exports.find = find;
exports.insert = insert;
exports.initialize = initialize;

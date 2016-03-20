'use strict';

$( window ).load(function() {
  var db = cloudant.db.use('loadsensor');
  var allSelector = {"_id": { "$gt": null }};
  find({"selector": allSelector, "limit": 10}, function onFind(results) {
    print(results);
  });
});

function print(results) {
  for (var i = 0; i < results.docs.length; i++) {
    console.log('Doc %s: %s', i, JSON.stringify(results.docs[i]));
  }
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
    console.log(body)
    callback();
  });
}

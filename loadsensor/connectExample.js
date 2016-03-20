var connect = require('./connect');

var object = {createTime: new Date(), weight: 234};

var sinceDateTime = (new Date()).getTime() - 1000 * 60 * 60 * 50;
var allCreateTimeSelector = {"_id": { "$gt":0}, "createTime": {"$gt": new Date(sinceDateTime), }};
// var allSelector = {"_id": { "$gt": null }};
connect.find({"selector": allCreateTimeSelector, "limit": 10, "sort": [{"createTime": "desc"}]}, function onFind(results) {
    connect.print(results);
});

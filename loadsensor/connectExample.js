var connect = require('./connect');

var object = {createTime: new Date(), weight: 234};
insert(object);
var sinceDateSelector = (new Date()).getTime() - 1000 * 60;
var allCreateTimeSelector = {selector: {createTime: {$gt: 0}}};
var allSelector = {"_id": { "$gt": null }};
find({"selector": allSelector, "limit": 10}, function onFind(results) {
    print(results);
});

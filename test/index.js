let asyncThrottle = require('../src/index.js');

var jobs = [];

jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job1 - done!";
        console.log(data);
        resolve(data);
    }, 2500);
});
jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job2 - done!";
        console.log(data);
        resolve(data);
    }, 2500);
});
jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job3 - done!";
        console.log(data);
        resolve(data);
    }, 2500);
});
jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job4 - done!";
        console.log(data);
        resolve(data);
    }, 2500);
});
jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job5 - done!";
        console.log(data);
        resolve(data);
    }, 2500);
});
jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job6 - done!";
        console.log(data);
        resolve(data);
    }, 2500);
});

asyncThrottle.parallel(jobs, 2, 200, () => {
  console.log('all done.');
});


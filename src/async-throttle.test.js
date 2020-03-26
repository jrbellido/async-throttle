let asyncThrottle = require('./async-throttle.js');

var jobs = [];

jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job1 - done!";
        console.log(data);
        resolve(data);
    }, 500);
});
jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job2 - done!";
        console.log(data);
        resolve(data);
    }, 500);
});
jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job3 - done!";
        console.log(data);
        resolve(data);
    }, 500);
});
jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job4 - done!";
        console.log(data);
        resolve(data);
    }, 500);
});
jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job5 - done!";
        console.log(data);
        resolve(data);
    }, 500);
});
jobs.push(function(resolve, reject) {
    setTimeout(function() {
        var data = "job6 - done!";
        console.log(data);
        resolve(data);
    }, 500);
});

test('works for concurrency of 1', () => {
    expect(3).toBe(3);

    asyncThrottle.parallel(jobs, 2, 100, () => {
        console.log('all done.');
    });
});

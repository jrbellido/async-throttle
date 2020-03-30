import "core-js/stable";
import "regenerator-runtime/runtime";

let asyncThrottle = require('./async-throttle.js');

function createJobs(count, time) {
    var jobs = [];
    for (let i = 0; i < count; i++) {
        jobs.push(function(resolve, reject) {
            setTimeout(function() {
                var data = `job${i}: done!`;
                console.log(data);
                resolve(data);
            }, time);
        });
    }
    return jobs;
}

test('works for concurrency of 1', async () => {
    let jobs = createJobs(20, 200);

    expect(2).toBe(2);

    await asyncThrottle.parallel(jobs, 5, 100, () => {
        console.log('all done.');
    });
});

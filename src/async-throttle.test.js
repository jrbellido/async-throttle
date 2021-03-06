import "core-js/stable";
import "regenerator-runtime/runtime";

let asyncThrottle = require('./async-throttle.js');

function createJobs(count, time, output) {
    const jobs = [];
    for (let i = 1; i <= count; i++) {
        jobs.push(function (resolve) {
            setTimeout(function () {
                output.push(Date.now());
                resolve();
            }, time);
        });
    }
    return jobs;
}

test('works for concurrency of 1', async () => {
    let result = [];
    let jobs = createJobs(6, 100, result);
    await asyncThrottle.parallel(jobs, 1, 50);

    expect(result[1] - result[0]).toBeGreaterThanOrEqual(100);
    expect(result[2] - result[1]).toBeGreaterThanOrEqual(100);
    expect(result[3] - result[2]).toBeGreaterThanOrEqual(100);
    expect(result[4] - result[3]).toBeGreaterThanOrEqual(100);
});

test('works for concurrency of 2', async () => {
    let result = [];
    let jobs = createJobs(6, 100, result);
    await asyncThrottle.parallel(jobs, 2, 50);

    expect(result[1] - result[0]).toBeLessThanOrEqual(50);
    expect(result[2] - result[1]).not.toBeLessThanOrEqual(50);
    expect(result[3] - result[2]).toBeLessThanOrEqual(50);
});

test('works for concurrency of 3', async () => {
    let result = [];
    let jobs = createJobs(6, 100, result);
    await asyncThrottle.parallel(jobs, 3, 50);

    expect(result[2] - result[0]).toBeLessThanOrEqual(50);
    expect(result[3] - result[0]).not.toBeLessThanOrEqual(50);
    expect(result[4] - result[3]).toBeLessThanOrEqual(50);
});


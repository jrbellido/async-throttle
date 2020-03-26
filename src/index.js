module.exports = {
    parallel: (tasks, maxConcurrency, delay, callback) => {
        var taskQueue = tasks.reverse();
        var allFinished = false;
        var current = 0;

        (function resolveTasks() {
            if (allFinished) {
                return;
            }
            if (taskQueue.length > 0) {
                if (current < maxConcurrency) {
                    var toTake = Math.min(maxConcurrency - current, taskQueue.length);
                    for (var i = 0; i < toTake; i++) {
                        var task = taskQueue.pop();
                        if (typeof task === 'function') {
                            current++;
                            task.apply(this, [
                                function resolveFn() {
                                    current--;
                                },
                                function rejectFn() {
                                    current--;
                                }
                            ]);
                            setTimeout(resolveTasks, delay);
                        }
                    }
                } else {
                    setTimeout(resolveTasks, delay);
                }
            } else {
                if (current === 0 && !allFinished) {
                    allFinished = true;
                    if (typeof callback === 'function') {
                        callback();
                    }
                } else {
                    setTimeout(resolveTasks, delay);
                }
            }
        })();
    }
}

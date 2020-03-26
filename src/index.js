module.exports = {
    parallel: (tasks, max, delay, clbk) => {
        var taskQueue = tasks.reverse();
        var allFinished = false;
        var current = 0;

        (function resolveTasks() {
            if (taskQueue.length > 0) {
                if (current < max) {
                    for (var i = 0; i < max - current; i++) {
                        current++;
                        taskQueue.pop()(
                            function resolveFn() {
                                current--;
                            },
                            function rejectFn() {
                                current--;
                            });
                        setTimeout(resolveTasks, delay);
                    }
                } else {
                    setTimeout(resolveTasks, delay);
                }
            } else {
                if (current === 0 && !allFinished) {
                    allFinished = true;
                    if (typeof clbk === 'function') {
                        clbk();
                    }
                } else {
                    setTimeout(resolveTasks, delay);
                }
            }
        })();
    }
}

module.exports = {
  parallel: (tasks, maxConcurrency, delay) => {
    let taskQueue = tasks.reverse();
    let current = 0;

    return new Promise ( (resolveAll, rejectAll) => {
      (function resolveTasks() {
        let toTake = Math.min(maxConcurrency - current, taskQueue.length);

        for (let i = 0; i < toTake; i++) {
          current++;
          let task = taskQueue.pop();
          task.call(this, () => {
            current--;
          });
        }

        if (taskQueue.length === 0 && current === 0) {
          resolveAll();
          return;
        } else {
          setTimeout(resolveTasks, delay);
        }
      })();
    });
  }
}


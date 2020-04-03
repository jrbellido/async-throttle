let range = require('./range.js');

module.exports = {
  parallel: (tasks, maxConcurrency, delay) => {
    let taskQueue = tasks.reverse();
    let current = 0;

    return new Promise ( (resolveAll, rejectAll) => {
      (function resolveTasks() {
        //console.log('queue:', taskQueue.length, 'current:', current);
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

      /*
      (function resolveTasks() {
      console.log('queue:', taskQueue.length, 'finished:', finished, 'current:', current);

      if (finished) {
      return resolvePromise(5); 
      }
      if (taskQueue.length > 0) {
      if (current < maxConcurrency) {
      var toTake = Math.min(maxConcurrency - current, taskQueue.length);
      for (let i of range(1, toTake)) {
      var task = taskQueue.pop();
      current++;
      task.apply(this, [
      function resolveFn() {
      current--;
      }
      ]);
      setTimeout(resolveTasks, delay);
      }
      } else {
      setTimeout(resolveTasks, delay);
      }
      } else {
      if (current === 0 && !finished) {
      finished = true;
      } else {
      setTimeout(resolveTasks, delay);
      }
      }
      })();
      */
    });
  }
}

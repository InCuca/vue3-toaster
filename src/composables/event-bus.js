const queue = {};

function on(name, callback) {
  queue[name] = queue[name] || [];
  queue[name].push(callback);
}

function off(name, callback) {
  if (queue[name]) {
    for (var i = 0; i < queue[name].length; i++) {
      if (queue[name][i] === callback) {
        queue[name].splice(i, 1);
        break;
      }
    }
  }
}

function emit(name, data) {
  if (queue[name]) {
    queue[name].forEach(callback => callback(data));
  }
}

export function useEventBus() {
  return { emit, on, off };
}

export default useEventBus();

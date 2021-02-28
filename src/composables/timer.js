const state = {
  startedAt: null,
  callback: null,
  delay: null,
  timer: null
};

function pause() {
  stop();
  state.delay -= Date.now() - state.startedAt;
}

function resume() {
  stop();
  state.startedAt = Date.now();
  state.timer = setTimeout(state.callback, state.delay);
}

function stop() {
  clearTimeout(state.timer);
}

export default function useTimer(callback, delay) {
  state.startedAt = Date.now();
  state.callback = callback;
  state.delay = delay;
  state.timer = setTimeout(callback, delay);

  return { pause, resume, stop };
}

// @flow weak

export default function stop() {
  const ts = this.TRANSITION_SCHEDULES;

  if (ts) {
    Object.keys(ts).forEach((s) => {
      ts[s].timer.stop();
    });
  }
}

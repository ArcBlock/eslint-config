/* eslint-disable import/prefer-default-export */
import EventEmitter from 'events';

export class Ready extends EventEmitter {
  emit: $TSFixMe;

  ready: $TSFixMe;

  readyCallbacks: $TSFixMe;

  readyMarks: $TSFixMe;

  constructor() {
    super();
    this.ready = false;
    this.readyCallbacks = [];
    this.readyMarks = {};
  }

  markReady(mark?: $TSFixMe) {
    if (this.ready) {
      return;
    }
    if (mark === undefined) {
      this.ready = true;
      this.readyCallbacks.forEach((x: $TSFixMe) => x());
      this.emit('ready');
    } else {
      // console.log('Ready.markReady', this.name, mark);
      this.readyMarks[mark] = true;
      this.ready = Object.values(this.readyMarks).every((x) => !!x);
      if (this.ready) {
        this.readyCallbacks.forEach((cb: $TSFixMe) => cb());
        this.emit('ready');
      }
    }
  }

  onReady(cb: $TSFixMe) {
    if (this.ready) {
      cb();
    } else {
      this.readyCallbacks.push(cb);
    }
  }
}

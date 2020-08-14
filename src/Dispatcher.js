export class Dispatcher {
    constructor() {
        this.events = {};
    }

    addListener(event, callback) {
        if (typeof callback !== 'function') {
            return false;
        }

        if (typeof event !== 'string') {
            return false;
        }

        if (this.events[event] === undefined) {
            this.events[event] = {
                listeners: [],
            };
        }

        console.log(this.events);
        this.events[event].listeners.push(callback);
    }

    removeListener(event, callback) {
        if (this.events[event] === undefined) {
            return false;
        }

        this.events[event].listeners = this.events[event].listeners.filter(
            (listener) => {
                return listener.toString() !== callback.toString();
            },
        );
    }

    dispatch(event, details) {
        if (this.events[event] === undefined) {
            return false;
        }

        this.events[event].listeners.forEach((listener) => {
            listener(details);
        });
    }
}

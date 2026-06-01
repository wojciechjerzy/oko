export class MyEvent<VALUE> {
    private listeners: { callback: (value: VALUE) => void, context?: any }[] = [];

    public addListener(callback: (value: VALUE) => void, context?: any): void {
        this.listeners.push({callback, context});
    }

    public removeListener(callback: (value: VALUE) => void, context?: any): void {
        this.listeners = this.listeners.filter(l => l.callback !== callback || l.context !== context);
    }

    public invoke(value: VALUE): void {
        this.listeners.forEach(l => l.callback.call(l.context, value));
    }
}
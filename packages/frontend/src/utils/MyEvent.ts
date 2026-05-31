export class MyEvent {
    private listeners: { callback: () => void, context: any }[] = [];

    public addListener(callback: () => void, context: any): void {
        this.listeners.push({callback, context});
    }

    public removeListener(callback: () => void, context: any): void {
        this.listeners = this.listeners.filter(l => l.callback !== callback || l.context !== context);
    }

    public invoke(): void {
        this.listeners.forEach(l => l.callback.call(l.context));
    }
}
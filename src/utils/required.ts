export function required<T>(item: T | undefined) {
    if (item === undefined) throw "Element is required";
}

export function ifDefined<T, RETURN_VALUE>(value: T | undefined, callback: (value: T) => RETURN_VALUE): RETURN_VALUE | undefined {
  if (value !== undefined) {
    return callback(value)
  }
  return undefined;
}


export function ifNotNull<T, RETURN_VALUE>(value: T | null, callback: (value: T) => RETURN_VALUE): RETURN_VALUE | undefined {
  if (value !== null) {
    return callback(value)
  }
  return undefined;
}

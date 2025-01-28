
/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any): boolean {
  return (item) && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target
 * @param source
 */
export default function deepMerge<T, R>(target: T, source: R): T {
  const output: { [key: string]: any } = { ...target as object }
  if (isObject(target) && isObject(source)) {
    Object.keys(source as object).forEach((key) => {
      if (isObject((source as any)[key])) {
        if (!(key in (target as object))) {
          Object.assign(output as any, { [key]: (source as any)[key] })
        } else {
          output[key] = deepMerge((target as any)[key], (source as any)[key])
        }
      } else {
        Object.assign(output, { [key]: (source as any)[key] })
      }
    })
  }

  return output as T
}

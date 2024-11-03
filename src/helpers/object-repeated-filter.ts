export function filterRepeatedFields<T extends object>(obj: T, referenceObj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([key, value]) => referenceObj[key as keyof T] !== value
      )
    ) as Partial<T>;
  }
  
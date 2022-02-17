let lastIdNumber = 0

/*
  Returns global unique id
 */
export function nextIncrementalId(): number {
  return lastIdNumber++
}

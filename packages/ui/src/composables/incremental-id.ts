let lastIdNumber = 0;

/*
  Returns global unique id
 */
export function useIncrementalId(): number {
  return lastIdNumber++;
}

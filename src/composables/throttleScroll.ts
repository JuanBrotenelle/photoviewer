export function useRequestQueue() {
  let isPending = false

  async function wrap<T>(fn: () => Promise<T>): Promise<T | undefined> {
    if (isPending) return
    isPending = true
    try {
      return await fn()
    } finally {
      isPending = false
    }
  }

  return { wrap }
}
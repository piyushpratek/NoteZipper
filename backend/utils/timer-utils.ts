import { WaitForTimeoutError } from './errors'

export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function waitForAsyncFunction(
  func: () => Promise<boolean>,
  timeoutInMillis: number,
  throwErrorIfConditionNeverMet = false
): Promise<void> {
  const startTime = Date.now()

  while (Date.now() - startTime < timeoutInMillis) {
    if (await func()) {
      return
    }
    await sleep(100)
  }

  if (throwErrorIfConditionNeverMet) {
    throw new WaitForTimeoutError(
      `Exceeded waitFor timeout of ${timeoutInMillis} milliseconds`
    )
  }
}

export async function waitForSyncFunction(
  func: () => boolean,
  timeoutInMillis: number,
  throwErrorIfConditionNeverMet = false
): Promise<void> {
  const syncFunctionAsAsyncFunction = async (): Promise<boolean> =>
    await Promise.resolve(func())
  await waitForAsyncFunction(
    syncFunctionAsAsyncFunction,
    timeoutInMillis,
    throwErrorIfConditionNeverMet
  )
}

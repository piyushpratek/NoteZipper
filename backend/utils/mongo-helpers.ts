import { type Connection, ConnectionStates } from 'mongoose'
import { waitForSyncFunction } from './timer-utils'

export const clearDatabase = async (connection: Connection): Promise<void> => {
  // Before attempting to stop any collections, make sure db connection is in the connected state
  await waitForSyncFunction(
    () => connection.readyState === ConnectionStates.connected,
    5000
  )

  // Drop entire database (which will drop all collections in one operation)
  await connection.dropDatabase()
}

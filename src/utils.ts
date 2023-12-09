/* global globalThis*/

const nodeCrypto = () => import('node:crypto')

const crypto = globalThis.crypto as (typeof globalThis.crypto | Awaited<ReturnType<typeof nodeCrypto>>)

/**
 * @returns A unique id
 */
export function getUID(): string {
  if ('randomBytes' in crypto) {
    return crypto.randomBytes(8).toString('hex')
  }

  const bytes = crypto.getRandomValues(new Uint8Array(8))
  const array = Array.from(bytes)
  const hexPairs = array.map(b => b.toString(16).padStart(2, '0'))

  return hexPairs.join('')
}

# Note Zipper

You can run tests for backend for this project by command: `npm run test`

##### Simple Test

```ts
test('simple', () => {
  const expected = 3
  const received = 1 + 2

  // expect(received).toBe(expected) // Way 1
  expect(received).toEqual(expected) // Way 2
})
```

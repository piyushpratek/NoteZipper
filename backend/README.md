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

## What is the value of `process.env.NODE_ENV` ?

With `npm start` we get:

`console.log('process.env.NODE_ENV?', process.env.NODE_ENV) // 'development'`

In test environment:

`console.log('process.env.NODE_ENV?', process.env.NODE_ENV) // 'test'`

## `code .bashrc` file

```
alias s='npm start'
alias d='npm run start:dev'
alias t='npm test'
```

## Dependencies install

```
npm i ts-jest eslint-plugin-jest fishery
```

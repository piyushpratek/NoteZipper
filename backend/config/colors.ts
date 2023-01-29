import colors from 'colors'

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
colors.setTheme({
  info: 'bgGreen',
  help: 'cyan',
  warn: 'yellow',
  success: 'bgBlue',
  error: 'red',
  m: 'magenta', // myString.m.b Fox chaining.: for chaining.
  b: 'bold',
  bm: ['bold', 'magenta'],
  by: ['bold', 'yellow'],
})

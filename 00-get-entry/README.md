[ts setup](https://khalilstemmler.com/blogs/typescript/node-starter-project/)


----------------------------


`applyAsync(getEntry("product3338"), log)` is curried and is the
same as `composeAsync(getEntry, log, console.log)("product3338");`

----------------------------

`applyAsync = (acc, val) => acc.then(val)` is shorthand for
`applyAsync = (acc, val) => acc.then((x) => val(x));`

- acc is short for accumulator


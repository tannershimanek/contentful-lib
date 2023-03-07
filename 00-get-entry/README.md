# Getting started

1. run `npm install`
2. run `npm run build`
3. run `npm start`

- **NOTE**: You can edit `./config.json` and add your contentful params. This will let you skip the 
cli altogether. If you want to use the config file, run `npm run start:config`

<br/>

### config.json

The *config.json* file should always follow this format:

```JSON
{
    "spaceId": "<space_id>",
    "environmentId": "<environment_id>",
    "accessToken": "<cma_access_token>",
    "entryIds": [
        "<entryId_1>",
        "<entryId_2>",
        "<entryId_3>"
    ]
}
```
<br/>
<br/>
<br/>
<br/>

## Other

----------------------------
[ts setup](https://khalilstemmler.com/blogs/typescript/node-starter-project/)


This script will allow you to enter a list of entries via cli, and return the contents of them.

----------------------------


`applyAsync(getEntry("product3338"), log)` is curried and is the
same as `composeAsync(getEntry, log, console.log)("product3338");`

----------------------------

`applyAsync = (acc, val) => acc.then(val)` is shorthand for
`applyAsync = (acc, val) => acc.then((x) => val(x));`

- acc is short for accumulator


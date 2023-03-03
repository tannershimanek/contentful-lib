import contentful from "contentful-management";
import { CFOptions } from "./types";

const applyAsync = (acc: any, val: any) => acc.then(val);

const composeAsync =
  (...funcs: any) =>
  (x: any) =>
    funcs.reduce(applyAsync, Promise.resolve(x));

const cma = async ( opts: CFOptions ) => {
  const space = await contentful
    .createClient({ accessToken: opts.token })
    .getSpace(opts.spaceId);
  const env = await space.getEnvironment(opts.environmentId || "master");
  return (entryId: string) => env.getEntry(entryId);
};

const log = (e: any) => {
  for (const key in e.sys) {
    if (typeof e.sys[key] === "object" && !Array.isArray(e.sys[key])) {
      console.info(`${key}: ${e.sys[key].sys.id}`);
    } else {
      console.info(`${key}: ${e.sys[key]}`);
    }
  }
  return e;
};

const getEntry = await cma({
    spaceId: `xx`,
    environmentId: `xx`,
    token: `xx`,
});

// pass any number of functions to composeAsync as long as they return a promise
const getEntryData = composeAsync(getEntry, log, console.log);

["entryid_1", "entryid_2", "entryid_3"].map((id) => getEntryData(id));
// todo: get entry ids from command line

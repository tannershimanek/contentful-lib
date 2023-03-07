import contentful from "contentful-management";
import { runPrompt } from "./cli/cli-tool.js";
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

const {space_id, environment_id, access_token, entries} = await runPrompt();

const getEntry = await cma({
    spaceId: space_id,
    environmentId: environment_id,
    token: access_token,
});

// todo: get function opts from cli
// pass any number of functions to composeAsync as long as they return a promise
const getEntryData = composeAsync(getEntry, log, console.log);

entries.map((id) => getEntryData(id));

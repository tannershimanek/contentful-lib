#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { client } from "./contentful.js";
import * as fs from "fs";

let config;
let space_id;
let environment_id;
let access_token;
let entries = [];

const handleConfig = (index) => {
  if (typeof process.argv[index + 1] === "undefined") {
    throw new Error("no config file specified");
  }
  const f = fs.readFileSync(process.argv[index + 1], "utf8");
  config = JSON.parse(f);

  console.log(chalk.magenta(`config file: "${process.argv[3]}"`));
  console.log(config);
};

const checkArgs = () => {
  process.argv.indexOf("--config") > -1
    ? handleConfig(process.argv.indexOf("--config"))
    : null;
};

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

console.log(chalk.green("Starting app in dev mode..."));

async function askSpaceId() {
  const answers = await inquirer.prompt({
    name: "space_id",
    type: "input",
    message: "What is your contentful space id?",
  });

  space_id = answers.space_id;
}

async function askEnvironmentId() {
  const answers = await inquirer.prompt({
    name: "environment_id",
    type: "input",
    message: "What is your contentful environment id?",
    default() {
      return "master";
    },
  });

  environment_id = answers.environment_id;
}

async function askAccessToken() {
  const answers = await inquirer.prompt({
    name: "access_token",
    type: "input",
    message: "What is your contentful access token?",
  });

  access_token = answers.access_token;
}

async function askEntries() {
  const answers = await inquirer.prompt({
    name: "entryIds",
    type: "input",
    message: "What entry do you want get?",
    default() {
        return "entry_id";
      },
  });

  entries.push(answers.entryIds);
}

if (process.argv.length > 2) {
  checkArgs();
}

if (process.argv.length === 2) {
  console.log("no args");
  await askAccessToken();
  await askSpaceId();
  await askEnvironmentId(); 
  await askEntries();
//   await sleep(1000);
//   console.log(entries)
  console.log(chalk.bold(`
  Client set with:\n
  \tSpace id: ${chalk.green(space_id)}
  \tEnvironment id: ${chalk.green(environment_id)}`));
  console.log(chalk.bold(`
  Getting entries:\n
  \t${entries.map(e => chalk.green(e))}\n`));
}

export { space_id, environment_id, access_token, entries };

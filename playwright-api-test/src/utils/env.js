const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

/**
 * Loads environment variables from a specified .env file.
 */
function loadEnv() {
  const envFilePath = path.resolve(__dirname, "../.env");
  if (fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
  }
}

/**
 * Updates the environment variable with the specified key and value.
 * 
 * @param {string} key - The key of the environment variable to update.
 * @param {string} value - The new value for the environment variable.
 * @returns {void}
 */
function updateEnv(key, value) {
  const envFilePath = path.resolve(__dirname, "../.env");

  const envVariables = fs.existsSync(envFilePath)
    ? dotenv.parse(fs.readFileSync(envFilePath))
    : {};

  envVariables[key] = value;

  const envFileContent = Object.entries(envVariables)
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  fs.writeFileSync(envFilePath, envFileContent, { encoding: "utf8" });
}

module.exports = {
  loadEnv,
  updateEnv,
};

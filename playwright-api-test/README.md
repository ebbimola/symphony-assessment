# Playwright API Testing with Dynamic Environment Variables

This is an assessment project on using Playwright for API testing, including dynamically storing response data as environment variables in a `.env` file.

## Prerequisites

- Node.js (v12 or higher)
- Playwright
- `dotenv` package

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/ebbimola/playwright-api-test.git
   cd playwright-api-test

   pnpm install
   ```

## Project Structure

```bash
playwright-api-test/
├── README.md
├── package.json
├── playwright-report
│   └── index.html
├── playwright.config.js
├── pnpm-lock.yaml
├── test-results
├── tests
│   └── endpoints
│       └── post.spec.js
└── utils
    ├── endpoint-client.js
    └── env.js
```
## Running Test

```bash
- Interractive Mode
npx playwright test -ui
- Headless Mode
npx playwright test
```
## Utility Function For Dynamic Variable Management
```bash
loadEnv()
Loads existing environment variables from the .env file into process.env.

updateEnv(key, value)
Updates or adds a key-value pair in the .env file.

function loadEnv() {
  const envFilePath = path.resolve(__dirname, "../../.env");
  if (fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
  }
}
function updateEnv(key, value) {
  const envFilePath = path.resolve(__dirname, "../../.env");

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
```
## Endpoint Test

```bash
  test("Should create a new post", async ({ request }) => {
    const data = JSON.stringify({
      title: "Assessment",
      body: "Symphony",
      userId: 1,
    });
    const response = await request.post("/posts", {
      data: data,
    });
    expect(response.status()).toBe(201);
    createdPostId = await response.json();
    createdPostId = createdPostId.id;
    updateEnv("POSTS_ID", createdPostId.toString());
    process.env.POST_ID = parseInt(createdPostId);
    expect(createdPostId).toBeDefined();
    console.log(`Created post ID: ${createdPostId}`);
  });
  ```

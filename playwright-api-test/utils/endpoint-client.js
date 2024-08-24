// const { request } = require("@playwright/test");

// const client = {
//   get: async (url) => {
//     const requestUrl = baseURL + url;
//     const response = await request.post(requestUrl);
//     const data = response;
//     return { status: response.status, data };
//   },
//   post: async (url, body) => {
//     const response = fetch(use.baseURL + url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });
//     const data = response.body.json();
//     return { status: response.status, data };
//   },
//   patch: async (url, body) => {
//     const response = fetch(use.baseURL + url, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body),
//     });
//     const data = await response.json();
//     return { status: response.status, data };
//   },
//   delete: async (url) => {
//     const response = await fetch(use.baseURL + url, {
//       method: "DELETE",
//     });
//     return { status: response.status };
//   },
// };

// (async () => {
//   const context = await request.newContext({
//       baseURL: "https://jsonplaceholder.typicode.com",
//       extraHTTPHeaders: {
//           Accept: "application/json",
//           Authorization: `token ${process.env.API_TOKEN}`,
//       },
//   });

//   await context.post("/post", {

//   });

//   // Delete a repository.
//   await context.delete(`/repos/${USER}/${REPO}`, {
//     headers: {
//       Accept: "application/json",
//       // Add GitHub personal access token.
//       Authorization: `token ${process.env.API_TOKEN}`,
//     },
//   });
// })();

// module.exports = client;

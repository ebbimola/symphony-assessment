const { test, expect, request } = require("@playwright/test");
const { loadEnv, updateEnv } = require("../../utils/env");

test.describe("Post API Tests", () => {
  let posts;
  let totalPosts;
  let createdPostId;
  loadEnv();

  /**
   * Read Total Number of Posts and Store in a Variable:
   * Send a GET request to /posts.
   * Retrieve the total number of posts from the response body.
   * Store the total number of posts in a variable for future reference.
   */
  test("Should fetch the total number of posts", async ({ request }) => {
    const response = await request.get("/posts");
    expect(response.status()).toBe(200);
    posts = await response.json();
    totalPosts = posts.length;
    expect(totalPosts).toBeGreaterThan(0);
    console.log(`Initial number of posts: ${totalPosts}`);
  });

  /**
   * Create a New Post and Store its ID:
   * Send a POST request to /posts with a new post object containing relevant data.
   * Extract the ID of the newly created post from the response body.
   * Store the ID of the created post in a variable for future reference.
   * * NOTE: The create seem to have a bug, it returns just the id of the created object.
   */
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

  /**
   * Get Only the Created Post by ID:
   * Send a GET request to /posts/{id} endpoint, replacing {id} with the ID of the created
     post.
   * Retrieve and validate the details of the created post from the response body.
   * @param {string} postId - Test will fail perpectually as the created endpoint seem to have a bug
   */
  test("Should fetch the created post by ID", async ({ request }) => {
    let postId = process.env.POST_ID;
    const response = await request.get(`/posts/${postId}`);
    const resJson = await response.json();
    // expect(response.status()).toBe(200);
    expect(resJson.id).toBe(postId);
  });

  /**
   * Replace Some Field in the Created Post with PATCH:
   * Send a PATCH request to /posts/{id} with updated field(s) of the post, replacing {id}
     with the ID of the created post.
   * Confirm the successful update
   * @since The endpoint seem to have a bug, it returns just the id of the created object
   * therefore new created post cannot be updated
   */
  test("Should update the created post", async ({ request }) => {
    const updatedPost = {
      title: "foo_updated",
    };
    const response = await request.patch(
      `/posts/${process.env.POST_ID}`,
      updatedPost
    );
    expect(response.status()).toBe(200);
    expect(response.body.title).toBe("foo_updated");
  });

  /**
   * Delete the Created Post by ID:
   * Send a DELETE request to /posts/{id} to delete the post, replacing {id} with the ID of
      the created post.
   * Verify that the post has been successfully deleted by attempting to retrieve it using a
   * GET request to /posts/{id} and ensuring a 404 status code is returned.
   */
  test("Should delete the created post", async ({ request }) => {
    const response = await request.delete(`/posts/${process.env.POST_ID}`);
    expect(response.status()).toBe(200);
  });

  /**
   * Check the Number of Posts to Ensure Integrity:
   * Send a GET request to /posts.
   * Retrieve the current total number of posts from the response body.
   * Compare the current total number of posts with the initial total number obtained in
      step 1 to ensure integrity.
   */
  test("Should verify the post count remains consistent", async ({
    request,
  }) => {
    const response = await request.get("/posts");
    expect(response.status()).toBe(200);
    const finalPostCount = await response.json().length;
    expect(finalPostCount).toBe(totalPosts);
  });
});

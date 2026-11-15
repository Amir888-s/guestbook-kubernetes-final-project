const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");

test("v2 page contains the required title and heading", () => {
  const html = fs.readFileSync("public/index.html", "utf8");
  assert.match(html, /<title>Guestbook - v2<\/title>/);
  assert.match(html, /<h1>Guestbook - v2<\/h1>/);
});

test("Dockerfile exposes the application port", () => {
  const dockerfile = fs.readFileSync("Dockerfile", "utf8");
  assert.match(dockerfile, /EXPOSE 3000/);
  assert.match(dockerfile, /COPY public \.\/public/);
});

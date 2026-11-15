import { test } from "node:test";
import assert from "node:assert/strict";
import { chordMatches } from "../src/commands.ts";
import { HELP_CHORD, helpCommand, matches } from "../src/help.ts";

test("help items match every word of the query", () => {
  const item = { id: "svd", title: "svd", kind: "function", summary: "singular value decomposition" };
  assert.ok(matches(item, ""));
  assert.ok(matches(item, "SVD value"));
  assert.ok(!matches(item, "svd eigen"));
});

test("F1 opens help in every app", () => {
  let opened = 0;
  const c = helpCommand(() => opened++);
  assert.equal(c.shortcut, "F1");
  assert.ok(chordMatches(HELP_CHORD, { key: "F1", ctrlKey: false, metaKey: false, altKey: false, shiftKey: false }));
  c.run();
  assert.equal(opened, 1);
});

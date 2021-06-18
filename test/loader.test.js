// @ts-check
/**
 * @jest-environment node
 */
import compiler from "./compiler.js";
import path from "path";
import getCodeFromBundle from "./getCodeFromBundle.js";

jest.setTimeout(60000);

test("Test 1", async () => {
  const stats = await compiler(
    path.resolve(__dirname, "src/sections/404/index.liquid")
  );

  console.log("compiler", compiler);

  // const output = stats.toJson({ source: true }).modules[0].source;
  // console.log("stats.toJson({ source: true })", stats.toJson({ source: true }));

  // const output = stats.toJson({ source: true }).modules[0];
  // const codeFromBundle = getCodeFromBundle(stats, compiler, "404.liquid");
  // console.log("codeFromBundle", codeFromBundle);

  // expect(output).toBe('export default "Hey Alice!\\n"');
});

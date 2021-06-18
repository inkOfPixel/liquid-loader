import path from "path";

export default (asset, compiler, stats) => {
  const usedFs = compiler.outputFileSystem;
  const outputPath = stats.compilation.outputOptions.path;

  console.log("usedFs", usedFs);

  console.log("asset", asset);

  let data = "";
  let targetFile = asset;

  const queryStringIdx = targetFile.indexOf("?");

  if (queryStringIdx >= 0) {
    targetFile = targetFile.substr(0, queryStringIdx);
  }

  try {
    data = usedFs.readFileSync(path.join(outputPath, targetFile)).toString();
  } catch (error) {
    data = error.toString();
  }

  return data;
};

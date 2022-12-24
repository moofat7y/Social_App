const { compress } = require("compress-images/promise");
const clearImage = require("./clearImage");
exports.compressImage = async (name) => {
  const filePath = "images/" + name;
  const compressedFilePath = "compressImages/";

  const commpression = 60;

  const result = await compress({
    source: filePath,
    destination: compressedFilePath,
    enginesSetup: {
      jpg: { engine: "mozjpeg", command: ["-quality", commpression] },
      png: {
        engine: "pngquant",
        command: ["--quality=" + commpression + "-" + commpression, "-o"],
      },
    },
  });
  clearImage(filePath);
  return result.statistics[0].path_out_new;
};

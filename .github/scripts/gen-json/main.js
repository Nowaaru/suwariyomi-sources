const path = require("path");
const fs = require("fs");

const mainDirectory = "../../../";
const srcDirectory = path.join(mainDirectory, "src");

const totalJSON = [];
fs.readdirSync(srcDirectory).forEach((folder) => {
  const jsonDirectory = path.join(srcDirectory, folder, "metadata.json");
  if (fs.existsSync(jsonDirectory)) {
    const metadata = require(jsonDirectory);
    totalJSON.push(metadata);
  }
});

fs.writeFileSync(
  path.join(mainDirectory, "dist"),
  JSON.stringify(totalJSON, null, 2)
);

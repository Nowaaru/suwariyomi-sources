const path = require("path");
const fs = require("fs");

const mainDirectory = path.resolve("./");
const srcDirectory = path.join(mainDirectory, "src");

const schemaLayout = {
  displayName: String,
  zip: String,
  version: String,
  nsfw: Boolean,
  icon: String,
};

const totalJSON = [];
fs.readdirSync(srcDirectory).forEach((folder) => {
  const jsonPath = path.join(srcDirectory, folder, "metadata.json");
  if (fs.existsSync(jsonDirectory)) {
    const metadata = require(jsonDirectory);
    Object.keys(schemaLayout).forEach((key) => {
      let isValueIncorrect = false;
      switch (schemaLayout[key]) {
        case String:
          if (typeof metadata[key] !== "string") {
            isValueIncorrect = true;
          }
          break;
        case Boolean:
          if (typeof metadata[key] !== "boolean") {
            isValueIncorrect = true;
          }
          break;
        case Number:
          if (typeof metadata[key] !== "number") {
            isValueIncorrect = true;
          }
          break;
        default:
          console.warn("WARNING! Metadata has an unknown key:", key);
          return delete metadata[key];
      }

      if (isValueIncorrect) {
        console.warn(
          "WARNING! Metadata has an invalid value for key:",
          key,
          "expected",
          schemaLayout[key],
          "got",
          typeof metadata[key]
        );

        return delete metadata[key];
      }
    });
    totalJSON.push(metadata);
  }
});

fs.writeFileSync(
  path.join(mainDirectory, "dist", "metadata.json"),
  JSON.stringify(totalJSON, null, 2)
);

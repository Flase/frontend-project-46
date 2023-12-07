import yaml from 'js-yaml';

const getParsedJsonObj = (string) => JSON.parse(string);

const getJSONString = (obj) => JSON.stringify(obj);

const getParsedYamlObj = (string) => yaml.load(string);

export { getParsedJsonObj, getJSONString, getParsedYamlObj };

const getObject = (fileContent, fileExtension) => {
  let obj;
  switch (fileExtension) {
    case '.json':
      obj = getParsedJsonObj(fileContent);
      break;
    case '.yaml':
    case '.yml':
      obj = getParsedYamlObj(fileContent);
      break;
    default:
      throw new Error(`Unsupported file format: ${fileExtension}`);
  }
  return obj;
};

export { getObject };

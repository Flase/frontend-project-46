import yaml from 'js-yaml';

const getParsedJsonObj = (string) => JSON.parse(string);

const getJSONString = (obj) => JSON.stringify(obj);

const getParsedYamlObj = (string) => yaml.load(string);

export { getParsedJsonObj, getJSONString, getParsedYamlObj };

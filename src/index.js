import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  // eslint-disable-next-line max-len
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)); //  вернет массив всех уникальных улючей из двух обьектов
  const sortedKeys = _.sortBy(keys); // отсортирует их по алфавиту

  const diffLines = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return `+ ${key}: ${obj2[key]}`;
    }

    if (!_.has(obj2, key)) {
      return `- ${key}: ${obj1[key]}`;
    }

    if (_.isEqual(obj1[key], obj2[key])) {
      return `  ${key}: ${obj1[key]}`;
    }

    return [
      `- ${key}: ${obj1[key]}`,
      `+ ${key}: ${obj2[key]}`,
    ];
  });

  const flattenedDiffLines = _.flatten(diffLines);
  return `{\n${flattenedDiffLines.join('\n')}\n}`;
};

export default genDiff;

import _ from 'lodash';

// const genDiff = (obj1, obj2) => {
//   // eslint-disable-next-line max-len
//   const keys = _.union(Object.keys(obj1), Object.keys(obj2)); //  вернет массив всех уникальных улючей из двух обьектов
//   const sortedKeys = _.sortBy(keys); // отсортирует их по алфавиту
//
//   const diffLines = sortedKeys.map((key) => {
//     if (!_.has(obj1, key)) {
//       return `+ ${key}: ${obj2[key]}`;
//     }
//
//     if (!_.has(obj2, key)) {
//       return `- ${key}: ${obj1[key]}`;
//     }
//
//     if (_.isEqual(obj1[key], obj2[key])) {
//       return `  ${key}: ${obj1[key]}`;
//     }
//
//     return [
//       `- ${key}: ${obj1[key]}`,
//       `+ ${key}: ${obj2[key]}`,
//     ];
//   });
//
//   const flattenedDiffLines = _.flatten(diffLines);
//   return `{\n${flattenedDiffLines.join('\n')}\n}`;
// };

const genDiff = (obj1, obj2, depth = 0) => {
  const spacesPerIndent = 4;
  const offset = '+ ';
  const indent = ' '.repeat(Math.max(depth * spacesPerIndent - offset.length, 0));

  const buildDiff = (value1, value2, currentDepth) => {
    const formatValue = (value) => {
      if (_.isObject(value)) {
        return buildDiff(value, value, currentDepth + 1);
      }
      return value;
    };

    const keys = _.union(_.keys(value1), _.keys(value2));
    const sortedKeys = _.sortBy(keys);

    const diffLines = sortedKeys.map((key) => {
      const nestedValue1 = value1[key];
      const nestedValue2 = value2[key];

      if (!_.has(value1, key)) {
        return `+ ${key}: ${formatValue(nestedValue2)}`;
      }

      if (!_.has(value2, key)) {
        return `- ${key}: ${formatValue(nestedValue1)}`;
      }

      if (_.isObject(nestedValue1) && _.isObject(nestedValue2)) {
        return `${indent}  ${key}: ${buildDiff(nestedValue1, nestedValue2, currentDepth + 1)}`;
      }

      if (_.isEqual(nestedValue1, nestedValue2)) {
        return `${indent}  ${key}: ${formatValue(nestedValue1)}`;
      }

      return [
        `${indent}- ${key}: ${formatValue(nestedValue1)}`,
        `${indent}+ ${key}: ${formatValue(nestedValue2)}`,
      ];
    });

    const flattenedDiffLines = _.flatten(diffLines);
    return `{\n${flattenedDiffLines.join('\n')}\n${' '.repeat(currentDepth * spacesPerIndent)}}`;
  };

  return buildDiff(obj1, obj2, depth);
};

export default genDiff;

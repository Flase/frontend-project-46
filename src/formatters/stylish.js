import _ from 'lodash';

const getStylishFormat = (obj1, obj2, depth = 0) => {
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

export default getStylishFormat;

import _ from 'lodash';

const getPlainFormat = (obj1, obj2) => {
  const buildDiff = (value1, value2, path = []) => {
    const formatValue = (value) => {
      if (_.isObject(value)) {
        return '[complex value]';
      }
      if (_.isBoolean(value) || _.isNull(value)) {
        return `${value}`;
      }
      return `'${value}'`;
    };

    const keys = _.union(_.keys(value1), _.keys(value2));
    const sortedKeys = _.sortBy(keys);

    const diffLines = sortedKeys.map((key) => {
      const nestedValue1 = value1[key];
      const nestedValue2 = value2[key];
      const newPath = path.concat(key);

      if (!_.has(value1, key)) {
        return `Property '${newPath.join('.')}' was added with value: ${formatValue(nestedValue2)}`;
      }

      if (!_.has(value2, key)) {
        return `Property '${newPath.join('.')}' was removed`;
      }

      if (_.isObject(nestedValue1) && _.isObject(nestedValue2)) {
        return buildDiff(nestedValue1, nestedValue2, newPath);
      }

      if (_.isEqual(nestedValue1, nestedValue2)) {
        return null; // Unchanged properties are not included in plain format
      }

      return `Property '${newPath.join('.')}' was updated. From ${formatValue(nestedValue1)} to ${formatValue(nestedValue2)}`;
    });

    return diffLines.filter(Boolean).join('\n');
  };

  return buildDiff(obj1, obj2);
};

export default getPlainFormat;
import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';

// eslint-disable-next-line consistent-return
const getFormatter = (formatName) => {
  switch (formatName) {
    case 'stylish':
      return getStylishFormat;
    case 'plain':
      return getPlainFormat;
    default:
      break;
  }
};

// eslint-disable-next-line import/prefer-default-export
export default getFormatter;

//   switch (formatName) {
//     case 'stylish':
//       console.log(getStylishFormat(obj1, obj2));
//       break;
//     case 'plain':
//       console.log(getPlainFormat(obj1, obj2));
//       break;
//     default:
//       break;
//   }
// };

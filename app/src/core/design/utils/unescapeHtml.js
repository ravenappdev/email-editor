const decoder = require('he');
const pretty = require('pretty');
export const unescapeHTML = (htmlBody) => {
  if (htmlBody == null) {
    return null;
  }

  return pretty(decoder.decode(htmlBody));
};

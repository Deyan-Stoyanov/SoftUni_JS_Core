function parseSurvey(str) {
  let surveyTextRegex = /<svg><cat><text>([a-zA-Z!?.\s]+)\s+(\[[a-zA-Z\s-]+\])\s*<\/text>\s*<\/cat>\s*<cat>(<g><val>[0-9]+<\/val>[0-9]+<\/g>)+\s*<\/cat>\s*<\/svg>/gim;
  let singleValueRegex = /<g><val>([0-9]+)<\/val>([0-9]+)<\/g>/g;
  if (str.indexOf("<svg>") === -1) {
    return "No survey found";
  } else if (str.match(surveyTextRegex) === null) {
    return "Invalid format";
  }
  let matches = surveyTextRegex.exec(str);
  let result = `${matches[2].substring(1, matches[2].length - 1)}: `;
  let innerMatches = str.match(singleValueRegex);
  let sum = 0;
  let count = 0;
  for (let m of innerMatches) {
    let innerMatch = singleValueRegex.exec(m);
    let tempSum = +m.substring(
      m.indexOf("<val>") + "<val>".length,
      m.indexOf("</val>")
    );
    let tempCount = +m.substring(
      m.indexOf("</val>") + "</val>".length,
      m.indexOf("</g>")
    );
    sum += tempSum * tempCount;
    count += tempCount;
  }
  let total = sum / count;
  result += Math.round(total * 100) / 100;
  return result;
}

console.log(
  parseSurvey(
    "<p>Some random text</p><svg><cat><text>How do you rate our food? [Food - General]</text></cat><cat><g><val>1</val>0</g><g><val>2</val>1</g><g><val>3</val>3</g><g><val>4</val>10</g><g><val>5</val>7</g></cat></svg><p>Some more random text</p>"
  )
);

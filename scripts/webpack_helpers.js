/**
 * Capitalizes a word.
 * @param {string} word - The word to capitalize.
 * @return {string} A copy of the word in which the first letter is capitalized.
 */
function capitalize(word) {
  const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
  return capitalized;
}

/**
 * Returns a copy of a given array in which each element is capitalized.
 * @param {Array<string>} array - The array of strings to capitalize.
 * @return {Array<string>} An array of capitalized strings.
 */
function capitalizeArray(array) {
  const capitalized = [...array];
  capitalized.forEach((word, index) => {
    capitalized[index] = capitalize(word);
  });
  return capitalized;
}

/**
 * Converts a given string to Pascal Case.
 * @param {string} string - The string to convert.
 * @return {string} A copy of the string in Pascal Case.
 */
function toPascal(string) {
  const forbiddenSeparators = [' ', '_', '-'];
  let inPascal = string;
  forbiddenSeparators.forEach((separator) => {
    const split = inPascal.split(separator);
    const capitalized = capitalizeArray(split);
    inPascal = capitalized.join('');
  });
  console.log(inPascal);
  return inPascal;
}

/**
 * Logs information about the build settings to the console.
 * @param { Record<string, unknown> } argv - The arguments that were passed into
 * the build command.
 * @param { string } outputPath - The value of the config's output.path.
 */
function logBuildSettings(argv, outputPath) {
  console.log('Starting build with the following options:');
  console.log(argv);
  console.log('');
  console.log('Output directory will be:');
  console.log(outputPath);
  console.log('See below for a list of built assets.');
  console.log('');
}

module.exports = {
  toPascal,
  logBuildSettings,
};


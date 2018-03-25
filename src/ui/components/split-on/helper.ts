export default function splitOn([str = '', splitCharacter = '']) {
  return str.length > 0 ? str.split(splitCharacter) : [];
}

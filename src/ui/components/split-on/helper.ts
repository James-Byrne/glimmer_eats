export default function splitOn([list = [], splitCharacter = ""]) {
  return list.length > 0 ? list.split(splitCharacter) : [];
}

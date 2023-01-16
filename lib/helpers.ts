export const insertLineBreaks = (SQL: string) => {
  const cleanString = SQL.split('\n').join(' ') //if GPT-3 already included line breaks, we want to take them out so we can insert our own

  const stringArr = cleanString.split(" ") // we need to target words like SELECT, FROM, etc, which will be split by spaces always
  const match = new Set(['FROM', 'WHERE', 'ORDER', 'GROUP', 'AND', 'LIMIT'])
  const linebreak = '\n'
  const newArr = stringArr.map(thing => {
    // console.log(thing)
    // if(match.has(thing.toUpperCase())) console.log("TRUE")
    if(match.has(thing.toUpperCase())) return linebreak.concat(thing)
    return thing
})

  return newArr.join(' ')
}
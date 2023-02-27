export const insertLineBreaks = (SQL: string) => {
  const cleanString = SQL.split('\n').join(' ') //if GPT-3 already included line breaks, we want to take them out so we can insert our own

  const stringArr = cleanString.split(" ") // we need to target words like SELECT, FROM, etc, which will be split by spaces always
  const match = new Set(['SELECT', 'FROM', 'WHERE', 'ORDER', 'GROUP', 'AND', 'LIMIT'])
  const linebreak = '\n'
  const newArr = stringArr.map(thing => {
    // console.log(thing)
    // if(match.has(thing.toUpperCase())) console.log("TRUE")
    if(match.has(thing.toUpperCase())) return linebreak.concat(thing)
    return thing
})

  return newArr.join(' ')
}

export const cleanSqlForDatabase = (SQL: string):string => {
  return SQL.replaceAll(`'`, `\\'`).replaceAll(`\n`, ' ')
}
// in the future can have a publication interface and just see if a results fits it. That's basically what this is.
export const canShowPublications = (results: any[] | null):boolean => {
  console.log(`can show publications called with results:`, results)
  if(results === null || results.length < 1) return false
  if(results?.length < 1 || results === null) return false
  // const keys = Object.keys(results[0])
  // console.log(Boolean(keys.includes("user_name") && keys.includes("contentURI")))
  return Boolean(results[0].user_name && results[0].content_URI && results[0].content && results[0].comment_count && results[0].mirror_count)
}
// export const canShowUsers = (results: any[]):boolean => {
//   if(results[0])
//   return true
// }
fetch

export async function dFetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response> {
  let dInput = input
  if(typeof(input) == 'string' && input.startsWith('ipfs://')) dInput = `https://ipfs.io/ipfs/${input.substring(7)}`
  return await fetch(dInput, init)
}
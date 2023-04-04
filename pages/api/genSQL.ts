// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai'



// type Data = {
//   name: string
// }

const configuration = new Configuration({
  apiKey: process.env.NEXT_SERVER_OPENAI,
});
const openai = new OpenAIApi(configuration);



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  


  const prompt = JSON.parse(req.body).prompt;
  console.log(`api/genSQL called with prompt: ${prompt}`)

try{
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    // prompt: `### MySQL SQL tables, with their properties:\n#\n# Follows(follower_id, follower_address, follower_name, followee_id, followee_address, followee_name, timestamp)\n# Users(user_id, metadata, user_name, address, imageURI, timestamp)\n# Publications(user_id, address, user_name, in_reply_to_user_id, in_reply_to_post_id, in_reply_to_address, in_reply_to_user_name, post_id, content_URI, type, timestamp, comment_count, mirror_count, content, image, imageMimeType)\n#\n## Publications.type is either 'Post', 'Comment', or 'Mirror'\n## Include all non-aggregate columns in the GROUP BY clause.\n## Timestamp is in seconds past the epoch.\n## If I ask you to show me the most \"popular\" thing, or the \"top\" thing, I'm asking you to to do so by number of comments and mirrors.\n## \"Top xyz posts\" means \"most popular posts about xyz\"\n##\n### Create an SQL query using the following prompt: ${prompt}\nSELECT`,
    prompt: `### Postgres SQL tables, with their properties for a social media app called lens:\n#\n# follows(follower_id, follower_address, follower_name, followee_id, followee_address, followee_name, timestamp)\n# users(user_id, metadata, user_name, address, imageURI, timestamp)\n# publications(user_id, address, user_name, in_reply_to_user_id, in_reply_to_post_id, in_reply_to_address, in_reply_to_user_name, post_id, content_URI, type, timestamp, comment_count, mirror_count, content, image, imageMimeType)\n#\n## Publications.type is either 'Post', 'Comment', or 'Mirror'\n## Include all non-aggregate columns in the GROUP BY clause.\n## Timestamp is in seconds past\n## If I ask you to show me the most \"popular\" thing, or the \"top\" thing, I'm asking you to to do so by number of comments and mirrors.\n##\n##\n### Using valid Postgres SQL, answer the following questions for the tables provided above.\n\n## stani’s posts, mirrors, comments over past month by day\nSELECT  DATE(timestamp) AS day, COUNT(CASE WHEN type = 'Post' THEN 1 END) AS posts, COUNT(CASE WHEN type = 'Mirror' THEN 1 END) AS mirrors, COUNT(CASE WHEN type = 'Comment' THEN 1 END) AS comments\nFROM publications\nWHERE user_name = 'stani'\nAND timestamp > (NOW() - INTERVAL '1 month')\nGROUP BY day\nORDER BY day DESC\nLIMIT 20\n\n## ${prompt}\nSELECT`,
    temperature: 0,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["#", ";"],
  });
  if(response.status !== 200 || !response.data.choices[0].text) throw new Error(`${response.status} ERROR, see console`)
  const responseText = response.data.choices[0].text
  // const final = replaceWords(responseText)
  res.status(200).json({data: responseText})
} catch (error) {
  console.log(error)
  res.status(500).json(error)
}


}
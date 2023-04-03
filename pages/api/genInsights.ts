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
  


  const biprompt = JSON.parse(req.body).biPromptText;
  const results = JSON.parse(req.body).results
  console.log(`api/genInsights called with prompt: ${biprompt}`)

try{
  const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: `Here is some data in JSON string format: ${JSON.stringify(results)} \n Generate some business intelligent insights based on the following prompt: ${biprompt}`,
    temperature: 0.5,
    max_tokens: 8000,
    top_p: 0.5,
    frequency_penalty: 0,
    presence_penalty: 0
  });
  if(response.status !== 200 || !response.data.choices[0].text) throw new Error(`${response.status} ERROR, see console`)
  const responseText = response.data.choices[0].text
  // const final = replaceWords(responseText)
  console.log(responseText)
  res.status(200).json({data: responseText})
} catch (error) {
  console.log(error)
  res.status(500).json(error)
}


}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIApi, Configuration } from 'openai'

console.log('testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest')


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



try{
  console.log('try')
  const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: `### MySQL SQL tables, with their properties:\n#\n# Employee(id, name, department_id)\n# Department(id, name, address)\n# Salary_Payments(id, employee_id, amount, date)\n# lens_follow_view(profileId, address, handle, rootProfileId, rootAddress, rootHandle, timestamp)\n# lens_profile_view(profileId, metadata, handle, address, imageURI, timestamp)\n# lens_publication_comment_view(profileId, address, handle, pubId, contentURI, rootProfileId, rootAddress, rootHandle, type, timestamp)\n# lens_publication_mirror_view(profileId, address, handle, pubId, contentURI, type, timestamp)\n# lens_publication_post_view(profileId, address, handle, pubId, contentURI, type, timestamp)\n# lens_publication_view(profileId, address, handle, pubId, contentURI, type)\n#\n## When I say \"by someone\", I'm asking you to querying using the handle, or profile metadata. Every handle ends with '.lens'.\n## Include all non-aggregate columns in the GROUP BY clause.\n### ${prompt}\nSELECT`,
    temperature: 0,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["#", ";"],
  });
  if(response.status !== 200) throw new Error(`${response.status} ERROR, see next console`)
  res.status(200).json({data: response.data})
} catch (error) {
  console.log(error)
  res.status(500).json(error)
}


}
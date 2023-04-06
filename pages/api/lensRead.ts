// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql';
import {Client} from 'pg'




// type Data = {
//   name: string
// }

// will call lens with the query that has been passed through and 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const params = process.env.NEXT_SERVER_LENS_PG_FULL!.split('|') // host|port|user|database|password
  console.log(params)
  const client = new Client({
    host: params[0],
    port: params[1],
    user: params[2],
    database: params[3],
    password: params[4]
  })
  client.connect((err) => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  
  
  console.log(req.body)
  const query:string = JSON.parse(req.body).SQL;
  console.log('api/lensRead called with query: ', query)

  // have to return a promise because waiting on the api call https://stackoverflow.com/questions/60684227/api-resolved-without-sending-a-response-in-nextjs
  return new Promise<void>((resolve, reject) => {
    // call to SQL database
    client.query(query, function (error, results) {
      try{
      if (error) throw error;
      console.log(results)
      res.status(200).json({ results: results.rows })
      console.log('resolving now')
      resolve()
      console.log('resolved')
      } catch (error) {
        console.log(error, "line 48")
        res.status(500).json(error)
      resolve()
      }
    });

  })
  // res.status(200).json({ name: 'John Doe' })
}

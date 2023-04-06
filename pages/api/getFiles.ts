// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql';
import { cleanSqlForDatabase } from '../../lib/helpers';


// will call lens with the query that has been passed through and 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  const [host, user, password, database, port] = process.env.NEXT_SERVER_LENS_FULL ? process.env.NEXT_SERVER_LENS_FULL?.split('/') : [undefined, undefined, undefined, undefined, undefined]
  var connection = mysql.createConnection({
    host     : host,
    user     : user,
    password : password,
    database : database,
    port: Number(port)
  });
  connection.connect();
  console.log(req.body)
  
  const {address} = JSON.parse(req.body);

  const query = `SELECT * FROM openai_prompt_sql_pairs WHERE LOWER(address) = LOWER('${address}') ORDER BY timestamp DESC`
  

  // have to return a promise because waiting on the api call https://stackoverflow.com/questions/60684227/api-resolved-without-sending-a-response-in-nextjs
  return new Promise<void>((resolve, reject) => {
    // call to SQL database
    connection.query(query, function (error, results, fields) {
      try{
      if (error) throw error;
      console.log(results)
      res.status(200).json({ results })
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

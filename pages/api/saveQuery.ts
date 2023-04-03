// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql';
import { cleanSqlForDatabase } from '../../lib/helpers';


// will call lens with the query that has been passed through and 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  var connection = mysql.createConnection({
    host     : process.env.NEXT_SERVER_LENS_HOST,
    user     : process.env.NEXT_SERVER_LENS_USER,
    password : process.env.NEXT_SERVER_LENS_PASSWORD,
    database : 'lens',
    port: 4000,
  });
  connection.connect();
  console.log(req.body)
  
  const {promptText, SQL, address} = JSON.parse(req.body);
  // const sql = `SELECT  * FROM Publications WHERE timestamp > DATE_SUB(NOW(), INTERVAL 1 MONTH) AND type = \\'Post\\' ORDER BY comment_count DESC, mirror_count DESC LIMIT 20`
  const cleanedSql = cleanSqlForDatabase(SQL)

  const query = `INSERT INTO openai_prompt_sql_pairs(id, prompt, \`sql\`, address, timestamp) VALUES ((SELECT COUNT(*) FROM openai_prompt_sql_pairs) + 1, '${promptText}' , '${cleanedSql}', '${address || "NULL"}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}' );`

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

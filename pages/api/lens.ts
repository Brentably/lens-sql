// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql';


var connection = mysql.createConnection({
  host     : 'tidb.uunmqwe9i4u.clusters.tidb-cloud.com',
  user     : 'readonlylensview',
  password : process.env.NEXT_SERVER_LENS_KNN3,
  database : 'lens',
  port: 4000,
});
// type Data = {
//   name: string
// }

// will call lens with the query that has been passed through and 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  res.status(200).json({ name: 'John Doe' })
}

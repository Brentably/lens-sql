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

connection.connect();

// type Data = {
//   name: string
// }

// will call lens with the query that has been passed through and 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const query:string = JSON.parse(req.body).SQL;
  console.log('api/lens called with query: ', query)

  connection.query(query, function (error, results, fields) {
    try{
    if (error) throw error;
    console.log(results)
    res.status(200).json({ results })
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  });

  // res.status(200).json({ name: 'John Doe' })
}

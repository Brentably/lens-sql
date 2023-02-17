// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql';


// var connection = mysql.createConnection({
//   host     : 'tidb.uunmqwe9i4u.clusters.tidb-cloud.com',
//   user     : 'readonlylensview',
//   password : process.env.NEXT_SERVER_LENS_KNN3,
//   database : 'lens',
//   port: 4000,
// });
var connection = mysql.createConnection({
  host     : 'tidb.uunmqwe9i4u.clusters.tidb-cloud.com',
  user     : 'lens_bakreadwrite',
  password : process.env.NEXT_SERVER_LENS_BAK_KNN3,
  database : 'lens_bak',
  port: 4000,
});

connection.connect();

// type Data = {
//   name: string
// }

// will call lens with the query that has been passed through and 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(req.body)
  const query:string = JSON.parse(req.body).SQL;
  console.log('api/lens called with query: ', query)

  // have to return a promise because waiting on the api call https://stackoverflow.com/questions/60684227/api-resolved-without-sending-a-response-in-nextjs
  return new Promise<void>((resolve, reject) => {
    // call to SQL database
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Cache-Control', 'max-age=180000');
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

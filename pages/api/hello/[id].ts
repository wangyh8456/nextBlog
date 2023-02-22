import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import type {Info} from '../../../Types';

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // Run the middleware
    await runMiddleware(req, res, cors);
    const {query,method,body}=req;
    const {id} =query;

    switch (method){
        case 'GET':
            res.json({ content: `METHOD ${method}:id is ${id}` });
            break;
        case 'POST':
            res.json({content:`METHOD ${method}:id is ${id},body is ${body}`});
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    
}
import { NowRequest, NowResponse } from '@vercel/node'
import { Dota2 } from '../helpers/dota2'
import { RequestError } from '../helpers/error'

const dota2 = new Dota2()

export default async function (req: NowRequest, res: NowResponse): Promise<NowResponse> {
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const hero = req.query.hero
    if (!hero) throw new RequestError('hero required')

    const response = await dota2.findHeroResponse(hero as string)

    return res.send(response)
  } catch (err) {
    return res.status(500).send({
      error: err.message,
    })
  }
}

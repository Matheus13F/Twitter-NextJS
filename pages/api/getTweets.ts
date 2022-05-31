// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../sanity';
import { ITweet } from '../../typings';
import { groq } from 'next-sanity';

const feedQuery = groq`
    *[_type == 'tweet' && !blockTweet ] {
        _id,
        ...
    } | order(_createdAt desc)
`

type Data = {
  tweets: ITweet[],
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const tweets: ITweet[] = await sanityClient.fetch(feedQuery);
  res.status(200).json({ tweets })
}

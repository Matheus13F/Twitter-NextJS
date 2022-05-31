// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../sanity';
import { IComment } from '../../typings';

const commentQuery = groq`
    *[_type == 'comment' && references(*[_type == "tweet" && _id == $tweetId]._id) ] {
        _id,
        ...
    } | order(_createdAt desc)
`;

type Data = IComment[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { tweetId } = req.query;

    const comments: IComment[] = await sanityClient.fetch(commentQuery, {
        tweetId
    });

  res.status(200).json(comments);
}

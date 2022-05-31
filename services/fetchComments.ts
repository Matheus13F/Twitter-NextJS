import { IComment } from "../typings";

export const fetchComments = async (tweetId: string) => {
    const res = await fetch(`/api/getComments?tweetId=${tweetId}`);

    const comments: IComment[] = await res.json();

    return comments;
}
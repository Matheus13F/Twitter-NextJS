import { FormEvent, useEffect, useState } from "react";
import { fetchComments } from "../services/fetchComments";
import TimeAgo from 'react-timeago';

import { CommentBody, IComment, ITweet } from "../typings"
import { ChatAlt2Icon, HeartIcon, SwitchHorizontalIcon, UploadIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface IProps {
    tweet: ITweet;
}

export function Tweet({ tweet }: IProps) {
    const [comments, setComments] = useState<IComment[]>([]);
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');

    const refreshComments = async () => {
        const commentsData: IComment[] = await fetchComments(tweet._id);
        setComments(commentsData);
    };

    const {data: session} = useSession();

    useEffect(() => {
        refreshComments();
    }, []);

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();

        const commentToast = toast.loading('Posting Comment...');

        const comment: CommentBody = {
            comment: input,
            tweetId: tweet._id,
            username: session?.user?.name || 'Unknown user',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll'
        };

        const result = await fetch(`/api/addComment`, {
            body: JSON.stringify(comment),
            method: 'POST'
        });

        toast.success('Comment posted!', {
            id: commentToast
        });

        setInput('');
        setCommentBoxVisible(false);
        refreshComments();
    }

    return (
        <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
            <div className="flex space-x-3">
                <img className="h-10 w-10 rounded-full object-cover" src={tweet.profileImg} alt="Profile user" />
                <div>
                    <div className="flex items-center space-x-1">
                        <p className="mr-1 font-bold">{tweet.username}</p>
                        <p className="hidden text-sm text-gray-500 sm:inline">@{tweet.username} •</p>

                        <TimeAgo
                            date={tweet._createdAt} 
                            className="text-sm text-gray-500"
                        />
                    </div>

                    <p className="pt-1">{tweet.text}</p>
                    {tweet.image && <img className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm" src={tweet.image} alt="tweet image"/>}
                </div>
            </div>

            <div className="flex justify-between mt-5">
                <div  
                    className="flex cursor-pointer items-center space-x-3 text-gray-400"
                    onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
                >
                    <ChatAlt2Icon className="h-5 w-5"/>
                    <p>{comments.length}</p>
                </div>

                <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                    <SwitchHorizontalIcon className="h-5 w-5"/>
                </div>

                <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                    <HeartIcon className="h-5 w-5"/>
                </div>

                <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
                    <UploadIcon className="h-5 w-5"/>
                </div>
            </div>

            {/* Comment Box Logic */}

            {commentBoxVisible && (
                <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
                    <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 rounded-lg bg-gray-100 p-2 outline-none" placeholder="whire a comment..."/>
                    <button type="submit" disabled={!input} className="text-twitter disabled:text-gray-200">post</button>
                </form>
            )}

            {comments?.length > 0 && (
                <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
                    {comments.map(comment => (
                        <div key={comment._id} className=" relative flex space-x-2">
                            <hr className="absolute left-5 top-10 h-8 border-x border-gray-300"/>
                            <img className="mt-2 h-7 w-7 object-cover rounded-full" src={comment.profileImg} alt="user comment image"/>
                           <div>
                                <div className="flex items-center space-x-1">
                                    <p className="mr-1 font-bold">{comment.username}</p>
                                    <p className="hidden text-sm text-gray-500 lg:inline">@{comment.username} • </p>
                                    <TimeAgo
                                        date={comment._createdAt}
                                        className="text-sm text-gray-500"
                                    />
                                </div>
                                <p>{comment.comment}</p> 
                           </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
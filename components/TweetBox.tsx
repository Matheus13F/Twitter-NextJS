import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import {
    CalendarIcon,
    EmojiHappyIcon,
    LocationMarkerIcon,
    PhotographIcon,
    SearchCircleIcon
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { ITweet, TweetBody } from '../typings';
import { fetchTweets } from '../services/fetchTweets';
import toast from 'react-hot-toast';

interface IProps {
    setTweets: Dispatch<SetStateAction<ITweet[]>>
}

export function TweetBox({ setTweets }: IProps) {
    const [input, setInput] = useState<string>('');
    const [image, setImage] = useState<string>('');

    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false);
    
    const imageInputRef = useRef<HTMLInputElement>(null);

    const { data: session } = useSession();

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();

        if(!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value);
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpen(false);
    }

    const postTweet = async () => {
        const postingToast = toast.loading('Posting tweet...');

        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'Unknow User',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image
        }

        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST'
        });

        const json = await result.json();

        const newTweets = await fetchTweets();

        setTweets(newTweets);

        toast.success('Tweet posted!', {
            id:postingToast,
        });

        return json
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if(!session) {
            toast.error('you must be logged in to tweet!');
            return;
        }

        postTweet();
        setInput('');
        setImage('');
        setImageUrlBoxIsOpen(false);

    }

    return (
        <div className='flex space-x-2 p-5'>
            <img className="h-14 w-14 object-cover rounded-full mt-4" src={session?.user?.image || "https://links.papareact.com/gll"} alt="profile pic"/>

            <div className='flex flex-1 pl-2 items-center'>
                <form className='flex flex-1 flex-col'>
                    <input value={input} required onChange={e => setInput(e.target.value)} className='h-24 w-full text-xl outline-none placeholder:text-xl' type="text" placeholder="What's Happening?"/>
                    <div className='flex items-center'>
                        <div className='flex flex-1 space-x-2 text-twitter'>
                            <PhotographIcon onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'/>
                            <SearchCircleIcon className='h-5 w-5'/>
                            <EmojiHappyIcon className='h-5 w-5'/>
                            <CalendarIcon className='h-5 w-5'/>
                            <LocationMarkerIcon className='h-5 w-5'/>
                        </div>
                        <button 
                            onClick={handleSubmit}
                            disabled={!input || !session}
                            className='bg-twitter px-5 py-2 font-bold text-white rounded-full disabled:opacity-40'
                        >
                            Tweet
                        </button>
                    </div>

                    {imageUrlBoxIsOpen && (
                        <form className='mt-5 flex rounded-lg bg-twitter/80 py-2 px-4'>
                            <input
                                className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white'
                                type="text"
                                placeholder='Enter Image URL'
                                ref={imageInputRef}
                            />
                            <button type='submit' onClick={addImageToTweet} className='font-bold text-white'>Add Image</button>
                        </form>
                    )}

                    {image && (
                        <img className='mt-10 h-40 w-full rounded-xl object-cover' src={image} alt="post image" />
                    )}
                </form>
            </div>
        </div>
    )
}
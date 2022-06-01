import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

import {
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon,
} from '@heroicons/react/outline';

import { AiOutlineLinkedin, AiOutlineGithub } from 'react-icons/ai';

import { SidebarRow } from './SidebarRow';

export function Sidebar() {
    const { data: session } = useSession();

    const handleReload = () => {
        window.location.reload()
    }

    return (
        <div className='col-span-2 flex flex-col items-center px-4 md:items-start justify-between max-h-screen'>
           <div>
                <img className='m-3 h-10 w-10' src="https://links.papareact.com/drq" alt="logo twitter" />
                <SidebarRow Icon={HomeIcon} title="Home" onClick={handleReload}/>
                <SidebarRow Icon={HashtagIcon} title="Explore" />
                <SidebarRow Icon={BellIcon} title="Notifications" />
                <SidebarRow Icon={MailIcon} title="Messages" />
                <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
                <SidebarRow Icon={CollectionIcon} title="List" />
                <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign out' : 'Sign in'} />
                <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
           </div>
           <div>
                <a href='https://www.linkedin.com/in/matheus13f/' target="_blank">
                    <SidebarRow Icon={AiOutlineLinkedin} title="LinkedIn" />
                </a>
                <a href='https://www.github.com/matheus13f/' target="_blank">
                    <SidebarRow Icon={AiOutlineGithub} title="Github" />
                </a>
           </div>
        </div>
    )
}
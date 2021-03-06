import React, { SVGProps } from 'react';

interface IProps {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
    title: string;
    onClick?: () => void;
}

export function SidebarRow({Icon, title, onClick}: IProps) {
    return (
        <div onClick={() => onClick?.()} className='flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full 
        hover:bg-gray-100 transition-all duration-200 group cursor-pointer'>
            <Icon className='h-6 w-6'/>
            <p className='hidden group-hover:text-twitter
                md:inline-flex text-base font-light lg:text-xl
            '>
                {title}
            </p>
        </div>
    )
}
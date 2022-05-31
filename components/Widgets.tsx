import { SearchIcon } from "@heroicons/react/outline";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

export function Widgets() {
  return (
    <div className="col-span-2 px-2 mt-2 hidden lg:inline">
      {/* Search box */}
      <div className="mt-2 flex items-center space-x-2 bg-gray-100 p-3
      rounded-full">
        <SearchIcon className="h-5 w-5 text-gray-400"/>
        <input type="text" placeholder="Search twitter 2.0" className="flex-1 outline-none bg-transparent"/>
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="nextjs"
        options={{height: 1000}}
      />

    </div>
  )
}
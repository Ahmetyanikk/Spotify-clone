import { HomeIcon,MagnifyingGlassIcon,BuildingLibraryIcon } from '@heroicons/react/24/solid'

function Sidebar() {
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
        <div>
            <button className='flex items-center space-x-2 hover:text-white'>
            <HomeIcon className="h-5 w-5"/>
            <p>Home</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
            <MagnifyingGlassIcon className='h-5 w-5'/>
            <p>Search</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
            <BuildingLibraryIcon className='h-5 w-5'/>
            <p>Your Library</p>
            </button>
            <hr className='border-t-[0.1px]'/>
        </div>
    </div>
  )
}

export default Sidebar;
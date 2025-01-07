import React from 'react';

// SVG icons for search, filter, message, and profile
const SearchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
  </svg>
);

const FilterIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
    <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/>
  </svg>
);

const MessageIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#000000">
    <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
  </svg>
);

const ProfileIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/>
  </svg>
);

function UserManagement() {
  return (
    <div className="user-management pr-6 pl-6">
      {/* Upper Section */}
      <div className="upper flex justify-between items-center bg-gray-100">
        {/* Search Bar */}
        <div className="search-bar relative flex items-center w-11/12">
          {/* Input Field */}
          <input 
            type="text" 
            placeholder="Search..." 
            className="p-4 w-full border border-gray-300 rounded-2xl pr-32 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
          
          {/* Buttons inside the search bar */}
          <div className="absolute right-2 flex items-center space-x-2">
            <button className="p-3 rounded-md hover:shadow-lg">
              {SearchIcon}
            </button>
            <button className="p-3 rounded-md hover:shadow-lg">
              {FilterIcon}
            </button>
          </div>
        </div>

        {/* Profile and Notifications Section */}
        <div className="flex items-center">
          <button className="p-3 text-gray-700 hover:text-black transition text-2xl">
            {MessageIcon}
          </button>
          <div className="profile-circle border bg-white border-black rounded-full w-12 h-12 flex items-center justify-center text-2xl">
          </div>
        </div>
      </div>


{/* Mid Section */}
<div className="mid flex justify-between pt-5 pb-4 gap-x-4">
  <div className="box w-1/2 bg-white p-4 border rounded-2xl shadow-md flex flex-col">
    {/* Box Header */}
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Educators</h2>
      <div className="flex flex-col">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
          <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/>
        </svg>
      </div>
    </div>
    <div className='flex felx-col justify-between items-start'>
    <h1 className="text-7xl pt-4 pb-4">49</h1>
    <button className="mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
          </svg>
        </button>
        </div>
    {/* Progress Bar */}
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
        <div style={{ width: '80%' }} className="rounded-lg shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
      </div>
    </div>
  </div>

  {/* Repeat for Admins */}
  <div className="box w-1/2 bg-white p-4 border rounded-2xl shadow-md flex flex-col">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Admins</h2>
      <div className="flex flex-col">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
          <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/>
        </svg>
      </div>
    </div>
    <div className='flex felx-col justify-between items-start'>
    <h1 className="text-7xl pt-4 pb-4">03</h1>
    <button className="mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
          </svg>
        </button>
        </div>
    <div className="relative pt-1">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-300">
        <div style={{ width: '20%' }} className="rounded-lg shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
      </div>
    </div>
  </div>
</div>



      {/* Bottom Section */}
      <div className="bottom p-4">
        {/* Bottom Up - Table */}
        <div className="bottom-up mb-4">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">Admin</td>
                <td className="px-4 py-2">Edit | Delete</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Jane Smith</td>
                <td className="px-4 py-2">User</td>
                <td className="px-4 py-2">Edit | Delete</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Down - Pagination */}
        <div className="bottom-down flex justify-center">
          <button className="px-4 py-2">...</button>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
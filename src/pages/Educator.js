import React, { useState, Suspense, lazy } from 'react';

import cvsuImage from '../assets/cvsu.png';

// Dynamically import components from the Admin folder
const MyCourse = lazy(() => import('../components/Educator/MyCourse'));
const AssessmentManager = lazy(() => import('../components/Educator/AssessmentManager'));
const TopicBank = lazy(() => import('../components/Educator/TopicBank'));
const EducatorProfile = lazy(() => import('../components/Educator/EducatorProfile'));

// SVG icons as inline code
const CourseIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
    <path d="M400-400h160v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80Zm-80 400q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/>
  </svg>
);
const AssessmentIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
    <path d="m499-287 335-335-52-52-335 335 52 52Zm-261 87q-100-5-149-42T40-349q0-65 53.5-105.5T242-503q39-3 58.5-12.5T320-542q0-26-29.5-39T193-600l7-80q103 8 151.5 41.5T400-542q0 53-38.5 83T248-423q-64 5-96 23.5T120-349q0 35 28 50.5t94 18.5l-4 80Zm280 7L353-358l382-382q20-20 47.5-20t47.5 20l70 70q20 20 20 47.5T900-575L518-193Zm-159 33q-17 4-30-9t-9-30l33-159 165 165-159 33Z"/>
  </svg>
);
const DataIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
    <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/>
  </svg>
);
const ProfileIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
    <path d="M680-360q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM480-160v-56q0-24 12.5-44.5T528-290q36-15 74.5-22.5T680-320q39 0 77.5 7.5T832-290q23 9 35.5 29.5T880-216v56H480Zm-80-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm0-160ZM80-160v-112q0-34 17-62.5t47-43.5q60-30 124.5-46T400-440q35 0 70 6t70 14l-34 34-34 34q-18-5-36-6.5t-36-1.5q-58 0-113.5 14T180-306q-10 5-15 14t-5 20v32h240v80H80Zm320-80Zm0-320q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Z"/>
  </svg>
);
const LogOutIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
  </svg>
);
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

function Educator() {
  const [activeSection, setActiveSection] = useState("My Course");

  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  const handleLogOut = () => {
    // Logic for logging out
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-green-700 text-white flex flex-col p-10">
        
        {/* Curriculum Text with Image */}
        <div className="flex items-center mb-20">
          <img src={cvsuImage} alt="CVSU Logo" className="w-16 h-18 mr-3" />
          <h1 className="text-3xl font-bold">Curriculum</h1>
        </div>

        <div className="flex flex-col gap-4 mb-10">
          <button
            onClick={() => handleSidebarClick("My Course")}
            className={`text-lg flex items-center gap-2 p-2 rounded-md ${activeSection === "My Course" ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            {CourseIcon}
            My Course
          </button>
          <button
            onClick={() => handleSidebarClick("Assessment Manager")}
            className={`text-lg flex items-center gap-2 p-2 rounded-md ${activeSection === "Assessment Manager" ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            {AssessmentIcon}
            Assessment Manager
          </button>
          <button
            onClick={() => handleSidebarClick("Topic Bank")}
            className={`text-lg flex items-center gap-2 p-2 rounded-md ${activeSection === "Topic Bank" ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            {DataIcon}
            Topic Bank
          </button>
        </div>

        <hr className="border-t-2 border-gray-300 mb-6" />

        <button
          onClick={() => handleSidebarClick("Profile")}
          className={`text-lg flex items-center gap-2 p-2 rounded-md ${activeSection === "Profile" ? 'bg-green-600' : 'hover:bg-green-600'}`}
        >
          {ProfileIcon}
          Profile
        </button>
        <button
          onClick={handleLogOut}
          className={`text-lg flex items-center gap-2 p-2 rounded-md mt-4 ${activeSection === "Log Out" ? 'bg-green-600' : 'hover:bg-green-600'}`}
        >
          {LogOutIcon}
          Log Out
        </button>
      </div>

      {/* Right Content Area */}
      <div className="w-3/4 p-8 flex flex-col">
        {/* Upper Section */}
        <div className="upper flex justify-between items-center bg-gray-100 p-4">
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
              {/* Profile Icon */}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content p-4 flex-1">
          <Suspense fallback={<div className="text-center text-xl">Loading...</div>}>
            {activeSection === "My Course" && <MyCourse />}
            {activeSection === "Assessment Manager" && <AssessmentManager />}
            {activeSection === "Topic Bank" && <TopicBank />}
            {activeSection === "Profile" && <EducatorProfile />}
            {activeSection === "Log Out" && <p>Logging out...</p>}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Educator;
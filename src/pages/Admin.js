import React, { useState, Suspense, lazy } from 'react';

import cvsuImage from '../assets/cvsu.png';

function Admin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewAssessment, setViewAssessment] = useState(false);

  const checkAdminAccess = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('role');
    
    if (!isLoggedIn || role !== 'admin') {
      // If the user is not logged in or not an admin, redirect to login
      window.location.href = '/';  // Or you can redirect to any other page
    }
  };
  
  checkAdminAccess();  // Call this when the admin page loads

  const handleSidebarClick = (section) => {
    setActiveSection(section);
    if (section !== "Assessment Review") {
      setViewAssessment(false);
    }
  };

  const handleViewAssessment = () => {
    setActiveSection("Assessment Details");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const UserManagement = lazy(() => import('../components/Admin/UserManagement'));
  const CourseManagement = lazy(() => import('../components/Admin/CourseManagement'));
  const AssessmentReview = lazy(() => import('../components/Admin/AssessmentReview'));
  const AssessmentDetails = lazy(() => import('../components/Admin/AssessmentDetails'));
  const DataRepository = lazy(() => import('../components/Admin/DataRepository'));
  const AdminProfile = lazy(() => import('../components/Admin/AdminProfile'));
  const AdminMessage = lazy(() => import('../components/Admin/AdminMessage'));

  const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
      <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z"/>
    </svg>
  );
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

  const [activeSection, setActiveSection] = useState("User Management");

  const handleLogOut = () => {
    console.log("Logging out...");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {}
      <div className="w-1/4 bg-green-700 text-white flex flex-col p-10">

        <div className="flex items-center mb-20">
          <img src={cvsuImage} alt="CVSU Logo" className="w-16 h-18 mr-3" />
          <h1 className="text-3xl font-bold"> CurricuLink <span className="block text-lg">Admin</span></h1>
        </div>

        <div className="flex flex-col gap-4 mb-10">
          <button
            onClick={() => handleSidebarClick("User Management")}
            className={`text-lg flex items-center gap-2 p-2 rounded-md ${activeSection === "User Management" ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            {UserIcon}
            User Management
          </button>
          <button
            onClick={() => handleSidebarClick("Course Management")}
            className={`text-lg flex items-center gap-2 p-2 rounded-md ${activeSection === "Course Management" ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            {CourseIcon}
            Course Management
          </button>
          <button
            onClick={() => handleSidebarClick("Assessment Review")}
            className={`text-lg flex items-center gap-2 p-2 rounded-md ${activeSection === "Assessment Review" ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            {AssessmentIcon}
            Assessment Review
          </button>
          <button
            onClick={() => handleSidebarClick("Data Repository")}
            className={`text-lg flex items-center gap-2 p-2 rounded-md ${activeSection === "Data Repository" ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            {DataIcon}
            Data Repository
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

      {}
      <div className="w-3/4 p-8 flex flex-col">

        <div className="upper flex justify-between items-center bg-gray-100 pl-4 pr-4 pb-4">
          <div className="search-bar relative flex items-center w-11/12">
            <input 
              type="text" 
              placeholder="Search..." 
              className="p-4 w-full border border-gray-300 rounded-2xl pr-32 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <div className="absolute right-2 flex items-center space-x-2">
              <button className="p-3 rounded-md hover:shadow-lg">
                {SearchIcon}
              </button>
              <button className="p-3 rounded-md hover:shadow-lg">
                {FilterIcon}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <button onClick={() => handleSidebarClick("Admin Message")} className="p-3 text-gray-700 hover:text-black transition text-2xl">
              {MessageIcon}
            </button>
            <div onClick={() => handleSidebarClick("Profile")} className="profile-circle border bg-white border-black rounded-full w-12 h-12 flex items-center justify-center text-2xl">
            </div>
          </div>
        </div>

        {}
        <div className="content p-4 flex-1">
          <Suspense fallback={<div className="text-center text-xl">Loading...</div>}>
            {activeSection === "User Management" && <UserManagement />}
            {activeSection === "Course Management" && <CourseManagement />}
            {activeSection === "Assessment Review" && <AssessmentReview handleViewAssessment={handleViewAssessment} />}
            {activeSection === "Assessment Details" && <AssessmentDetails handleBackToReview={() => handleSidebarClick("Assessment Review")} />}  
            {activeSection === "Data Repository" && <DataRepository />}
            {activeSection === "Profile" && <AdminProfile />}
            {activeSection === "Admin Message" && <AdminMessage />}
            {activeSection === "Log Out" && <p>Logging out...</p>}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Admin;

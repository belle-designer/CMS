import React, { useState } from 'react';

function EducatorProfile() {
  const [selectedSection, setSelectedSection] = useState(''); // Tracks the selected section
  const [isEditing, setIsEditing] = useState(false); // Tracks whether the user is editing
  const [editValue, setEditValue] = useState(''); // Holds the value to be edited
  const [showModal, setShowModal] = useState(false); // Controls the modal visibility
  const [profileImage, setProfileImage] = useState(null); // Stores the selected profile image

  const handleSectionClick = (section) => {
    setSelectedSection(section); // Set the selected section
    setEditValue(getSectionData(section)); // Pre-fill the editor with current data
  };

  const getSectionData = (section) => {
    if (section === 'Contacts') {
      return `Phone: ${sectionData.Contacts.Phone}\nEmail: ${sectionData.Contacts.Email}`;
    } else if (section === 'Basic Information') {
      return `Fullname: ${sectionData['Basic Information'].Fullname}\nAge: ${sectionData['Basic Information'].Age}\nBirthday: ${sectionData['Basic Information'].Birthday}\nAddress: ${sectionData['Basic Information'].Address}\nGender: ${sectionData['Basic Information'].Gender}\nStatus: ${sectionData['Basic Information'].Status}\nNationality: ${sectionData['Basic Information'].Nationality}`;
    }
    return sectionData[section]; // Return regular section data for other sections
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Set the profile image to display
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle editing mode
  };

  const handleSave = () => {
    setShowModal(true); // Show confirmation modal
  };

  const handleConfirmSave = () => {
    sectionData[selectedSection] = editValue; // Save the edited value
    setIsEditing(false); // Exit editing mode
    setShowModal(false); // Close the modal
  };

  const handleCancelSave = () => {
    setShowModal(false); // Close the modal without saving
  };

  // Updated sample data for each section
  const sectionData = {
    Work: 'Software Engineer at ABC Corp',
    Education: 'B.S. in Computer Science from XYZ University',
    'Place Lived': 'New York, NY',
    Contacts: {
      Phone: '(123) 456-7890',
      Email: 'example@email.com',
    },
    'Basic Information': {
      Fullname: 'John Doe',
      Age: '30',
      Birthday: 'January 1, 1995',
      Address: '123 Main St, New York, NY',
      Gender: 'Male',
      Status: 'Single',
      Nationality: 'American',
    },
  };

  return (
    <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-lg relative min-h-[650px]">
      <h2 className="text-2xl font-bold mb-6 text-center">Educator Profile</h2>

      {/* Profile Image Section */}
      <div className="flex justify-center mb-6">
        <div className="relative w-64 h-64">
          <div className="w-64 h-64 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center">
            {/* Display profile image if available, otherwise show placeholder */}
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Handle image change
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>


{/* Profile Name and Email */}
<div className="text-center">
  <h1 className="text-3xl font-bold">Mikaela Arciaga</h1>
  <p className="text-gray-600">@mikaelaarciga@gmail.com</p>
</div>

{/* About Section */}
<div className="text-center mt-4">
  <h2 className="text-lg font-semibold">About</h2>
  <p className="text-2xl font-bold" style={{ color: '#0e7529' }}>*</p>
</div>
      {/* Bottom Section */}
      <div className="flex justify-between items-start mt-4">
        {/* Left Div (Clickable List) */}
        <div className="w-1/3 bg-gray-100 p-4 text-center mr-4 h-[250px]"> {/* Fixed height added */}
          <div className="bg-gray-200 p-4 rounded-lg h-full">
            <ul className="space-y-4">
              {['Work', 'Education', 'Place Lived', 'Contacts', 'Basic Information'].map((section) => (
                <li
                  key={section}
                  className={`font-semibold text-lg cursor-pointer inline-block py-2 px-4 ${selectedSection === section ? 'bg-black text-white' : 'text-black'}`}
                  onClick={() => handleSectionClick(section)}
                >
                  {section}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Div (Rectangle with Information Display) */}
        <div className="w-2/3 bg-gray-200 p-4 text-center h-[250px]"> {/* Fixed height added */}
          <div className="bg-gray-300 p-6 rounded-lg h-full relative overflow-y-auto"> {/* Added scrolling */}
            {/* Edit Icon inside the Rectangle */}
            {selectedSection && (
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={handleEditClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                </svg>
              </div>
            )}

            {/* Editable Section */}
            {isEditing ? (
              <div>
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full h-32 p-2 border-2 border-gray-400 rounded-md"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              // Render section data differently for Contacts and Basic Information
              <div>
                {selectedSection === 'Contacts' ? (
                  <div>
                    <p>Phone: {sectionData.Contacts.Phone}</p>
                    <p>Email: {sectionData.Contacts.Email}</p>
                  </div>
                ) : selectedSection === 'Basic Information' ? (
                  <div>
                    <p>Fullname: {sectionData['Basic Information'].Fullname}</p>
                    <p>Age: {sectionData['Basic Information'].Age}</p>
                    <p>Birthday: {sectionData['Basic Information'].Birthday}</p>
                    <p>Address: {sectionData['Basic Information'].Address}</p>
                    <p>Gender: {sectionData['Basic Information'].Gender}</p>
                    <p>Status: {sectionData['Basic Information'].Status}</p>
                    <p>Nationality: {sectionData['Basic Information'].Nationality}</p>
                  </div>
                ) : (
                  <p>{sectionData[selectedSection]}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for confirming save */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to save?</h3>
            <div className="flex justify-between">
              <button
                onClick={handleCancelSave}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="text-white py-2 px-4 rounded-md"
                style={{
                  backgroundColor: '#0e7529', // Custom green color
                  hover: {
                    backgroundColor: '#08551a', // Darker shade for hover effect
                  },
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EducatorProfile;

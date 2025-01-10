import React, { useState } from 'react';

function MyCourse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // New state for confirmation modal
  const [confirmationMessage, setConfirmationMessage] = useState(''); // Confirmation message
  const [confirmationAction, setConfirmationAction] = useState(null); // Store the action (delete or save)
  const [courseName, setCourseName] = useState('');
  const [topics, setTopics] = useState('');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState('');
  const [attachment, setAttachment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);

  const handleCreateClick = () => {
    setIsModalOpen(true); // Open the modal for creating a new course
    setIsEditing(false); // Set the modal in "create" mode
    // Clear fields for new course creation
    setCourseName('');
    setTopics('');
    setDescription('');
    setObjectives('');
    setAttachment('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSaveClick = (e) => {
    e.preventDefault(); // Prevent default form submit
    setConfirmationMessage('Are you sure you want to save?');
    setConfirmationAction('save');
    setIsConfirmationModalOpen(true); // Open confirmation modal for save action
  };

  const handleDeleteClick = () => {
    setConfirmationMessage('Are you sure you want to delete?');
    setConfirmationAction('delete');
    setIsConfirmationModalOpen(true); // Open the confirmation modal for deleting
  };

  const confirmAction = () => {
    if (confirmationAction === 'save' || confirmationAction === 'delete') {
      // Close the modals after confirming the action
      setIsModalOpen(false); // Close the main modal (create or edit)
      setIsConfirmationModalOpen(false); // Close the confirmation modal
    }
  };
  

  const handleEditClick = (existingCourseName, existingTopics, existingDescription, existingObjectives, existingAttachment) => {
    setIsModalOpen(true); // Open the modal for editing
    setIsEditing(true); // Set the modal in "edit" mode
    setCourseName(existingCourseName); // Populate course name
    setTopics(existingTopics); // Populate topics
    setDescription(existingDescription); // Populate description
    setObjectives(existingObjectives); // Populate objectives
    setAttachment(existingAttachment); // Populate attachment
  };
  const handleUploadClick = () => {
    setShowAttachmentOptions(false);
    // Trigger file input dialog
    document.getElementById('fileUploadInput').click();
  };
  
  const handleCreateAttachment = () => {
    setShowAttachmentOptions(false);
    // Implement logic for creating a new attachment
    console.log('Creating new attachment...');
  };
  
  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file.name);
    }
  };

  

  return (
    <div className="p-6">
      {/* Create Header */}
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#000000"
          className="mr-2 cursor-pointer"
          onClick={handleCreateClick}
        >
          <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        </svg>
        Create
      </h1>

      {/* Table */}
      <table className="table-auto text-center justify-center items-center w-full border-collapse bg-white rounded-2xl shadow">
        <thead>
          <tr className="bg-white border-b-2 border-black rounded-t-lg">
            <th className="px-4 py-2">COURSE</th>
            <th className="px-4 py-2">TOPICS</th>
            <th className="px-4 py-2">STATUS</th>
            <th className="px-4 py-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="border-b-2 border-black pb-4">
          <tr>
            <td className="px-4 py-2">Python Basics</td>
            <td className="px-4 py-2">Variables, Loops, Lists</td>
            <td className="px-4 py-2">In Progress</td>
            <td className="px-4 py-2 flex items-center justify-center space-x-4">
              {/* Save Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                onClick={handleSaveClick}
                className="cursor-pointer"
              >
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
              </svg>

              {/* Edit Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                onClick={() => handleEditClick("Python Basics", "Variables, Loops, Lists", "Learn the basics of Python programming.", "Understand syntax, loops, and lists.", "N/A")}
                className="cursor-pointer"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
              </svg>

              {/* Delete Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" onClick = {handleDeleteClick} className='cursur-pointer'>
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
              </svg>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Python Basics</td>
            <td className="px-4 py-2">Variables, Loops, Lists</td>
            <td className="px-4 py-2">In Progress</td>
            <td className="px-4 py-2 flex items-center justify-center space-x-4">
              {/* Save Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                onClick={handleSaveClick}
                className="cursor-pointer"
              >
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
              </svg>

              {/* Edit Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                onClick={() => handleEditClick("Python Basics", "Variables, Loops, Lists", "Learn the basics of Python programming.", "Understand syntax, loops, and lists.", "N/A")}
                className="cursor-pointer"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
              </svg>

              {/* Delete Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" onClick = {handleDeleteClick} className='cursur-pointer'>
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
              </svg>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Python Basics</td>
            <td className="px-4 py-2">Variables, Loops, Lists</td>
            <td className="px-4 py-2">In Progress</td>
            <td className="px-4 py-2 flex items-center justify-center space-x-4">
              {/* Save Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                onClick={handleSaveClick}
                className="cursor-pointer"
              >
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
              </svg>

              {/* Edit Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                onClick={() => handleEditClick("Python Basics", "Variables, Loops, Lists", "Learn the basics of Python programming.", "Understand syntax, loops, and lists.", "N/A")}
                className="cursor-pointer"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
              </svg>

              {/* Delete Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" onClick = {handleDeleteClick} className='cursur-pointer'>
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
              </svg>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Python Basics</td>
            <td className="px-4 py-2">Variables, Loops, Lists</td>
            <td className="px-4 py-2">In Progress</td>
            <td className="px-4 py-2 flex items-center justify-center space-x-4">
              {/* Save Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                onClick={handleSaveClick}
                className="cursor-pointer"
              >
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
              </svg>

              {/* Edit Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                onClick={() => handleEditClick("Python Basics", "Variables, Loops, Lists", "Learn the basics of Python programming.", "Understand syntax, loops, and lists.", "N/A")}
                className="cursor-pointer"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
              </svg>

              {/* Delete Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" onClick = {handleDeleteClick} className='cursur-pointer'>
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
              </svg>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2">Python Basics</td>
            <td className="px-4 py-2">Variables, Loops, Lists</td>
            <td className="px-4 py-2">In Progress</td>
            <td className="px-4 py-2 flex items-center justify-center space-x-4">
              {/* Save Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                onClick={handleSaveClick}
                className="cursor-pointer"
              >
                <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
              </svg>

              {/* Edit Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
                onClick={() => handleEditClick("Python Basics", "Variables, Loops, Lists", "Learn the basics of Python programming.", "Understand syntax, loops, and lists.", "N/A")}
                className="cursor-pointer"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
              </svg>

              {/* Delete Icon */}
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" onClick = {handleDeleteClick} className='cursur-pointer'>
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Main Modal for Creating or Editing */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-96">
      <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#0e7529' }}>
        {isEditing ? 'Edit Course' : 'MATERIAL'}
      </h2>
      <form onSubmit={handleSaveClick}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Topic (Required):</label>
          <input
            type="text"
            placeholder=""
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Course:</label>
          <input
            type="text"
            placeholder=""
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description:</label>
          <input
            type="text"
            placeholder=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Objectives</label>
          <input
            type="text"
            placeholder=""
            value={objectives}
            onChange={(e) => setObjectives(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Add attachment:</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => document.getElementById('fileUploadInput').click()}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200 text-left"
            >
              {attachment || 'Upload Attachment'}
            </button>
            <input
              type="file"
              id="fileUploadInput"
              style={{ display: 'none' }}
              onChange={(e) => setAttachment(e.target.files[0]?.name || '')}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
  <button
    type="button"
    onClick={handleCloseModal}
    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
  >
    Cancel
  </button>
  <button
    type="submit"
    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
  >
    Save
  </button>
</div>

      </form>
    </div>
  </div>
)}
{/* Confirmation Modal for Save or Delete */}
{isConfirmationModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-96">
      <h2 className="text-xl font-bold mb-4 text-center">{confirmationMessage}</h2>
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsConfirmationModalOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={confirmAction}
          className="px-4 py-2 bg-[#0e7529] text-white rounded-lg hover:bg-green-600"
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

export default MyCourse;


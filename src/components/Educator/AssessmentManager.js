import React, { useState } from 'react';

function AssessmentManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [courseName, setCourseName] = useState('');
  const [topics, setTopics] = useState('');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState('');
  const [attachment, setAttachment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [rubricBoxes, setRubricBoxes] = useState([]);
  const [isRubricModalOpen, setIsRubricModalOpen] = useState(false);
  const [rubricTitle, setRubricTitle] = useState('');
  const [rubricDescription, setRubricDescription] = useState('');
  const [points, setPoints] = useState('');
  const [title, setTitle] = useState('');
  const [savedPoints, setSavedPoints] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const itemsPerPage = 10;

  const updateRubricBox = (index, field, value) => {
    const updatedBoxes = [...rubricBoxes];
    updatedBoxes[index][field] = value;
    setRubricBoxes(updatedBoxes);
  };

  const handleCreateClick = () => {
    setIsModalOpen(true); 
    setIsEditing(false); 
    setCourseName('');
    setTopics('');
    setDescription('');
    setObjectives('');
    setAttachment('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = (e) => {
    e.preventDefault(); 
    setConfirmationMessage('Are you sure you want to save?');
    setConfirmationAction('save');
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteClick = () => {
    setConfirmationMessage('Are you sure you want to delete?');
    setConfirmationAction('delete');
    setIsConfirmationModalOpen(true);
  };

  const confirmAction = () => {
    if (confirmationAction === 'save' || confirmationAction === 'delete') {
      setIsModalOpen(false); 
      setIsConfirmationModalOpen(false); 
    }
  };

  const handleEditClick = (existingCourseName, existingTopics, existingDescription, existingObjectives, existingAttachment) => {
    setIsModalOpen(true); 
    setIsEditing(true); 
    setCourseName(existingCourseName);
    setTopics(existingTopics);
    setDescription(existingDescription);
    setObjectives(existingObjectives);
    setAttachment(existingAttachment);
  };

  const handleUploadClick = () => {
    setShowAttachmentOptions(false);
    document.getElementById('fileUploadInput').click();
  };

  const handleCreateAttachment = () => {
    setShowAttachmentOptions(false);
    console.log('Creating new attachment...');
  };

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file.name);
    }
  };

 
  const handleAddRubricClick = () => {
    setIsRubricModalOpen(true); 
  };

  const handleCloseRubricModal = () => {
    setIsRubricModalOpen(false);
  };

  const handleSaveRubric = () => {
    console.log("Rubric Title:", rubricTitle);
    console.log("Rubric Description:", rubricDescription);
    handleCloseRubricModal();
  };

  const handleSave = (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault(); 
    }
    setSavedPoints(points);
    console.log('Rubric Saved');
  };

  const handleSavee = (data) => {
    
    console.log('Saving rubric...');
    
   
    setIsRubricModalOpen(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentData = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6">
      {}
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

      <div className='bg-white rounded-lg'>
      <table className="table-auto text-center justify-center items-center w-full rounded-lg border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="px-4 py-2">COURSE</th>
            <th className="px-4 py-2">TOPICS</th>
            <th className="px-4 py-2">STATUS</th>
            <th className="px-4 py-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">Python Basics</td>
            <td className="px-4 py-2">Variables, Loops, Lists</td>
            <td className="px-4 py-2">In Progress</td>
            <td className="px-4 py-2 flex items-center justify-center space-x-4">

              {}
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" onClick={handleDeleteClick} className="cursor-pointer">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="border-t-2 border-black flex justify-center">
        <div className="flex space-x-2 justify-center items-center pt-4 pb-4">
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
            </svg>
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${currentPage === index + 1 ? 'bg-green-500' : 'bg-gray-300'}`}
              onClick={() => handlePageChange(index + 1)}
            ></button>
          ))}
          
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
            </svg>
          </button>
        </div>
      </div>
      </div>


      {}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: '#0e7529' }}>
              {isEditing ? 'Edit Course' : 'ASSESSMENT'}
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
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Draft
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0e7529] text-white rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>
                </div>
                {}
                <div className="flex items-center space-x-2 cursor-pointer" onClick={handleAddRubricClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined">
                    <path d="m140-220-60-60 300-300 160 160 284-320 56 56-340 384-160-160-240 240Z"/>
                  </svg>
                  <span className="text-gray-700">Add rubric</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

 {}
{isRubricModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-96 relative">
      
      {}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#0e7529]">RUBRIC</h2>
        <div className="text-xl text-[#0e7529] font-semibold">
          {savedPoints ? `/${savedPoints}` : `/0`} {}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Rubric Title:</label>
        <input
          type="text"
          value={rubricTitle}
          onChange={(e) => setRubricTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Rubric Description:</label>
        <textarea
          value={rubricDescription}
          onChange={(e) => setRubricDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200"
        />
      </div>

      {}
      <div className="h-64 overflow-y-auto border border-gray-300 rounded-lg mb-4 p-2">
        {rubricBoxes.map((box, index) => (
          <div key={index} className="border-2 border-black w-full h-auto mb-4 rounded-lg p-4 relative">
            <div className="absolute top-2 right-2 flex space-x-2">
              {}
              <button
                onClick={() => {
                  const updatedBoxes = [...rubricBoxes];
                  updatedBoxes.splice(index, 1); 
                  setRubricBoxes(updatedBoxes);
                }}
                className="bg-transparent border-none cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                  <path d="M200-440v-80h560v80H200Z" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Points:</label>
              <input
                type="number"
                value={box.points || ''}
                onChange={(e) => {
                  const value = Math.min(parseInt(e.target.value, 10) || 0, 999);
                  updateRubricBox(index, 'points', value);
                }}
                min="0"
                max="999"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Title:</label>
              <input
                type="text"
                value={box.title}
                onChange={(e) => updateRubricBox(index, 'title', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Description:</label>
              <textarea
                value={box.description}
                onChange={(e) => updateRubricBox(index, 'description', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-200"
              />
            </div>
          </div>
        ))}
      </div>

      {}
      <div className="mt-2 flex justify-center">
        <button
          onClick={() =>
            setRubricBoxes([
              ...rubricBoxes,
              { points: '', title: '', description: '' },
            ])
          }
          className="bg-transparent border-none cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        </button>
      </div>

      {}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => {
            const totalPoints = rubricBoxes.reduce(
              (sum, box) => sum + (parseInt(box.points) || 0),
              0
            );
            setSavedPoints(totalPoints); 
            setIsRubricModalOpen(false); 
          }}
          className="px-6 py-2 bg-[#0e7529] text-white rounded-lg hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>

  </div>
)}








      {}
      {isConfirmationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-96">
            <p className="text-xl mb-4">{confirmationMessage}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={confirmAction}
                className="px-4 py-2 bg-[#0e7529] text-white rounded-lg hover:bg-green-600"
              >
                Confirm
              </button>
              <button
  onClick={() => setIsConfirmationModalOpen(false)}
  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
>
  Cancel
</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssessmentManager;

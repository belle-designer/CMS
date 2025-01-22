import React, { useState, useEffect } from 'react';

function TopicBank() {
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
  // const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  // const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;
      const [dataRepo, setDataRepo] = useState([]);
      const [refresh, setRefresh] = useState('');
      
          useEffect(() => {
            const fetchDataRepo = async () => {
              try {
                const response = await fetch('http://localhost:5005/api/getDataRepo');
                if (!response.ok) {
                  throw new Error('Failed to fetch data from the repository');
                }
                const data = await response.json();
                setDataRepo(data);
              } catch (error) {
                console.error(error);
              }
            };
        
            fetchDataRepo();
          }, [refresh]);
      
          const handleRefresh = () => {
            setRefresh(Date.now()); // Trigger re-fetch with a new unique value
          };
      
    
      const totalPages = Math.ceil(dataRepo.length / itemsPerPage);
      const currentData = dataRepo.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // const handleCreateClick = () => {
  //   setIsModalOpen(true); 
  //   setIsEditing(false); 
  //   setCourseName('');
  //   setTopics('');
  //   setDescription('');
  //   setObjectives('');
  //   setAttachment('');
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = (e) => {
    e.preventDefault(); 
    setConfirmationMessage('Are you sure you want to save?');
    setConfirmationAction('save');
    setIsConfirmationModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    const deleteDataRepo = async (id) => {
      try {
        const response = await fetch(`http://localhost:5005/api/deleteDataRepo/${id}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete repository data');
        }
    
        const result = await response.json();
        console.log('Delete successful:', result);
        return result; // Return result for further processing if needed
      } catch (error) {
        console.error('Error deleting repository data:', error);
        throw error; // Re-throw the error for higher-level handling if needed
      }
    };
    const handleDeleteThenRefresh = async () => {
      await deleteDataRepo(id);
      handleRefresh();
    }
    handleDeleteThenRefresh();
    
    
    // setConfirmationMessage('Are you sure you want to delete?');
    // setConfirmationAction('delete');
    // setIsConfirmationModalOpen(true); 
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // const totalPages = Math.ceil(users.length / itemsPerPage);
  // const currentData = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6">
      <div className="assessment-review">
    <div className="justify-center items-center bg-white rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-center items-center p-4 overflow-x-auto">
        <thead>
          <tr className="border-b-2 border-black mt-5 mb-5">
            <th className="py-3 px-4 font-semibold text-mid text-gray-700">COURSE</th>
            <th className="py-3 px-4 font-semibold text-mid text-gray-700">TOPIC</th>
            <th className="py-3 px-4 font-semibold text-mid text-gray-700">OBJECTIVE</th>
            <th className="py-3 px-4 font-semibold text-mid text-gray-700">TYPE</th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td className="py-3 px-4 text-gray-600 truncate">{item.course_name}</td>
              <td className="py-3 px-4 text-gray-600 truncate">{item.topic}</td>
              <td className="py-3 px-4 text-gray-600 truncate w-1/3 overflow-auto">{item.objective}</td>
              <td className="py-3 px-4 text-gray-600 truncate">{item.type}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
  
      <div className="border-t-2 border-black flex justify-center">
        <div className="flex space-x-2 justify-center items-center pt-4 pb-4">

          <button
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setCurrentPage(currentPage - 1)}
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
              onClick={() => setCurrentPage(index + 1)}
            ></button>
          ))}
          
          <button
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

      {}
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
      {}
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

export default TopicBank;


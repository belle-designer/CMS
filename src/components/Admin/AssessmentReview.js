import React, { useState } from 'react';

function AssessmentReview({ handleViewAssessment }) {
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [approvedAssessments, setApprovedAssessments] = useState([]);
  const [isApproveModalOpen, setApproveModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleApprove = (id) => {
    setSelectedAssessmentId(id);
    setApproveModalOpen(true);
  };

  const confirmApproval = () => {
    const approved = users.find((user) => user.id === selectedAssessmentId);
    setApprovedAssessments((prev) => [...prev, approved]);
    setUsers(users.filter((user) => user.id !== selectedAssessmentId));
    setApproveModalOpen(false);
  };

  const cancelApproval = () => {
    setApproveModalOpen(false);
  };

  const handleDeleteAssessment = (assessmentId) => {
    setSelectedAssessmentId(assessmentId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter((user) => user.id !== selectedAssessmentId));
    setDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', course: 'Computer Science', assessment: 'Midterm 1' },
    { id: 2, name: 'Jane Smith', course: 'Mathematics', assessment: 'Final Exam' },
    { id: 3, name: 'Alice Johnson', course: 'Biology', assessment: 'Lab Report' },
    { id: 4, name: 'Bob Brown', course: 'Physics', assessment: 'Quiz 1' },
    { id: 5, name: 'Charlie Davis', course: 'Chemistry', assessment: 'Homework Assignment' },
    { id: 6, name: 'David Wilson', course: 'History', assessment: 'Research Paper' },
    { id: 7, name: 'Eve Martin', course: 'Psychology', assessment: 'Project' },
    { id: 8, name: 'Frank Thompson', course: 'Sociology', assessment: 'Case Study' },
    { id: 9, name: 'Grace Lee', course: 'English', assessment: 'Essay' },
    { id: 10, name: 'Hannah Clark', course: 'Economics', assessment: 'Presentation' },
    { id: 11, name: 'Ivy Allen', course: 'Philosophy', assessment: 'Discussion' },
    { id: 12, name: 'Jack White', course: 'Art', assessment: 'Painting' },
    { id: 13, name: 'Katherine Harris', course: 'Music', assessment: 'Performance' },
    { id: 14, name: 'Liam Walker', course: 'Engineering', assessment: 'Lab Report' },
    { id: 15, name: 'Mia Adams', course: 'Medicine', assessment: 'Clinical Exam' },
  ]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentData = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="assessment-review">
      <div className="justify-center items-center bg-white rounded-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed text-center items-center p-4">
            <thead>
              <tr className="border-b-2 border-black pt-2 pb-2">
                <th className="py-3 px-4 font-semibold text-mid text-gray-700 w-1/4">EDUCATORS</th>
                <th className="py-3 px-4 font-semibold text-mid text-gray-700 w-1/4">COURSE</th>
                <th className="py-3 px-4 font-semibold text-mid text-gray-700 w-1/4">ASSESSMENT</th>
                <th className="py-3 px-4 font-semibold text-mid text-gray-700 w-1/4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user) => (
                <tr key={user.id}>
                  <td className="py-3 px-4 text-gray-600 truncate w-1/4 max-w-xs">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600 w-1/4">{user.course}</td>
                  <td className="py-3 px-4 text-gray-600 w-1/4">
                    <button onClick={handleViewAssessment} className="text-blue-500 hover:underline">
                      View Assessment
                    </button>
                  </td>
                  <td className="py-3 px-4 text-gray-600 w-1/4">
                    <button onClick={() => handleApprove(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0e7529">
                      <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                    </button>

                    {/* Delete Assessment */}
                    <button className="ml-2" onClick={() => handleDeleteAssessment(user.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff2929">
                      <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t-2 border-black flex justify-center">
          <div className="flex space-x-2 justify-center items-center pt-4 pb-4">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="960 0 960 960" width="20px" fill="#000000">
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
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="960 0 960 960" width="20px" fill="#000000">
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isApproveModalOpen && selectedAssessmentId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Approve Assessment</h2>
            <p className="text-sm mb-4">Are you sure you want to approve this assessment?</p>

            <div className="flex justify-end space-x-2">
              <button
                onClick={confirmApproval}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
              <button
                onClick={cancelApproval}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Delete Assessment</h2>
            <p className="text-sm mb-4">Are you sure you want to delete this assessment?</p>

            <div className="flex justify-end space-x-2">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
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

export default AssessmentReview;

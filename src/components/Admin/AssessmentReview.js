import React, { useState } from 'react';

function AssessmentReview({ handleViewAssessment }) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]); 
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [approvedAssessments, setApprovedAssessments] = useState([]);
  const [isApproveModalOpen, setApproveModalOpen] = useState(false);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
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

  const handleAddComment = () => {
    if (!selectedAssessmentId) return; 
  
   
    const updatedComments = { ...comments };
  
   
    if (!updatedComments[selectedAssessmentId]) {
      updatedComments[selectedAssessmentId] = [];
    }
  
    
    updatedComments[selectedAssessmentId].push({
      user: 'Current User', 
      role: 'Reviewer', 
      comment: newComment,
      timestamp: new Date().toLocaleString(),
    });
  
    
    setComments(updatedComments);
  
    
    const updatedLocalComments = { ...localcomments };
  
    if (!updatedLocalComments[selectedAssessmentId]) {
      updatedLocalComments[selectedAssessmentId] = [];
    }
  
    updatedLocalComments[selectedAssessmentId].push({
      user: 'Mikaella Arciaga', 
      role: 'Admin', 
      comment: newComment,
      timestamp: new Date().toLocaleString(),
    });
  
    
    setLocalComments(updatedLocalComments);
  
   
    setNewComment('');
  };
  

  const [users, setUsers] = useState([
    {
      "id": 1,
      "name": "John Doe",
      "course": "Mathematics",
      "type": "Assessment",
      "date_of_assessment_created": "2025-01-05",
      "description": "A course on advanced mathematics.",
      "attachment_file": "Algebra_Notes.pdf",
      "objectives": "To improve problem-solving skills.",
      "topic": "Algebra and Geometry",
      "rubric": {
        "overall_points": 50,
        "categories": [
          {
            "rubric_category": "Concept Understanding",
            "points": 20,
            "description": "Assesses the understanding of mathematical concepts and theories."
          },
          {
            "rubric_category": "Problem Solving",
            "points": 15,
            "description": "Evaluates the ability to solve complex mathematical problems."
          },
          {
            "rubric_category": "Application of Theory",
            "points": 15,
            "description": "Assesses the ability to apply mathematical theory to real-world problems."
          }
        ]
      }
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "course": "Science",
      "type": "Assessment",
      "date_of_assessment_created": "2025-01-01",
      "description": "A course on scientific principles.",
      "attachment_file": "Science_Lab_Manual.pdf",
      "objectives": "To understand basic physics and chemistry.",
      "topic": "Physics and Chemistry",
      "rubric": {
        "overall_points": 50,
        "categories": [
          {
            "rubric_category": "Experimentation",
            "points": 20,
            "description": "Assesses the ability to design and conduct scientific experiments."
          },
          {
            "rubric_category": "Analysis",
            "points": 15,
            "description": "Evaluates the analysis of experimental results and drawing conclusions."
          },
          {
            "rubric_category": "Conclusion Accuracy",
            "points": 15,
            "description": "Assesses the accuracy of the conclusions drawn based on the data."
          }
        ]
      }
    },
    {
      "id": 3,
      "name": "Mark Johnson",
      "course": "History",
      "type": "Assessment",
      "date_of_assessment_created": "2025-01-03",
      "description": "A course on world history.",
      "attachment_file": "World_History.pdf",
      "objectives": "To learn about major historical events and figures.",
      "topic": "World War II History",
      "rubric": {
        "overall_points": 50,
        "categories": [
          {
            "rubric_category": "Historical Knowledge",
            "points": 20,
            "description": "Assesses knowledge of historical events, ability to analyze causes and effects, and the ability to consider historical perspectives."
          },
          {
            "rubric_category": "Analysis of Events",
            "points": 15,
            "description": "Evaluates the ability to analyze the causes and consequences of key events in history."
          },
          {
            "rubric_category": "Historical Perspective",
            "points": 15,
            "description": "Assesses the ability to consider historical perspectives and contextualize events within broader historical frameworks."
          }
        ]
      }
    },
    {
      "id": 4,
      "name": "Emily Davis",
      "course": "Literature",
      "type": "Assessment",
      "date_of_assessment_created": "2025-01-08",
      "description": "A course on classical literature.",
      "attachment_file": "Literary_Analysis.pdf",
      "objectives": "To read and analyze classic literary works.",
      "topic": "Shakespearean Plays",
      "rubric": {
        "overall_points": 50,
        "categories": [
          {
            "rubric_category": "Literary Analysis",
            "points": 20,
            "description": "Evaluates the depth of literary analysis in interpreting texts and themes."
          },
          {
            "rubric_category": "Character Study",
            "points": 15,
            "description": "Assesses the ability to analyze character development and motivations."
          },
          {
            "rubric_category": "Contextual Understanding",
            "points": 15,
            "description": "Evaluates the ability to contextualize the plays within their historical and cultural settings."
          }
        ]
      }
    },
    {
      "id": 5,
      "name": "James Brown",
      "course": "Computer Science",
      "type": "Assessment",
      "date_of_assessment_created": "2025-01-02",
      "description": "A course on data structures and algorithms.",
      "attachment_file": "Data_Structures.pdf",
      "objectives": "To learn how to solve problems using algorithms and data structures.",
      "topic": "Data Structures and Algorithms",
      "rubric": {
        "overall_points": 50,
        "categories": [
          {
            "rubric_category": "Algorithm Efficiency",
            "points": 20,
            "description": "Assesses the efficiency of algorithms in solving problems."
          },
          {
            "rubric_category": "Data Structure Selection",
            "points": 15,
            "description": "Evaluates the ability to select appropriate data structures for solving problems."
          },
          {
            "rubric_category": "Problem-Solving Approach",
            "points": 15,
            "description": "Assesses the overall approach and methodology used to solve computational problems."
          }
        ]
      }
    }
  ]);

  const [localcomments, setLocalComments] = useState({
    1: [
      {
        user: "John Doe",
        role: "Educator",
        comment: "Ensure students focus on algebraic concepts for better understanding.",
        timestamp: "2025-01-06 10:15 AM",
      },
      {
        user: "Mary Clark",
        role: "Admin",
        comment: "Assessment meets the requirements but consider adding more geometry problems.",
        timestamp: "2025-01-06 11:45 AM",
      },
    ],
    2: [
      {
        user: "Jane Smith",
        role: "Educator",
        comment: "Students might need additional resources for the experiments.",
        timestamp: "2025-01-02 09:00 AM",
      },
      {
        user: "Alex Taylor",
        role: "Admin",
        comment: "Make sure safety guidelines are clearly included in the attachment.",
        timestamp: "2025-01-02 09:45 AM",
      },
    ],
    3: [
      {
        user: "Mark Johnson",
        role: "Educator",
        comment: "Highlight key battles for better historical analysis.",
        timestamp: "2025-01-04 03:30 PM",
      },
      {
        user: "Lisa Green",
        role: "Admin",
        comment: "Check for consistent formatting in the rubric sections.",
        timestamp: "2025-01-04 04:15 PM",
      },
    ],
    4: [
      {
        user: "Emily Davis",
        role: "Educator",
        comment: "Include more examples from non-Shakespearean plays for comparison.",
        timestamp: "2025-01-09 01:20 PM",
      },
      {
        user: "Admin Kevin White",
        role: "Admin",
        comment: "Ensure the file includes a complete analysis of Act III.",
        timestamp: "2025-01-09 02:00 PM",
      },
    ],
    5: [
      {
        user: "Educator James Brown",
        role: "Educator",
        comment: "Focus on recursion techniques for the algorithm section.",
        timestamp: "2025-01-03 08:30 AM",
      },
      {
        user: "Admin Sarah Wilson",
        role: "Admin",
        comment: "Add more examples of practical applications for data structures.",
        timestamp: "2025-01-03 09:00 AM",
      },
    ],
  });
  

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

                    {}
                    <button onClick={() => handleApprove(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0e7529"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>
                    </button>

                    {}
                    <button className="ml-2" onClick={() => {
                    setSelectedAssessmentId(user.id); // Set the selected assessment ID
                    setCommentModalOpen(true); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-400h122l200-200q9-9 13.5-20.5T580-643q0-11-5-21.5T562-684l-36-38q-9-9-20-13.5t-23-4.5q-11 0-22.5 4.5T440-722L240-522v122Zm280-243-37-37 37 37ZM300-460v-38l101-101 20 18 18 20-101 101h-38Zm121-121 18 20-38-38 20 18Zm26 181h273v-80H527l-80 80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
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
      {isApproveModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-semibold mb-4">Are you sure you want to approve this assessment?</h2>
              <div className="flex justify-end space-x-2">
                <button onClick={confirmApproval} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Yes
                </button>
                <button onClick={cancelApproval} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

{isCommentModalOpen && selectedAssessmentId && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 className="text-lg font-semibold mb-4">Private Comment</h2>

      {}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2">Previous Comments:</h3>
        {localcomments[selectedAssessmentId]?.length > 0 ? (
          <ul className="space-y-2 overflow-y-auto">
            {localcomments[selectedAssessmentId].map((comment, index) => (
              <li key={index} className="text-gray-700 border-b pb-2">
                <span className="font-bold">{comment.user} ({comment.role}):</span> {comment.comment}
                <div className="text-sm text-gray-500">{comment.timestamp}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments available.</p>
        )}
      </div>

      {}
      <label htmlFor="comment" className="block text-sm font-medium mb-2">
        Add a Comment:
      </label>
      <textarea
        id="comment"
        rows="2"
        className="w-full border rounded p-2 mb-4"
        placeholder="Write your comment here..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>

      <div className="flex justify-end space-x-2">
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
        <button
          onClick={() => setCommentModalOpen(false)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

  </div>
);
}

export default AssessmentReview;

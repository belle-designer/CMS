import React, { useState } from 'react';

function DataRepository() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
  
    {}
    const assessments = [
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
            },
          ]
        }
      }
    ];

    const materials = [
      {
        id: 1,
        name: 'John Doe',
        course: 'Mathematics',
        type: "Material",
        description: 'A course on advanced mathematics.',
        objectives: 'To improve problem-solving skills.',
        attachment: 'Algebra_Notes.pdf',
        topic: 'Algebra and Geometry',
        activities: [
          { activity: 'Created an item', date: '2025-01-05' },
          { activity: 'Edited an item', date: '2025-01-06' },
          { activity: 'Renamed an item', date: '2025-01-07' }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        course: 'Science',
        type: "Material",
        description: 'A course on scientific principles.',
        objectives: 'To understand basic physics and chemistry.',
        attachment: 'Science_Lab_Manual.pdf',
        topic: 'Physics and Chemistry',
        activities: [
          { activity: 'Created an item', date: '2025-01-01' },
          { activity: 'Edited an item', date: '2025-01-02' }
        ]
      },
      {
        id: 3,
        name: 'Mark Johnson',
        course: 'History',
        type: "Material",
        description: 'A course on world history.',
        objectives: 'To learn about major historical events and figures.',
        attachment: 'World_History.pdf',
        topic: 'World War II History',
        activities: [
          { activity: 'Created an item', date: '2025-01-03' },
          { activity: 'Added notes', date: '2025-01-04' }
        ]
      },
      {
        id: 4,
        name: 'Emily Davis',
        course: 'Literature',
        type: "Material",
        description: 'A course on classical literature.',
        objectives: 'To read and analyze classic literary works.',
        attachment: 'Literary_Analysis.pdf',
        topic: 'Shakespearean Plays',
        activities: [
          { activity: 'Created an item', date: '2025-01-08' },
          { activity: 'Edited an item', date: '2025-01-09' },
          { activity: 'Renamed an item', date: '2025-01-10' }
        ]
      },
      {
        id: 5,
        name: 'James Brown',
        course: 'Computer Science',
        type: "Material",
        description: 'A course on data structures and algorithms.',
        objectives: 'To learn how to solve problems using algorithms and data structures.',
        attachment: 'Data_Structures.pdf',
        topic: 'Data Structures and Algorithms',
        activities: [
          { activity: 'Created an item', date: '2025-01-02' },
          { activity: 'Edited an item', date: '2025-01-04' },
          { activity: 'Renamed an item', date: '2025-01-06' },
          { activity: 'Added new content', date: '2025-01-07' },
        ]
      }
    ];
    
    const combinedData = [...assessments, ...materials];
  
    const totalPages = Math.ceil(combinedData.length / itemsPerPage);
    const currentData = combinedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
    
    // const handleCreateClick = () => {
    //   setIsModalOpen(true); 
    //   setIsEditing(false); 
    //   setCourseName('');
    //   setTopics('');
    //   setDescription('');
    //   setObjectives('');
    //   setAttachment('');
    // };
    const handleSaveClick = (e) => {
      e.preventDefault(); 
      setConfirmationMessage('Are you sure you want to save?');
      setConfirmationAction('save');
      setIsConfirmationModalOpen(true);
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
    const handleDeleteClick = () => {
      setConfirmationMessage('Are you sure you want to delete?');
      setConfirmationAction('delete');
      setIsConfirmationModalOpen(true); 
    };
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    const confirmAction = () => {
      if (confirmationAction === 'save' || confirmationAction === 'delete') {  
        setIsModalOpen(false); 
        setIsConfirmationModalOpen(false); 
      }
    };

return (
  <div className="p-6">
      {/* {}
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
      </h1> */}

      {}
      <div className='bg-white rounded-lg'>
      <table className="table-auto text-center justify-center items-center w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
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
              {}
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

              {}
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

              {}
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
              {}
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

              {}
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

              {}
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
              {}
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

              {}
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

              {}
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
              {}
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

              {}
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

              {}
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
              {}
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

              {}
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

              {}
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
              {}
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

              {}
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

              {}
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
              {}
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

              {}
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

              {}
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
              {}
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

              {}
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

              {}
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000" onClick = {handleDeleteClick} className='cursur-pointer'>
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
              </svg>
            </td>
          </tr>
          
        </tbody>
      </table>
  <div className="border-black flex justify-center">
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

export default DataRepository;

import { useState } from "react";

const AssessmentDetails = ({ handleBackToReview }) => {

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

    const data = users[0];


  return (
    <div className="assessment-details">
      {/* Up Section */}
      <div className="up flex items-center bg-gray-100 pb-5">
        <button onClick={handleBackToReview} className="arrow-icon bg-white p-2 rounded-l-xl mr-2 w-12">
            <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28 px" fill="#000000">
              <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/>
            </svg>
        </button>
        <span className="text-4xl font-semibold">ASSESSMENT</span>
      </div>

      {/* Mid Section */}
      <div className="mid bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center text-lg">
          <div className="left font-semibold">{data.name}</div>
          <div className="right text-gray-500">{data.date_of_assessment_created}</div>
        </div>
      </div>

      {/* Down Section */}
      <div className="down bg-white rounded-lg shadow p-2 items-center text-center justify-center">
        <div className="up mt-6 mb-3">
          {/* Content for up */}
          <div className="items-center justify-center text-center rounded-md text-2xl font-semibold">
            <h2>{data.topic}</h2>
          </div>
        </div>
        <div className="mid-1 mb-4">
          {/* Content for mid 1 */}
          <div className="items-center justify-center text-center rounded-md overflow-auto">
            <h2>{data.description}</h2>
          </div>
        </div>
        <div className="mid-2 mt-5 mb-5">
          {/* Content for mid 2 */}
          <div className="items-center justify-center text-center rounded-md overflow-auto">
            <h2>{data.attachment_file}</h2>
          </div>
        </div>

      {/* Down Bottom Box */}
      <div className="flex items-center justify-center pb-8">
        <div className="down-bottom bg-gray-200 p-6 rounded-2xl mt-4 w-2/3">
          {/* Up Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-bold">Rubric</div>
            <div className="text-lg font-bold">{data.rubric.overall_points}</div>
          </div>

            {/* Rubric Details */}
            <div className="space-y-4">
              {data.rubric.categories.map((item, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                        <path d="m296-224-56-56 240-240 240 240-56 56-184-183-184 183Zm0-240-56-56 240-240 240 240-56 56-184-183-184 183Z" />
                      </svg>
                      <div className="font-semibold">{item.rubric_category}</div>
                    </div>
                    <div className="font-semibold">{item.points}</div>
                  </div>
                  <div className="h-1 bg-gray-300 rounded"></div>
                </div>
              ))}
        </div>
      </div>
      </div>

      </div>
    </div>
  );
};

export default AssessmentDetails;

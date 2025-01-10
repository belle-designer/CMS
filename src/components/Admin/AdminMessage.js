import React, { useState } from 'react';
import messagesData from '../../data/messagesData'; // Ensure messagesData includes 'recipient' field

function AdminMessage() {
  const [selectedSender, setSelectedSender] = useState(messagesData[0]?.sender); // Default to the first sender
  const [messages, setMessages] = useState(messagesData); // All messages (user and others)
  const [newMessage, setNewMessage] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('You'); // Logged-in user is 'You'

  const handleSendMessage = () => {
    // Create a new message object
    const message = {
      id: messages.length + 1, // Unique ID for each message
      sender: loggedInUser, // This is dynamic (currently 'You' for the logged-in user)
      recipient: selectedSender, // The recipient is the selected sender
      timestamp: new Date().toLocaleString(), // Current timestamp
      content: newMessage, // Content from the input
    };

    // Add the new message to the messages array
    setMessages((prevMessages) => [...prevMessages, message]);

    // Clear the input field after sending the message
    setNewMessage('');
  };

  // Filter messages to display only messages between 'You' and the selected sender
  const filteredMessages = messages.filter(
    (message) =>
      (message.sender === loggedInUser && message.recipient === selectedSender) ||
      (message.sender === selectedSender && message.recipient === loggedInUser)
  );

  // Get the latest message for each sender to display in the left section
  const latestMessagesBySender = messages.reduce((acc, message) => {
    if (message.sender !== loggedInUser) {
      acc[message.sender] = message;
    }
    return acc;
  }, {});

  return (
    <div className="flex rounded-xl overflow-hidden shadow-lg">
      {/* Left Section - 25% */}
      <div className="w-1/4 bg-white border-r-2 border-gray-100 rounded-l-xl">
        <h2 className="text-xl font-bold text-green-700 p-4 border-b-2">Messages</h2>
        <ul>
          {Object.values(latestMessagesBySender).map((message) => (
            message.sender !== loggedInUser && (
              <li
                key={message.id}
                onClick={() => setSelectedSender(message.sender)}
                className={`p-2 cursor-pointer ${
                  selectedSender === message.sender
                    ? 'bg-green-300'
                    : 'bg-white hover:bg-green-100'
                }`}
              >
                <div className="flex items-center">
                  {/* Profile picture */}
                  <img
                    src={message.profilePicture}
                    alt={message.sender}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold">{message.sender}</p>
                    <p className="text-xs text-gray-500">{message.timestamp}</p>
                    <p className="text-sm text-gray-600 truncate">{message.content}</p>
                  </div>
                </div>
              </li>
            )
          ))}
        </ul>
      </div>

      {/* Right Section - 75% */}
      <div className="flex w-3/4 bg-white flex-col rounded-r-xl">
        <div className="flex-grow">
          <div className='border-b-2 p-4'>
            <h2 className="text-xl font-bold">{selectedSender}</h2>
          </div>
          <div className="space-y-4 p-6">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => {
                return (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === loggedInUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        message.sender === loggedInUser
                          ? 'bg-blue-200 text-right'
                          : 'bg-gray-200'
                      }`}
                    >
                      <p className="text-xs text-gray-500">{message.timestamp}</p>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No messages yet.</p>
            )}
          </div>
        </div>

        {/* Message box and send button */}
        <div className="mt-4 border-t pt-4 p-6 flex items-center rounded-b-xl">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded-lg p-2 mr-2"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminMessage;

import { useState } from "react";
import { Send, Plus, Mail } from "lucide-react";

export default function Messages() {
  // Mock inbox (replace later with backend data)
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Admin",
      messages: [
        { id: 1, sender: "Admin", text: "Hello! How can I assist you today?", read: true },
        { id: 2, sender: "You", text: "I need info about my order.", read: true }
      ]
    },
    {
      id: 2,
      name: "Support",
      messages: [
        { id: 1, sender: "Support", text: "Your ticket is being reviewed.", read: false }
      ]
    }
  ]);

  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeChat.id) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            { id: conv.messages.length + 1, sender: "You", text: newMessage, read: true }
          ]
        };
      }
      return conv;
    });
    setConversations(updatedConversations);
    setActiveChat(updatedConversations.find(c => c.id === activeChat.id));
    setNewMessage("");
  };

  const handleNewConversation = () => {
    const newConv = {
      id: conversations.length + 1,
      name: `User ${conversations.length + 1}`,
      messages: []
    };
    setConversations([...conversations, newConv]);
    setActiveChat(newConv);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      {/* Inbox Sidebar */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Mail size={18} /> Inbox
          </h2>
          <button
            onClick={handleNewConversation}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => {
            const unread = conv.messages.some(m => m.sender !== "You" && !m.read);
            return (
              <div
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  activeChat.id === conv.id ? "bg-gray-100 dark:bg-gray-800" : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{conv.name}</p>
                  {unread && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {conv.messages[conv.messages.length - 1]?.text || "No messages yet"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {activeChat?.name}
          </h3>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
          {activeChat?.messages.map(msg => (
            <div
              key={msg.id}
              className={`max-w-xs px-3 py-2 rounded-lg text-sm shadow-sm ${
                msg.sender === "You"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

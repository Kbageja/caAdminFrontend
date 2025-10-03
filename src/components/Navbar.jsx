"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // For hamburger icon

export default function Navbar({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { name: "Add Question", key: "addQuestion" },
    { name: "Add Subject", key: "addSubject" },
    { name: "Add Topic", key: "addTopic" },
    { name: "Add Subtopic", key: "addSubtopic" },
    { name: "Questions List", key: "questionsList" },
  ];

  return (
    <nav className="bg-gray-900 p-4 shadow rounded-b-lg">
      {/* Desktop Menu */}
      <div className="hidden md:flex justify-center space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === tab.key
                ? "bg-gray-700 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex md:hidden justify-between items-center">
        <span className="text-white font-bold">Menu</span>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="mt-3 flex flex-col space-y-2 md:hidden">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setMenuOpen(false);
              }}
              className={`px-4 py-2 rounded-md font-medium text-left transition-colors duration-200 ${
                activeTab === tab.key
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

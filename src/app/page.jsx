"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import AddSubjectForm from "../components/AddSubjectForm";
import AddTopicForm from "../components/AddTopicForm";
import AddSubtopicForm from "../components/AddSubtopicForm";
import AddQuestionForm from "../components/AddQuestionForm";
import QuestionList from "../components/QuestionList";

export default function Home() {
  const [activeTab, setActiveTab] = useState("addQuestion");

  const renderComponent = () => {
    switch (activeTab) {
      case "addSubject":
        return <AddSubjectForm />;
      case "addTopic":
        return <AddTopicForm />;
      case "addSubtopic":
        return <AddSubtopicForm />;
      case "questionsList":
        return <QuestionList />;
      case "addQuestion":
      default:
        return <AddQuestionForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Full width container */}
      <main className="max-w-7xl mx-auto w-full px-6 py-8">
        {renderComponent()}
      </main>
    </div>
  );
}

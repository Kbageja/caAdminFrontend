"use client";
import { useState, useEffect } from "react";

export default function AddQuestionForm() {
  const [caType, setCaType] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [subtopicId, setSubtopicId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/getSubject")
      .then((res) => res.json())
      .then(setSubjects);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/getTopics")
      .then((res) => res.json())
      .then(setTopics);
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/getSubtopics")
      .then((res) => res.json())
      .then(setSubtopics);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/addQuestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ca_type: caType,
        question,
        answer,
        subjectId: Number(subjectId),
        topicId: Number(topicId),
        subtopicId: Number(subtopicId),
      }),
    });

    setCaType("");
    setSubjectId("");
    setTopicId("");
    setSubtopicId("");
    setQuestion("");
    setAnswer("");
    alert("✅ Question added successfully!");
  };

  // 🔎 Filtered lists
  const filteredSubjects = subjects.filter((s) => s.ca_type === caType);
  const filteredTopics = topics.filter(
    (t) => t.ca_type === caType && String(t.subjectId) === subjectId
  );
  const filteredSubtopics = subtopics.filter(
    (st) =>
      st.ca_type === caType &&
      String(st.subjectId) === subjectId &&
      String(st.topicId) === topicId
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          ➕ Add New Question
        </h2>

        {/* CA Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CA Type
          </label>
          <select
            value={caType}
            onChange={(e) => {
              setCaType(e.target.value);
              setSubjectId("");
              setTopicId("");
              setSubtopicId("");
            }}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="" className="text-gray-500">
              Select CA Type
            </option>
            <option value="CA_FINAL" className="text-gray-800">
              CA FINAL
            </option>
            <option value="CA_INTER" className="text-gray-800">
              CA INTER
            </option>
            <option value="CA_FOUND" className="text-gray-800">
              CA FOUNDATION
            </option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            value={subjectId}
            onChange={(e) => {
              setSubjectId(e.target.value);
              setTopicId("");
              setSubtopicId("");
            }}
            disabled={!caType}
            className={`w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              !caType ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-800"
            }`}
          >
            <option value="">Select Subject</option>
            {filteredSubjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Topic
          </label>
          <select
            value={topicId}
            onChange={(e) => {
              setTopicId(e.target.value);
              setSubtopicId("");
            }}
            disabled={!subjectId}
            className={`w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              !subjectId ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-800"
            }`}
          >
            <option value="">Select Topic</option>
            {filteredTopics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subtopic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtopic
          </label>
          <select
            value={subtopicId}
            onChange={(e) => setSubtopicId(e.target.value)}
            disabled={!topicId}
            className={`w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              !topicId ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-800"
            }`}
          >
            <option value="">Select Subtopic</option>
            {filteredSubtopics.map((st) => (
              <option key={st.id} value={st.id}>
                {st.name}
              </option>
            ))}
          </select>
        </div>

        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question..."
            rows={3}
            disabled={!subtopicId}
            className={`w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 ${
              !subtopicId ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-800"
            }`}
          />
        </div>

        {/* Answer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Answer
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter answer..."
            rows={3}
            disabled={!question}
            className={`w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 ${
              !question ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-800"
            }`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!answer}
          className={`w-full font-medium px-4 py-3 rounded-lg shadow-md transition duration-200 ${
            !answer
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Add Question
        </button>
      </form>
    </div>
  );
}

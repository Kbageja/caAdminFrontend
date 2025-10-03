"use client";
import { useState, useEffect } from "react";

export default function AddSubtopicForm() {
  const [caType, setCaType] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}/getSubject`)
      .then((res) => res.json())
      .then(setSubjects);
  }, []);

  useEffect(() => {
    if (subjectId) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API}/getTopics`)
        .then((res) => res.json())
        .then(setTopics);
    }
  }, [subjectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/addSubtopic`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ca_type: caType,
        subjectId: Number(subjectId),
        topicId: Number(topicId),
        name,
      }),
    });
    setCaType("");
    setSubjectId("");
    setTopicId("");
    setName("");
    alert("Subtopic added!");
  };

  // Filter subjects and topics by caType
  const filteredSubjects = subjects.filter((s) => s.ca_type === caType);
  const filteredTopics = topics.filter(
    (t) => t.ca_type === caType && Number(t.subjectId) === Number(subjectId)
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Add New Subtopic
        </h2>

        {/* CA Type Select */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Select CA Type
          </label>
          <select
            value={caType}
            onChange={(e) => {
              setCaType(e.target.value);
              setSubjectId("");
              setTopicId("");
            }}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
          >
            <option value="" className="text-gray-700">
              -- Choose CA Type --
            </option>
            <option value="CA_FINAL" className="text-gray-900">
              CA Final
            </option>
            <option value="CA_INTER" className="text-gray-900">
              CA Inter
            </option>
            <option value="CA_FOUND" className="text-gray-900">
              CA Foundation
            </option>
          </select>
        </div>

        {/* Subject Select */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Select Subject
          </label>
          <select
            value={subjectId}
            onChange={(e) => {
              setSubjectId(e.target.value);
              setTopicId("");
            }}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
            required
            disabled={!caType}
          >
            <option value="" className="text-gray-700">
              {caType ? "-- Choose Subject --" : "Select CA Type first"}
            </option>
            {filteredSubjects.map((s) => (
              <option key={s.id} value={s.id} className="text-gray-900">
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Select */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Select Topic
          </label>
          <select
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            disabled={!subjectId}
          >
            <option value="" className="text-gray-700">
              {subjectId ? "-- Choose Topic --" : "Select Subject first"}
            </option>
            {filteredTopics.map((t) => (
              <option key={t.id} value={t.id} className="text-gray-900">
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subtopic Name */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Subtopic Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter subtopic name"
            className="w-full border border-gray-300 text-gray-900 placeholder-gray-500 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            disabled={!topicId}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          disabled={!name || !topicId || !subjectId || !caType}
        >
          Add Subtopic
        </button>
      </form>
    </div>
  );
}

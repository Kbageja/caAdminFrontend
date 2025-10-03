"use client";
import { useState, useEffect } from "react";

export default function AddTopicForm() {
  const [caType, setCaType] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/getSubject")
      .then((res) => res.json())
      .then(setSubjects);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/addTopic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ca_type: caType,
        subjectId: Number(subjectId),
        name,
      }),
    });
    setCaType("");
    setSubjectId("");
    setName("");
    alert("Topic added!");
  };

  // Filter subjects based on selected CA Type
  const filteredSubjects = subjects.filter((s) => s.ca_type === caType);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Add New Topic
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
              setSubjectId(""); // reset subject if CA type changes
            }}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

        {/* Subject Select (only enabled when CA type is chosen) */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Select Subject
          </label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full border border-gray-300 text-gray-900 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

        {/* Topic Name */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Topic Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter topic name"
            className="w-full border border-gray-300 text-gray-900 placeholder-gray-500 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            disabled={!subjectId}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          disabled={!name || !subjectId || !caType}
        >
          Add Topic
        </button>
      </form>
    </div>
  );
}

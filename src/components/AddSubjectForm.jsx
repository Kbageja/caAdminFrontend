"use client";
import { useState } from "react";

export default function AddSubjectForm() {
  const [caType, setCaType] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/addSubject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ca_type: caType, name }),
    });
    setCaType("");
    setName("");
    alert("Subject added!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white shadow-lg rounded-2xl p-6 space-y-6 border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Add New Subject
        </h2>

        {/* CA Type Select */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Select CA Type
          </label>
          <select
            value={caType}
            onChange={(e) => setCaType(e.target.value)}
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

        {/* Subject Name */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">
            Subject Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter subject name"
            className="w-full border border-gray-300 text-gray-900 placeholder-gray-500 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Add Subject
        </button>
      </form>
    </div>
  );
}

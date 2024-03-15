import React, { useState } from "react";

interface NameInputProps {
  setName: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ setName }) => {
  const [inputName, setInputName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName(inputName.trim());
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-md">
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameInput;

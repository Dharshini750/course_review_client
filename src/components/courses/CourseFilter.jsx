import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const CourseFilter = ({ onFilterChange, departments, instructors }) => {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [instructor, setInstructor] = useState('');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange({ search, department, instructor, difficulty });
    }, 300);

    return () => clearTimeout(handler);
  }, [search, department, instructor, difficulty, onFilterChange]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses, codes, or instructors..."
            className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-3">
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Instructors</option>
          {instructors.map((inst) => (
            <option key={inst} value={inst}>
              {inst}
            </option>
          ))}
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Any Difficulty</option>
          <option value="1">Very Easy</option>
          <option value="2">Easy</option>
          <option value="3">Moderate</option>
          <option value="4">Difficult</option>
          <option value="5">Very Difficult</option>
        </select>
      </div>
    </div>
  );
};

export default CourseFilter;

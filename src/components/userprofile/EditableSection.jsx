import React from 'react';

const EditableSection = ({ label, value, onChange, isEditing, type = "text", icon: Icon }) => (
  <div className="mb-6 flex items-center">
    <Icon className="mr-4 text-gray-500" />
    <div className="flex-1">
      <label className="block text-gray-700 font-medium">{label}</label>
      {isEditing ? (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="mt-2 w-full p-2 border border-gray-300 rounded"
        />
      ) : (
        <p className="mt-2 text-gray-800">{value || "Not provided"}</p>
      )}
    </div>
  </div>
);

export default EditableSection;

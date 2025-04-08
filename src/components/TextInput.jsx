import React from "react";

function TextInput({
  icon,
  id = "textinput",
  label,
  placeholder,
  state,
  setState,
  type = "text",
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          for="email-address-icon"
          className="block    mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="relative bg-white flex-1 ">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          value={state}
          onChange={(e) => setState(e.target.value)}
          type={type}
          className="bg-gray-50   border-[1.5px] text-gray-900 text-sm  block w-full pl-10 p-2.5 py-3 rounded-xl "
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default TextInput;

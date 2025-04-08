import React from "react";

function Selector({ list, forWhat, label, state, setState }) {
  return (
    <>
      <label
        htmlFor={forWhat}
        className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        name={forWhat}
        value={state}
        onChange={(e) => setState(e.target.value)}
        id={forWhat}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {list?.map((option, key) => (
          <option key={key} value={option.title}>
            {option.title}
          </option>
        ))}
      </select>
    </>
  );
}

export default Selector;

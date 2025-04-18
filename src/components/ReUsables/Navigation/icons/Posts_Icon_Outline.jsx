import React from "react";

function Posts_Icon_Outline({ size, color }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.874 9C18.7897 8.61275 18.649 8.32059 18.4142 8.08579C17.8284 7.5 16.8856 7.5 15 7.5H9C7.11438 7.5 6.17157 7.5 5.58579 8.08579C5 8.67157 5 9.61438 5 11.5V12.5C5 14.3856 5 15.3284 5.58579 15.9142C6.17157 16.5 7.11438 16.5 9 16.5H15C16.8856 16.5 17.8284 16.5 18.4142 15.9142C18.9458 15.3827 18.995 14.5572 18.9995 13"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M19 2V2.5C19 3.88071 17.8807 5 16.5 5H7.5C6.11929 5 5 3.88071 5 2.5V2"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M19 22V21.5C19 20.1193 17.8807 19 16.5 19H7.5C6.11929 19 5 20.1193 5 21.5V22"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default Posts_Icon_Outline;

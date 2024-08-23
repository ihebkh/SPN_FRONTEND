import React from 'react';

/**
 * Renders a cross icon.
 * @param className Class name for the SVG element.
 * @returns SVG element.
 */
function XIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 512.02 512.02"
      className={className}
    >
      <g>
        <path
          d="M468.214,512.02c-11.208,0-22.408-4.28-30.96-12.832L12.838,74.756
		c-17.104-17.104-17.104-44.84,0-61.928c17.104-17.104,44.816-17.104,61.928,0L499.182,437.26c17.104,17.104,17.104,44.84,0,61.928
		C490.622,507.74,479.414,512.02,468.214,512.02z"
        />
        <path
          d="M43.798,512.02c-11.208,0-22.408-4.28-30.96-12.832c-17.104-17.088-17.104-44.816,0-61.928
		L437.254,12.836c17.104-17.104,44.816-17.104,61.928,0c17.104,17.088,17.104,44.816,0,61.928L74.758,499.188
		C66.206,507.74,55.006,512.02,43.798,512.02z"
        />
      </g>
    </svg>
  );
}

export default XIcon;

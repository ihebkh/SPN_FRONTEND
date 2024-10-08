/**
 * Generates a JSX element for an empty star icon.
 *
 * @param {string} className - optional class name for the SVG element
 * @return {React.JSX.Element} the SVG element representing an empty star icon
 */
function EmptyStarIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="relative">
      <path d="m510.8 196.51c-3.16-9.79-12.22-16.36-22.56-16.36l-154.81.31c-3.46 0-6.27-2.05-7.33-5.35l-47.57-147.32c-3.21-9.98-12.06-16.42-22.55-16.42-10.47 0-19.31 6.45-22.52 16.42l-47.56 147.33c-1.06 3.29-3.87 5.34-7.31 5.34l-154.84-.31c-10.32 0-19.38 6.58-22.54 16.34-3.2 9.82.27 20.49 8.64 26.53l125.39 90.73c2.82 2.05 3.9 5.37 2.83 8.65l-48.14 147.14c-3.22 9.82.25 20.47 8.58 26.49 8.34 6.1 19.55 6.1 27.88 0l125.06-91.24c2.81-2.04 6.3-2.04 9.1-.01l125.06 91.24c4.17 3.05 9.07 4.58 13.96 4.58 4.88 0 9.75-1.52 13.9-4.55 8.37-6.04 11.83-16.7 8.61-26.51l-48.14-147.14c-1.07-3.29.01-6.61 2.81-8.65l125.4-90.73c8.37-6.05 11.85-16.71 8.65-26.51zm-18.02 13.56-125.42 90.75c-8.49 6.17-11.87 16.59-8.62 26.55l48.13 147.15c1.07 3.28.01 6.56-2.82 8.6-2.78 2.03-6.24 2.03-9.02 0l-125.07-91.25c-4.24-3.08-9.1-4.62-13.95-4.62-4.86 0-9.72 1.54-13.97 4.63l-125.07 91.25c-2.78 2.03-6.24 2.03-9.06-.03-2.79-2.01-3.85-5.3-2.78-8.58l48.13-147.15c3.25-9.95-.14-20.37-8.64-26.56l-125.41-90.75c-2.8-2.02-3.88-5.33-2.8-8.64 1.06-3.27 3.87-5.29 7.32-5.29l154.84.31c10.32 0 19.38-6.6 22.55-16.42l47.57-147.32c1.06-3.29 3.86-5.34 7.3-5.34 3.46 0 6.27 2.05 7.33 5.34v.01l47.56 147.31c3.16 9.83 12.22 16.43 22.56 16.43l154.81-.31c3.47 0 6.28 2.03 7.34 5.31 1.08 3.28 0 6.59-2.81 8.62z" />
    </svg>
  );
}

export default EmptyStarIcon;

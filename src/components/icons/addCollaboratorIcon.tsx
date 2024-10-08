/**
 * Renders an SVG icon for adding a collaborator.
 *
 * @param {string} className - Optional class name for the SVG element.
 * @return {React.JSX.Element} The SVG icon component.
 */
function AddCollaboratorIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg className={className} viewBox="0 0 32 32">
      <path d="m28 22.5h-3.5v-3.5a1 1 0 0 0 -2 0v3.5h-3.5a1 1 0 0 0 0 2h3.5v3.5a1 1 0 0 0 2 0v-3.5h3.5a1 1 0 0 0 0-2z" />
      <path d="m16 29h-10a1 1 0 0 1 -1-1 11.013 11.013 0 0 1 11-11 8.025 8.025 0 1 0 -4.289-1.258 13.012 13.012 0 0 0 -8.711 12.258 3 3 0 0 0 3 3h10a1 1 0 0 0 0-2zm-6-20a6 6 0 1 1 6 6 6.006 6.006 0 0 1 -6-6z" />
    </svg>
  );
}

export default AddCollaboratorIcon;

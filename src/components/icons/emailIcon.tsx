/**
 * Generates an Email icon as an SVG element with an optional class name.
 *
 * @param {string} className - an optional class name for the SVG element
 * @return {React.JSX.Element} the Email icon as an SVG element
 */
function EmailIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 512 512" className={className}>
      <g>
        <path
          d="M454.4,90.667H54.613C20.907,90.667,0,110.293,0,141.76v228.373c0,30.613,21.333,51.2,53.12,51.2H454.4
			c32.853,0,57.6-21.973,57.6-51.2V141.76C512,110.72,489.387,90.667,454.4,90.667z M54.72,112H454.4
			c5.973,0,16.427,1.067,24.533,6.4l-214.08,172.16L32.427,117.653C37.867,114.027,45.227,112,54.72,112z M490.667,370.133
			c0,19.627-18.24,29.867-36.267,29.867H53.12c-19.947,0-31.787-11.2-31.787-29.867V141.76c0-1.813,0.213-3.733,0.427-5.547
			l237.013,176.32c3.947,2.88,9.28,2.773,13.013-0.213l218.24-175.467c0.32,1.6,0.533,3.307,0.64,5.013L490.667,370.133z"
        />
      </g>
    </svg>
  );
}

export default EmailIcon;

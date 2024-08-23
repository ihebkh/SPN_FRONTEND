/**
 * Renders an eye icon as an SVG element.
 *
 * @param {string} className - Optional class name for the SVG element.
 * @return {React.JSX.Element} The eye icon as an SVG element.
 */
function EyeIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipRule="evenodd" fillRule="evenodd">
        <path d="m4.71971 10.9697c2.35037-2.3504 6.03089-4.7197 11.28029-4.7197 5.2495 0 8.93 2.3693 11.2804 4.7197 1.173 1.173 2.0192 2.3447 2.5731 3.2244.2773.4405.4824.8095.6195 1.0712.0686.1309.1202.2351.1554.3083.0176.0365.0311.0653.0406.0858l.0112.0245.0034.0074.0011.0024.0004.001c.0001.0004.0003.0007-.6851.3053.6854.3046.6852.3049.6851.3053l-.0004.001-.0011.0024-.0034.0074-.0112.0245c-.0095.0205-.023.0493-.0406.0858-.0352.0732-.0868.1774-.1554.3083-.1371.2617-.3422.6307-.6195 1.0712-.5539.8797-1.4001 2.0514-2.5731 3.2244-2.3504 2.3504-6.0309 4.7197-11.2804 4.7197-5.2494 0-8.92992-2.3693-11.28029-4.7197-1.17302-1.173-2.01919-2.3447-2.57309-3.2244-.27732-.4405-.48245-.8095-.61954-1.0712-.06858-.1309-.12021-.2351-.15542-.3083-.01761-.0365-.03112-.0653-.04059-.0858l-.01119-.0245-.00335-.0074-.00111-.0024-.00041-.001c-.00017-.0004-.00032-.0007.68503-.3053-.68535-.3046-.6852-.3049-.68503-.3053l.00041-.001.00111-.0024.00335-.0074.01119-.0245c.00947-.0205.02298-.0493.04059-.0858.03521-.0732.08684-.1774.15542-.3083.13709-.2617.34222-.6307.61954-1.0712.5539-.8797 1.40007-2.0514 2.57309-3.2244zm-2.71967 5.0303-.68503-.3053c-.08619.1939-.08619.4167 0 .6106zm.83561 0c.00651.0126.01323.0255.02017.0387.12072.2305.30622.5646.56015.9679.50859.8078 1.28742 1.8861 2.3644 2.9631 2.14964 2.1496 5.46913 4.2803 10.21963 4.2803 4.7506 0 8.0701-2.1307 10.2197-4.2803 1.077-1.077 1.8558-2.1553 2.3644-2.9631.2539-.4033.4394-.7374.5602-.9679.0069-.0132.0136-.0261.0201-.0387-.0065-.0126-.0132-.0255-.0201-.0387-.1208-.2305-.3063-.5646-.5602-.9679-.5086-.8078-1.2874-1.8861-2.3644-2.9631-2.1496-2.1496-5.4691-4.2803-10.2197-4.2803-4.7505 0-8.06999 2.1307-10.21963 4.2803-1.07698 1.077-1.85581 2.1553-2.3644 2.9631-.25393.4033-.43943.7374-.56015.9679-.00694.0132-.01366.0261-.02017.0387zm27.16435 0 .6851.3053c.0862-.1939.0862-.4167 0-.6106zm-.6849.3055c0 .0001 0 .0001 0 0z" />
        <path d="m16 11.75c-2.3472 0-4.25 1.9028-4.25 4.25s1.9028 4.25 4.25 4.25c2.3473 0 4.25-1.9028 4.25-4.25s-1.9027-4.25-4.25-4.25zm-5.75 4.25c0-3.1756 2.5744-5.75 5.75-5.75 3.1757 0 5.75 2.5744 5.75 5.75s-2.5743 5.75-5.75 5.75c-3.1756 0-5.75-2.5744-5.75-5.75z" />
      </g>
    </svg>
  );
}

export default EyeIcon;

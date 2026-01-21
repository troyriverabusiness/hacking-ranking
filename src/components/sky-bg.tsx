export function SkyBackground() {
  return (
    <div className="absolute inset-0 min-h-screen -z-10 overflow-hidden pointer-events-none">
      {/* Sky gradient - light blue to slightly darker blue */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500" />

      {/* Clouds */}
      <svg className="absolute top-0 left-0 w-full h-screen" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="cloud-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Cloud 1 - top left */}
        <g filter="url(#cloud-blur)" opacity="0.7">
          <ellipse cx="15%" cy="15%" rx="80" ry="40" fill="white" />
          <ellipse cx="13%" cy="16%" rx="60" ry="35" fill="white" />
          <ellipse cx="17%" cy="16%" rx="70" ry="38" fill="white" />
        </g>

        {/* Cloud 2 - top center */}
        <g filter="url(#cloud-blur)" opacity="0.6">
          <ellipse cx="45%" cy="20%" rx="90" ry="45" fill="white" />
          <ellipse cx="43%" cy="21%" rx="65" ry="40" fill="white" />
          <ellipse cx="47%" cy="21%" rx="75" ry="42" fill="white" />
        </g>

        {/* Cloud 3 - top right */}
        <g filter="url(#cloud-blur)" opacity="0.65">
          <ellipse cx="75%" cy="12%" rx="85" ry="42" fill="white" />
          <ellipse cx="73%" cy="13%" rx="62" ry="38" fill="white" />
          <ellipse cx="77%" cy="13%" rx="72" ry="40" fill="white" />
        </g>

        {/* Cloud 4 - middle left */}
        <g filter="url(#cloud-blur)" opacity="0.5">
          <ellipse cx="25%" cy="35%" rx="75" ry="38" fill="white" />
          <ellipse cx="23%" cy="36%" rx="55" ry="33" fill="white" />
          <ellipse cx="27%" cy="36%" rx="65" ry="35" fill="white" />
        </g>

        {/* Cloud 5 - middle right */}
        <g filter="url(#cloud-blur)" opacity="0.55">
          <ellipse cx="65%" cy="30%" rx="80" ry="40" fill="white" />
          <ellipse cx="63%" cy="31%" rx="58" ry="35" fill="white" />
          <ellipse cx="67%" cy="31%" rx="68" ry="37" fill="white" />
        </g>
      </svg>

      {/* Green hills at the bottom */}
      <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        {/* Back hill - darker green */}
        <path
          d="M0,160 Q360,80 720,160 T1440,160 L1440,320 L0,320 Z"
          fill="#22c55e"
          opacity="0.7"
        />

        {/* Front hill - brighter green */}
        <path
          d="M0,224 Q360,160 720,224 T1440,224 L1440,320 L0,320 Z"
          fill="#4ade80"
        />
      </svg>
    </div>
  );
}

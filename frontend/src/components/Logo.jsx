import React from 'react'

const Logo = ({w,h}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} viewBox="0 0 400 200">
      {/* Background Gradient */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#FF6F61", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#FFD54F", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill="url(#gradient)" rx="20" />

      {/* Text Styling */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="60"
        fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        fontWeight="bold"
        letterSpacing="5"
        dy=".3em"
      >
        Rishabh
      </text>

      {/* Decorative Line */}
      <line
        x1="50"
        y1="150"
        x2="350"
        y2="150"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeDasharray="10,5"
      />
    </svg>
  )
}

export default Logo
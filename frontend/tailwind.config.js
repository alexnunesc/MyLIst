/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // theme: {
  //   extend: {
  //     backgroundImage: {
  //       'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  //       'gradient-conic':
  //         'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  //     },
  //   },
  // },
  daisyui: {
    themes: [
      {
        themePrimary: {
        
          "primary": "#570df8",
                  
          "secondary": "#f000b8",
                  
          "accent": "#1dcdbc",
                  
          "neutral": "#2b3440",
                  
          "base-100": "#ffffff",
                  
          "info": "#3abff8",
                  
          "success": "#36d399",
                  
          "warning": "#fbbd23",
                  
          "error": "#f87272",
        },
      },
    ]
  },
  plugins: [require("daisyui")],
}

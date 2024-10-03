/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				background: {
				  DEFAULT: '#222831', 
				  secondary: '#393E46', 
				},
				text: {
				  DEFAULT: '#EEEEEE', 
				  secondary: '#B0B0B0', 
				},
				accent: {
				  DEFAULT: '#00ADB5', 
				  hover: '#009DA5',
				},
				opposed: {
					DEFAULT: '#FF2E63'
				}
			  },
			  fontFamily: {
				'fira': ['Fira Code', 'monospace'], 
			  },
		  },
	},
	plugins: [],
}


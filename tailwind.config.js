/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'

export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		flowbite.content()
	],
	theme: {
	},
	plugins: [
		flowbite.plugin()
	],
}


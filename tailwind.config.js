/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Poppins', 'sans-serif']
			},
			colors: {
				primary: "#222D68",
				secondary: "#fff",
				gray: "#9E9E9E",
				white: "#fff",
				black: "#000",
				orange: "#F29E51",
				primaryLight: "#F8F9FB",
				textGray : "#5B5B5B",
				danger : '#DF28260D',
                warning : '#DF2826',
                primaryGray :'#E9EAF0',
                // primaryLight :'#F8F9FB',
                // orange : '#F29E51',
                grey : '#5B5B5B',
                green : '#418C1D',


				//

				navbarItemHover: "#f4f4f7",
        background: "#f8f9fa",
        tableHead: "#fafafa",
        tableHeadText: "#9D9D9D",
        cardItemBg: "#f8f9fb",
        lightText: "#9d9d9d",
        primaryText: "#222d68",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			screens: {
				md: "820px", // You can define your own breakpoint here
				lg: "1024px"
			},
		},
	},
	plugins: [],
};

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    	colors: {
		  "yellow": {
		    "100": "#fffbf0",
		    "200": "#ffe9b3",
		    "300": "#ffd97a",
		    "400": "#ffc83d",
		    "500": "#ffb700",
		    "600": "#cc9200",
		    "700": "#996e00",
		    "800": "#664900",
		    "900": "#332500"
		  }
    	},
	    fontFamily: {
	      sans: [
	      	'Rubik',
	        'ui-sans-serif',
	        'system-ui',
	        '-apple-system',
	        'BlinkMacSystemFont',
	        '"Segoe UI"',
	        'Roboto',
	        '"Helvetica Neue"',
	        'Arial',
	        '"Noto Sans"',
	        'sans-serif',
	        '"Apple Color Emoji"',
	        '"Segoe UI Emoji"',
	        '"Segoe UI Symbol"',
	        '"Noto Color Emoji"',
	      ],
	      mono: [
	      	'Inconsolata',
	        'ui-monospace',
	        'SFMono-Regular',
	        'Menlo',
	        'Monaco',
	        'Consolas',
	        '"Liberation Mono"',
	        '"Courier New"',
	        'monospace',
	      ],
	  }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

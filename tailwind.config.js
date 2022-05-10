module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#00BBF5",
                secondary: "#424242",
                "secondary-light": "#707070"
            },
            fontFamily: {
                default: ['stratum']
            },
        },
    },
    variants:{
      extend: {
          backgroundColor : ['active'],
      }
    },

    plugins: [],
}

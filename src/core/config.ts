const serverURL = "https://expressjs-bookstore.azurewebsites.net";

const config = {
	URL: {
		REPOSITORY: `${serverURL}/api/admin`,
	},
	LSS: {
		AUTH_KEY: "authTokenSaved",
	},
};

export default config;

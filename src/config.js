const config = {
	dev: {
		firebase: {
			apiKey: 'AIzaSyATX0ETeHikDleJAhir-YQ4vrS_lvJZIxc',
			authDomain: 'hciproject-e2f47.firebaseapp.com',
			projectId: 'hciproject-e2f47',
			storageBucket: 'hciproject-e2f47.appspot.com',
		},
	},
	production: {
		firebase: {
			apiKey: 'AIzaSyATX0ETeHikDleJAhir-YQ4vrS_lvJZIxc',
			authDomain: 'hciproject-e2f47.firebaseapp.com',
			projectId: 'hciproject-e2f47',
			storageBucket: 'hciproject-e2f47.appspot.com',
		},
	},
};
const env = window.location.href.includes('localhost') ? 'dev' : 'production';

export default config[env];

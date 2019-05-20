const config = {
	dev: {
		firebase: {
			apiKey: 'AIzaSyATX0ETeHikDleJAhir-YQ4vrS_lvJZIxc',
			authDomain: 'hciproject-e2f47.firebaseapp.com',
			projectId: 'hciproject-e2f47',
			storageBucket: 'hciproject-e2f47.appspot.com',
		},
	},
	productions: {
		firebase: {
			apiKey: 'AIzaSyATX0ETeHikDleJAhir-YQ4vrS_lvJZIxc',
			authDomain: 'hciproject-e2f47.firebaseapp.com',
			projectId: 'hciproject-e2f47',
			storageBucket: 'hciproject-e2f47.appspot.com',
		},
	},
};
const env = window.location.href.includes('localhost') ? 'dev' : 'productions';

export default config[env];

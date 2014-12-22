
var global = {
	appname: "Example App",
	appslogan: "Edit me in the config.js file"
};


var cfg = {
	development: {
		db: {
			port: 59888,
			host: 'ds059888.mongolab.com',
			name: 'home-automation',
			user: 'ha',
			pass: '2ENeh4O19L',
			getConnStr: getConnStr
		},
		port: 3000,

		global: global
	},
	production: {
		db: {
			port: 59888,
			host: 'ds059888.mongolab.com',
			name: 'home-automation',
			user: 'ha',
			pass: '2ENeh4O19L',
			getConnStr: getConnStr
		},
		port: (process.env.PORT || 3000),
		global: global
	}
};

function getConnStr() {
	conn = "mongodb://"+this.user+":"+this.pass+"@"+this.host+":"+this.port+"/"+this.name;
	return conn;
}

env = process.env.NODE_ENV || 'development';
module.exports = cfg[env];
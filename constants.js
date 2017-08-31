function define(name, value){

	Object.defineProperty(exports, name, {

		value: value,
		enumerable: true
	});
}

define("host", "localhost");
define("username", "root");
define("password", "password_123");
define("database", "productcatalog");
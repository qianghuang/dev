var fs = require('fs');
console.log("sfs");
fs.readFile("./a.txt", "utf-8", function(err,data){
	console.log(data);
});

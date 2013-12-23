function loginUser(email, password) {
	var username = "tengwerda@gmail.com";
	var password = "waterfiets";

	$.post(globalData.rootDomain + 'users/login', {username: username, password: password}, function(res) {
	  console.log(res);
	});
}
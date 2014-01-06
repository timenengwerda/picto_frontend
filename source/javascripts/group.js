function getGroup(groupId, callback) {
	console.log(globalData.inDevelopment);
	if (globalData.inDevelopment) {
			var group = {
					"id":1,
					"name":"De groep",
					"clocktype":3,
					"background":"#ff0000",
					"created_at":"2013-12-28T08:59:02.989Z",
					"updated_at":"2014-01-01T14:47:56.941Z"
				}

				callback(group);
	} else {
		var groupUrl = globalData.rootDomain + 'groups/' + groupId + '.json';
		//Ajax call; Get doesnt work XSS
		$.ajax({
			url: groupUrl,
			crossdomain: true,
			dataType: "jsonp",
			success: function (group) {
				if (callback) {
					callback(group);
				}
			},
			fail: function () {
				if (callback) {
					callback(false);
				}
			}
		});
	}
}

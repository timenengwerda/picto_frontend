function getGroup(groupId, callback) {
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

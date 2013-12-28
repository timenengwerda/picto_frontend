function getActivitiesByClient(clientId, callback) {
	startPreloader();
	wipeActivityList();
	var clientUrl = globalData.rootDomain + 'clients/' + clientId + '/activities.json';
	$.ajax({
		url: clientUrl,
		crossdomain: true,
		dataType: "jsonp",
		success: function (client) {
			if (callback) {
				callback(client);
			}
		},
		fail: function () {
			if (callback) {
				callback(false);
			}
		}
	});
}


function getAllActivities(groupId, callback) {
	startPreloader();
	wipeActivityList();
	var activityUrl = globalData.rootDomain + 'groups/' + groupId + '/activities.json';
	//var clientUrl = globalData.rootDomain + 'clients/' + 1 + '/activities.json';
	$.ajax({
		url: activityUrl,
		crossdomain: true,
		dataType: "jsonp",
		success: function (act) {
			if (callback) {
				callback(act);
			}
		},
		fail: function () {
			if (callback) {
				callback(false);
			}
		}
	});
}
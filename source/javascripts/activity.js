function getActivitiesByClient(clientId, callback) {
	startPreloader();
	wipeActivityList();
	var clientUrl = globalData.rootDomain + 'clients/' + clientId + '/activities.json';
	$.ajax({
		url: clientUrl,
		crossdomain: true,
		dataType: "jsonp",
		done: function (activities) {
			if (callback) {
				callback(activities);
			}
		},
		fail: function () {
			if (callback) {
				callback(false);
			}
		}
	});
}


function getAllActivities(callback) {
	startPreloader();
	wipeActivityList();
	var activityUrl = globalData.rootDomain + 'activities.json';
	$.ajax({
		url: activityUrl,
		crossdomain: true,
		dataType: "jsonp",
		done: function (activities) {
			if (callback) {
				callback(activities);
			}
		},
		fail: function () {
			if (callback) {
				callback(false);
			}
		}
	});
}
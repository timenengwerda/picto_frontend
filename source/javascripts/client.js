/*function getClients(callback) {
	var clientUrl = globalData.rootDomain + 'clients.json';
	$.ajax({
		url: clientUrl,
		crossdomain: true,
		dataType: "jsonp",
		done: function (clients) {
			if (callback) {
				callback(clients);
			}
		},
		fail: function () {
			if (callback) {
				callback(false);
			}
		}
	});
}*/

function getClientsByGroup(groupId, callback) {
	var clientUrl = globalData.rootDomain + 'groups/' + groupId + '/clients.json';
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

function buildClientbar(clients) {
	var templateParent = $('.client_list');
	var theTemplate = templateParent.find('.template').eq(0);

	if (theTemplate.html() != 'undefined') {
		//Create an undordered list
		var list = $('<ul>');

		for (var i in clients) {

			//Create a list item for each client
			var clientItem = theTemplate.clone();

			//Create a link with #client-1 link which will be appended into the LI later
			clientItem.find('a.client_link').attr('id', clients[i].id);
			clientItem.find('a.client_link').attr('href', '#clients-' + clients[i].id);
			clientItem.find('a.client_link').click(function() {
				getActivitiesByClient($(this).attr('id'), function (response) {
					stopPreloader();
					buildAgenda(response);
				});
			});

			//Create (or use) a user image which will be appended into the link later
			if (clients[i].avatar_url.length > 0) {
				clientItem.find('img.client_list_avatar').attr('src', globalData.rootDomain + clients[i].avatar_url);
				clientItem.find('img.client_list_avatar').attr('title', clients[i].name);
			}

			clientItem.find('.client_name').html(clients[i].name);

			clientItem.removeClass('template');

			//Append the newly built LI to the list
			templateParent.append(clientItem);
		}
	}
}


function getClientsByGroup(groupId, callback) {
	if (globalData.inDevelopment) {
		callback([{"id":1,"name":"Timen","birthdate":"2013-12-28","background":"#ff0000","avatar_file_name":"XLU6BPy.png","avatar_content_type":"image/png","avatar_file_size":567875,"avatar_updated_at":"2013-12-28T09:01:46.812Z","group_id":1,"created_at":"2013-12-28T09:01:48.661Z","updated_at":"2013-12-28T09:01:48.661Z","avatar_url":"/system/clients/avatars/000/000/001/thumb/XLU6BPy.png?1388221306"},{"id":2,"name":"Poes","birthdate":"2013-12-28","background":"#ff0000","avatar_file_name":"rutger.jpg","avatar_content_type":"image/jpeg","avatar_file_size":35242,"avatar_updated_at":"2013-12-28T09:02:16.676Z","group_id":1,"created_at":"2013-12-28T09:02:18.156Z","updated_at":"2013-12-28T09:02:18.156Z","avatar_url":"/system/clients/avatars/000/000/002/thumb/rutger.jpg?1388221336"},{"id":3,"name":"Laurens","birthdate":"2013-12-29","background":"#ff0000","avatar_file_name":"laurens.jpg","avatar_content_type":"image/jpeg","avatar_file_size":100821,"avatar_updated_at":"2013-12-29T21:17:32.254Z","group_id":1,"created_at":"2013-12-29T21:17:35.400Z","updated_at":"2013-12-29T21:17:35.400Z","avatar_url":"/system/clients/avatars/000/000/003/thumb/laurens.jpg?1388351852"}]);
	} else {
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

}

function buildClientbar(clients) {
	var templateParent = $('.topbar .client_list');
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


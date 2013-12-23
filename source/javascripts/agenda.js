function buildAgenda(obj) {
	if (obj.length > 0) {
		$('.activity_list').height($(window).height() - $('.topbar').height());
		for (var o in obj) {
			//Loop through all the activities received one by one and build the activity and the userlist
			buildActivity(obj[o]);
		}

		//When the activities are built, align them
		alignActivities();
	}
}

function alignActivities() {
	$('.activity').width($('body').width());
	//Count the activities and widen the activity list container to the total width * amount
	var amountOfActivities = $('.activity').not('.template').length;

	$('.activity_list').width($('.activity').width() * amountOfActivities);
}

function buildUserlist(users, parentDiv) {
	if (users.length > 0) {
		//Get the parent template(On which to append the template to)
		var userTemplateParent = parentDiv.find('.user_list_for_activity');
		//Get the template that will be cloned
		var userTemplate = userTemplateParent.find('.template').eq(0);
		if (userTemplate.html() != "undefined") {
			//Loop for each user
			for (var i in users) {
				//Clone the template
				template = userTemplate.clone();

				//Add the avatar
				template.find('.user_list_avatar').attr('src', users[i].avatar);
				template.find('.user_list_avatar').attr('title', users[i].name);

				template.find('.user_name').html(users[i].name);

				//Remove the template class(This is used by CSS to hide)
				template.removeClass('template');

				//Prepend it to the parent
				userTemplateParent.prepend(template);
			}
		}
	}
}

function buildActivity(activity) {
	var activityTemplateParent = $('.activity_list');
	var activityTemplate = activityTemplateParent.find('.template').eq(0);
	if (activityTemplate.html() != "") {
		//Since this function is in a loop we dont have to loop the activities. There's always just one!
		var template = activityTemplate.clone();
		if (activity.activity.pictogram_url) {
			template.find('.item .pictogram_image').attr('src', globalData.rootDomain + activity.activity.pictogram_url);
		}
		template.find('.item .pictogram_image').attr('title', activity.activity.title);

		template.find('.item .activity_title').html(activity.activity.title);

		//Remove the template class(This is used by CSS to hide)
		template.removeClass('template');


		var digitalItemClock = setupClock(template.find('.item_time_digital'), 'digital', activity.start_date);
		var analogueItemClock = setupClock(template.find('.item_time_analogue'), 'analogue', activity.start_date);
		
		activityTemplateParent.append(template);
		//buildUserlist(activity.activity.users, template);
	}
}

function wipeActivityList() {
	$('.activity_list').children().not('.template').remove();
}
var firstActivityTime = null;
var secondActivityTime = null;
var activitiesArr = [];
var autoSlideInterval = null;
//Put all activity times in an array. When an activity is passed the currentActivityInArray is highered
//So the system can maintain that as the next 'to come' time
var activityTimes = [];
var currentActivityInArray = 0;
function buildAgenda(obj) {
	$('.activity_list').css('left', 0);
	activitiesArr = [];
	secondActivityTime = null;
	activityTimes = [];
	currentActivityInArray = 0;
	setTimeout(autoSlideInterval);
	autoSlideInterval = null;

	if (obj.length > 0) {
		$('.activity_list').height($(window).height() - $('.topbar').height());
		var count = 0;
		for (var o in obj) {
			//Save the activity IDs in an array to avoid duplicates
			if ($.inArray(obj[o].activity.id, activitiesArr) < 0) {
				activitiesArr.push(obj[o].activity.id);
				
				activityTimes.push(railsDateToTimestamp(obj[o].start_date));

				//Loop through all the activities received one by one and build the activity and the userlist
				buildActivity(obj[o]);
				count++;
			}
		}


		//When the activities are built, align them
		alignActivities();
	}
}

var isAnimatingSlider = false;

function alignActivities() {
	$('.activity').width($('body').width());
	//Count the activities and widen the activity list container to the total width * amount
	var amountOfActivities = $('.activity').not('.template').length;

	$('.activity_list').width($('.activity').width() * amountOfActivities);
   
	//Enable swiping...
	$(".activity_list").swipe( {
		//Generic swipe handler for all directions
		swipe:function(event, direction, distance, duration, fingerCount) {
			var maySwipe = true;
			var currentPos = $(this).offset().left;

			if (direction == 'left') {
				var positionToSwipeTo =  currentPos - $(this).find('.activity').width();

				//calculate the future pos; If that is lower(its minus) than the total width(in minus) than dont swipe
				var futurePos = (currentPos - $(this).find('.activity').width());
				if (futurePos == '-' + $(this).width()) {
					maySwipe = false;
				}

				//Reset the autoslider interval and set it after 10 seconds
				setTimeout(autoSlideInterval);
				autoSlideInterval = null

			} else if(direction == 'right') {
				var positionToSwipeTo =  currentPos + $(this).find('.activity').width();
				if ($(this).offset().left == 0) {
					maySwipe = false;
				}
			}

			if (maySwipe && !isAnimatingSlider) {
				isAnimatingSlider = true;
				$(this).animate({
					left: positionToSwipeTo
				}, 800, function () {
					isAnimatingSlider = false;
				});
			}
		}, threshold: 125
	});

	slideAuto();
	autoSlideInterval = setInterval(function() {
		slideAuto();
	}, 4000);
}

function slideAuto() {
	var maySwipe = true;
	var currentPos = $('.activity_list').offset().left;
	var now = new Date().getTime();
	//If the currentTime is higher than the first item and the 2nd activity time is lower than now, slide it
	if (now > activityTimes[currentActivityInArray]) {
		currentActivityInArray++;
		var positionToSwipeTo =  currentPos - $('.activity').first().width();

		//calculate the future pos; If that is lower(its minus) than the total width(in minus) than dont swipe
		var futurePos = (currentPos - $('.activity').first().width());
		if (futurePos == '-' + $('.activity_list').width()) {
			maySwipe = false;
		}

		if (maySwipe && !isAnimatingSlider) {
			isAnimatingSlider = true;
			$('.activity_list').animate({
				left: positionToSwipeTo
			}, 800, function () {
				isAnimatingSlider = false;
			});
		}

	}
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
	activityTemplateParent.css('left', 0);
	if (activityTemplate.html() != "") {
		
		//Since this function is in a loop we dont have to loop the activities. There's always just one!
		var template = activityTemplate.clone();
		if (activity.activity.pictogram_url_medium) {
			template.find('.item .pictogram_image').attr('src', globalData.rootDomain + activity.activity.pictogram_url_medium);
		}
		template.find('.item .pictogram_image').attr('title', activity.activity.title);

		template.find('.item .activity_title').html(activity.activity.title);

		//Remove the template class(This is used by CSS to hide)
		template.removeClass('template');


		//var digitalItemClock = setupClock(template.find('.item_time_digital'), 'digital', activity.start_date);
		//var analogueItemClock = setupClock(template.find('.item_time_analogue'), 'analogue', activity.start_date);
		//Digital clock
		if (groupOptions.clocktype == 1) {
			var digitalItemClock = setupClock(template.find('.item_time_digital'), 'digital', activity.start_date);
		}

		//analogue clock
		if (groupOptions.clocktype == 2) {
			var analogueItemClock = setupClock(template.find('.item_time_analogue'), 'analogue', activity.start_date);
		}

		//both clocks
		if (groupOptions.clocktype == 3) {
			var digitalItemClock = setupClock(template.find('.item_time_digital'), 'digital', activity.start_date);
			var analogueItemClock = setupClock(template.find('.item_time_analogue'), 'analogue', activity.start_date);
	}
		
		activityTemplateParent.append(template);
		//buildUserlist(activity.activity.users, template);
	}
}

function wipeActivityList() {
	$('.activity_list').children().not('.template').remove();
}
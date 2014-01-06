var firstActivityTime = null;
var secondActivityTime = null;
var activitiesArr = [];
var autoSlideInterval = null;
//Put all activity times in an array. When an activity is passed the currentActivityInArray is highered
//So the system can maintain that as the next 'to come' time
var activityTimes = [];
var currentActivityInArray = 0;
var hasAlerted = false;
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
			hasAlerted = false;
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
				currentActivityInArray--;

			} else if(direction == 'right') {
				var positionToSwipeTo =  currentPos + $(this).find('.activity').width();
				if ($(this).offset().left == 0) {
					maySwipe = false;
				}

				currentActivityInArray++;
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

var alertSound = new Audio('alert.mp3');

function slideAuto() {
	var maySwipe = true;

	var currentPos = $('.activity_list').offset().left;
	var now = new Date().getTime();

	//Leave the slide for 5 minutes longer than the current time. The activity for 12:00 slides at 12:05
	//If the currentTimeis higher than the first item(+5 minutes) and the 2nd activity time is lower than now, slide it
	if (now > (activityTimes[currentActivityInArray] + (5*60000))) {
		hasAlerted = false;
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
	} else {
		//The alert is in the ELSE to prevent it from alert when the first activity(when refreshing for example) gets slid right away
		//5 minutes in the past
		var alertTime = now + (5*60000);
		if (alertTime > activityTimes[currentActivityInArray] && !hasAlerted) {
			
			alertSound.play();
			var to = setTimeout(function (){
				alertSound.pause();
				hasAlerted = true;
			}, 6500);
		}
	}
}

function buildUserlist(users, parentDiv) {
	parentDiv.find('.client_list_for_activity .client_list').html('');
	for (var i in users) {
		//console.log(users[i]);
		if (users[i] != 'undefined') {
			var tmplate = $('.topbar .client_list').find('#'+ users[i].id);
			//console.log(tmplate);
			parentDiv.find('.client_list_for_activity .client_list').append('<li>' + tmplate.parent('li').html()+'</li>');
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

		buildUserlist(activity.client, template);
	}
}

function wipeActivityList() {
	$('.activity_list').children().not('.template').remove();
}
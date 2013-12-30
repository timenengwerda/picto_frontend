var Test = null;
var loggedIn = null
var currentGroup = 1;

var clientsTop = null;
var clientsSliderTimeout = null;
$(document).ready(function() {
	//loginUser(1, 2);
	//Test = new testObject();
	globalData = new globalData()
	globalData.inDevelopment = false;
	if (!globalData.inDevelopment) {

		getGroup(currentGroup, function(groupOptions) {
			initPage(groupOptions);
		});
	}

	$('.color').click(function (){
		$('body').css('background', $(this).css('background'));
		$('.picker').fadeOut('fast');
	});

	$('.colorpickButton').click(function (){
		$('.picker').fadeIn('fast');
	});

	$('.closepicker, .container').click(function (){
		$('.picker').fadeOut('fast');
	});

	$('.toggleClients').click(function () {
		clearTimeout(clientsSliderTimeout);
		clientsSliderTimeout = null;
		var currentTop = $(this).parent().css('top');
		if (clientsTop == null) {
			clientsTop = currentTop;
		}
		var newTop = clientsTop;

		if (currentTop.substr(0, 1) == '-') {
			newTop = 0;
			//if the newtop its in screen. Push it back up automatically after a few seconds
			clientsSliderTimeout = setTimeout($.proxy(function() {
				$(this).parent().animate({
					top: clientsTop
				}, 500);
			}, this), 6000);
		}

		$(this).parent().animate({
			top: newTop
		}, 500);
	});

	$('.client_link_all').click(function () {
		getAllActivities(currentGroup, function(activities) {
			stopPreloader();
			buildAgenda(activities);
		});
	});

	//refresh activities every 60 minutes accordingly(For a client if #client-1 or all if no hashtag or #all)
	setInterval(function() {
		var hash = window.location.hash;
		if (hash != "" && hash != '#all') {
			getActivitiesByClient(hash.substr(9, hash.length), function (response) {
				stopPreloader();
				buildAgenda(response);
			});
		} else {
			getAllActivities(currentGroup, function(activities) {
				stopPreloader();
				buildAgenda(activities);
			});
		}
	}, 3600000);

	animateUnderlay();
	setColorPickerWidth();
});

function setColorPickerWidth() {
	$('.picker').height($('.picker').width());

	var colorWidthHeight = $('.picker').width()*0.17;
	$('.color').height(colorWidthHeight);
	$('.color').width(colorWidthHeight);
}

var fadeSpeed = 10000;
var underlayDegrees = 0
function animateUnderlay () {
	setTimeout(function() {
		underlayFadeOut()
	}, 1000);
}

function underlayFadeOut () {
	$('.underlay').fadeOut(fadeSpeed, function(){
		underlayDegrees = (underlayDegrees == 180) ? 0 : 180;
		$('.underlay').css({ transform: 'rotate(' + underlayDegrees + 'deg)'});
		setTimeout(function() {
			underlayFadeIn()
		}, 1000);
	});
}

function underlayFadeIn () {
	$('.underlay').fadeIn(fadeSpeed, function(){
		underlayFadeOut()
	});
}

var groupOptions = null
function initPage(options) {
	groupOptions = options;
	startPreloader();
	//define the height of the activities_holder div ( 100% minus the topbar)
	$('.activities_holder').height($('body').height() - $('.topbar').innerHeight());

	//Digital clock
	if (groupOptions.clocktype == 1) {
		currentTimeClock = setupClock($('.current_time_digital'), 'digital');
	}

	//analogue clock
	if (groupOptions.clocktype == 2) {
		currentAnalogueClock = setupClock($('.current_time_analogue'), 'analogue');
	}

	//both clocks
	if (groupOptions.clocktype == 3) {
		currentTimeClock = setupClock($('.current_time_digital'), 'digital');
		currentAnalogueClock = setupClock($('.current_time_analogue'), 'analogue');
	}

	var bgColor = (groupOptions.background != "") ? groupOptions.background : '#ffffff';

	$('body').css('background-color', bgColor);
	getClientsByGroup(groupOptions.id, function(clients) {
		stopPreloader();
		if (clients != null) {
			buildClientbar(clients);
		} else {
			alert('geen clienten');
		}
	});
	
	getAllActivities(currentGroup, function(activities) {
		stopPreloader();
		buildAgenda(activities);
	});
}

function startPreloader() {
	$('.preloader').show();
}

function stopPreloader() {
	$('.preloader').hide();
}
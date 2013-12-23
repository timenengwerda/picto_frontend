var Test = null;
var loggedIn = null
var currentGroup = 1;
$(document).ready(function() {
	//loginUser(1, 2);
	//Test = new testObject();
	globalData = new globalData()
	globalData.inDevelopment = false;
	if (!globalData.inDevelopment) {

		getGroup(currentGroup, function(groupOptions) {
			initPage(groupOptions);
		});

		
/*
		

		getAllActivities(function(response) {
			stopPreloader();
			buildAgenda(response);
		});*/
	}
});

function initPage(options) {
	//Digital clock
	if (options.clocktype == 1) {
		currentTimeClock = setupClock($('.current_time_digital'), 'digital');
	}

	//analogue clock
	if (options.clocktype == 2) {
		currentAnalogueClock = setupClock($('.current_time_analogue'), 'analogue');
	}

	//both clocks
	if (options.clocktype == 3) {
		currentTimeClock = setupClock($('.current_time_digital'), 'digital');
		currentAnalogueClock = setupClock($('.current_time_analogue'), 'analogue');
	}

	var bgColor = (options.background != "") ? options.background : '#ffffff';

	$('body').css('background-color', bgColor);
	getClientsByGroup(options.id, function(clients) {
		console.log(clients);
		if (clients != null) {
			buildClientbar(clients);
		}
		alert('geen clienten');
	});
}

function startPreloader() {
	$('.preloader').show();
}

function stopPreloader() {
	$('.preloader').hide();
}
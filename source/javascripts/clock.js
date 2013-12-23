function setupClock(theClockDiv, clockType, indicatedTime) {
	var clk = false;

	if (clockType == 'digital') {
		clk = new DigitalClock(theClockDiv);
	} else if (clockType == 'analogue') {
		clk = new AnalogueClock(theClockDiv);
	}

	var indiTime = (indicatedTime) ? indicatedTime : null;

	clk.prototype = new baseClock(indiTime);	
	clk.prototype.setCurrentTime();
	clk.prototype.startRechecker();
	clk.buildClock();

	if (!indicatedTime) {
		clk.startInterval();
	}

	return clk;
}

function DigitalClock(theDigitalClockParent) {
	this.interval = null;
	this.buildClock = function() {
		if (!this.digitalClockTemplate) {
			this.digitalClockParent = theDigitalClockParent;
			this.digitalClockTemplate = this.digitalClockParent.find('.template').clone();
		}

		if (this.digitalClockTemplate.html() != "") {
			this.digitalClockParent.append(this.digitalClockTemplate);
			this.digitalClockTemplate.removeClass('template');
		}

		this.digitalClockTemplate.find('.hour').html(this.prototype.addZero(this.prototype.hours));
		this.digitalClockTemplate.find('.minute').html(this.prototype.addZero(this.prototype.minutes));
		this.digitalClockTemplate.find('.second').html(this.prototype.addZero(this.prototype.seconds));
	}

	this.startInterval = function() {
		//Use a proxy in the setInterval to keep the scope of the object.
		this.interval = setInterval($.proxy(function() {
			//console.log(this);
			var newTime = this.prototype.updateClockTime();
			this.buildClock();
		}, this), 1000);
	}

	this.stopInterval = function() {
		window.clearInterval(this.interval);
		this.interval = null;
	}

}

function AnalogueClock(theAnalogueClockParent) {
	this.interval = null;
	this.buildClock = function() {
		if (!this.analogueClockTemplate) {
			this.analogueClockParent = theAnalogueClockParent;
			this.analogueClockTemplate = this.analogueClockParent.find('.template').clone();
		}

		if (this.analogueClockTemplate.html() != "") {
			this.analogueClockParent.append(this.analogueClockTemplate);
			this.analogueClockTemplate.removeClass('template');
		}

		var hourDegree = this.prototype.hours * 30 + (this.prototype.minutes / 2);
		var hourRotate = "rotate(" + hourDegree + "deg)";
		this.analogueClockTemplate.find('.hour').css({ "transform": hourRotate });

		var minuteDegree = this.prototype.minutes * 6;
		var minuteRotate = "rotate(" + minuteDegree + "deg)";
		this.analogueClockTemplate.find('.minute').css({ "transform": minuteRotate });

		var secondDegree = this.prototype.seconds * 6;
		var secondRotate = "rotate(" + secondDegree + "deg)";
		this.analogueClockTemplate.find('.second').css({ "transform": secondRotate });
	}

	this.startInterval = function() {
		//Use a proxy in the setInterval to keep the scope of the object.
		this.interval = setInterval($.proxy(function() {
			//console.log(this);
			var newTime = this.prototype.updateClockTime();
			this.buildClock();
		}, this), 1000);
	}

	this.stopInterval = function() {
		window.clearInterval(this.interval);
		this.interval = null;
	}
}

function baseClock(indicatedTime) {
	this.indicatedTime = indicatedTime;
	this.updateClockTime = function(hours, minutes, seconds) {
		//if the seconds are 59 the next tick should be 0(60 seconds to a minute)
		//If this is the case check if the minutes need to be highered(or reset) aswell
		//And if the minutes are reset to 0 check if the hours should be highered(or reset)
		if (this.seconds < 59) {
			this.seconds++;
		} else {
			this.seconds = 0;
			if (this.minutes < 59) {
				this.minutes++;
			} else {
				this.minutes = 0;
				if (this.hours < 23) {
					this.hours++;
				} else {
					this.hours = 0;
				}
			}
		}
	}

	this.setCurrentTime = function() {
		if (this.indicatedTime) {
			this.date = new Date(railsDateToTimestamp(this.indicatedTime));
		} else {
			this.date = new Date();
		}

		this.seconds = this.date.getSeconds();
		this.minutes = this.date.getMinutes();
		this.hours = this.date.getHours();
	}

	/*
	The setInterval for the startInterval is not really reliably when it comes to keeping track of the MS in real time.
	The startRechecker checks if the ongoing clock needs to adjustment. It rechecks approx every 40 seconds
	Although this setInterval isnt really reliable either. 
	*/
	this.startRechecker = function() {
		//Use a proxy in the setInterval to keep the scope of the object.
		this.recheckInterval = setInterval($.proxy(function() {
			if (!this.indicatedTime) {
				this.setCurrentTime();
			}
		}, this), 3000);
	}

	this.addZero = function (min_or_sec) {
		if (min_or_sec < 10){
			min_or_sec="0" + min_or_sec
		}

		return min_or_sec;
	}
}




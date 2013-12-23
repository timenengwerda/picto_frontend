function railsDateToTimestamp(date) {
	//The rails datetime is pretty messed up. 
	//So it's converted into a normal timestamp here. 
	//Rails datetime = 2013-09-25T14:30:00.000Z

	var d = new Date(date);
	//Compensate 2 hours because of UTC
	d.setHours(d.getHours()-2);

	//ToLocaleString gives a descent date time
	var newDate = d.toLocaleString();


	//The correct datetime has to be split into a date and a time
	dateTime = newDate.split(' ');
	newDate = dateTime[0].split("/");

	//reformat the date to yyyy, mm, dd hh:mm:ss
	var realDate = newDate[2] + ", " + newDate[1] + ", " + newDate[0] + " " + dateTime[1];

	//add an hour to the timestamp
	return new Date(realDate).getTime() + 3600000;
}

function getTimeDifference(x, y) {
	return Math.abs((x - y) / 1000);
}
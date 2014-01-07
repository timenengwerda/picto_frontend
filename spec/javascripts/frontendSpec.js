
describe("Frontend", function() {


	var group = {
		"id":1,
		"name":"De groep",
		"clocktype": 3,
		"background":"#ff0000",
		"created_at":"2013-12-28T08:59:02.989Z",
		"updated_at":"2014-01-01T14:47:56.941Z"
	}

	var clients = [{
		"id":1,
		"name":"Timen",
		"birthdate":"2013-12-28",
		"background":"#ff0000",
		"avatar_file_name":"XLU6BPy.png",
		"avatar_content_type":"image/png",
		"avatar_file_size":567875,
		"avatar_updated_at":"2013-12-28T09:01:46.812Z",
		"group_id":1,
		"created_at":"2013-12-28T09:01:48.661Z",
		"updated_at":"2013-12-28T09:01:48.661Z",
		"avatar_url":"/system/clients/avatars/000/000/001/thumb/XLU6BPy.png?1388221306"
	},{
		"id":2,
		"name":"Poes",
		"birthdate":"2013-12-28",
		"background":"#ff0000",
		"avatar_file_name":"rutger.jpg",
		"avatar_content_type":"image/jpeg",
		"avatar_file_size":35242,
		"avatar_updated_at":"2013-12-28T09:02:16.676Z",
		"group_id":1,
		"created_at":"2013-12-28T09:02:18.156Z",
		"updated_at":"2013-12-28T09:02:18.156Z",
		"avatar_url":"/system/clients/avatars/000/000/002/thumb/rutger.jpg?1388221336"
	},{
		"id":3,
		"name":"Laurens",
		"birthdate":"2013-12-29",
		"background":"#ff0000",
		"avatar_file_name":"laurens.jpg",
		"avatar_content_type":"image/jpeg",
		"avatar_file_size":100821,
		"avatar_updated_at":"2013-12-29T21:17:32.254Z",
		"group_id":1,
		"created_at":"2013-12-29T21:17:35.400Z",
		"updated_at":"2013-12-29T21:17:35.400Z",
		"avatar_url":"/system/clients/avatars/000/000/003/thumb/laurens.jpg?1388351852"
	}]

	var allActivities = [{"activity":{"id":8,"title":"Titeltje","group_id":1,"pictogram_file_name":"14.png","pictogram_content_type":"image/png","pictogram_file_size":3170,"pictogram_updated_at":"2014-01-06T08:06:41.696Z","url":"","created_at":"2014-01-06T08:06:44.458Z","updated_at":"2014-01-06T08:06:44.458Z","pictogram_url_medium":"/system/activities/pictograms/000/000/008/medium/14.png?1388995601"},"start_date":"2014-01-08T12:00:00.000Z","end_date":"2014-01-08T17:00:00.000Z","client":[{"id":1,"name":"Timen","birthdate":"2013-12-28","background":"#ff0000","avatar_file_name":"XLU6BPy.png","avatar_content_type":"image/png","avatar_file_size":567875,"avatar_updated_at":"2013-12-28T09:01:46.812Z","group_id":1,"created_at":"2013-12-28T09:01:48.661Z","updated_at":"2013-12-28T09:01:48.661Z"},{"id":2,"name":"Poes","birthdate":"2013-12-28","background":"#ff0000","avatar_file_name":"rutger.jpg","avatar_content_type":"image/jpeg","avatar_file_size":35242,"avatar_updated_at":"2013-12-28T09:02:16.676Z","group_id":1,"created_at":"2013-12-28T09:02:18.156Z","updated_at":"2013-12-28T09:02:18.156Z"}]},{"activity":{"id":8,"title":"Titeltje","group_id":1,"pictogram_file_name":"14.png","pictogram_content_type":"image/png","pictogram_file_size":3170,"pictogram_updated_at":"2014-01-06T08:06:41.696Z","url":"","created_at":"2014-01-06T08:06:44.458Z","updated_at":"2014-01-06T08:06:44.458Z","pictogram_url_medium":"/system/activities/pictograms/000/000/008/medium/14.png?1388995601"},"start_date":"2014-01-08T12:00:00.000Z","end_date":"2014-01-08T17:00:00.000Z","client":[{"id":1,"name":"Timen","birthdate":"2013-12-28","background":"#ff0000","avatar_file_name":"XLU6BPy.png","avatar_content_type":"image/png","avatar_file_size":567875,"avatar_updated_at":"2013-12-28T09:01:46.812Z","group_id":1,"created_at":"2013-12-28T09:01:48.661Z","updated_at":"2013-12-28T09:01:48.661Z"},{"id":2,"name":"Poes","birthdate":"2013-12-28","background":"#ff0000","avatar_file_name":"rutger.jpg","avatar_content_type":"image/jpeg","avatar_file_size":35242,"avatar_updated_at":"2013-12-28T09:02:16.676Z","group_id":1,"created_at":"2013-12-28T09:02:18.156Z","updated_at":"2013-12-28T09:02:18.156Z"}]}];

	beforeEach(function () {
		$('#HTMLReporter').css('background', '#fff')
		loadFixtures('frontend.html');
		
		initPage(group);
		buildClientbar(clients);

		stopPreloader();
		buildAgenda(allActivities);
	});

	it("should have red background", function () {
		expect($('body').css('background-color')).toBe('rgb(255, 0, 0)');
	});

	it("should have 3 clients", function() {
		expect(clients.length).toEqual(3);
	});

	it("first real client's name should be 'Timen'", function() {
		expect($('.client_list li:not(".template, .client_link_all") .client_name').html()).toEqual('Timen');
	});

	it("should have 2 activities", function() {
		expect(allActivities.length).toEqual(2);
	});

	it("should have a clientbar", function() {
		expect($('.clients')).toBe('article');
	});

	it("should have 5 client list items in clientbar", function() {
		expect($('.client_list li:not(".template, .client_link_all")').length).toEqual(5);
	});

	it("should have a timebar", function() {
		expect($('.timebar')).toBe('article');
	});

	it("Timebar should have an analogue clock", function() {
		expect($('.analogue_clock:not(".template")').html()).toBeDefined();
	});

	it("Timebar should have a digital clock", function() {
		expect($('.digital_clock:not(".template")').html()).toBeDefined();
	});

	it("activity_list should have an offset left", function (){
		expect($('.activity_list').offset().left).toBeDefined();
	});

	it("first activities client list should have 5 client list items", function() {
		expect($('.client_list').first().find('li').length).toEqual(5);
	});

	it("First activity title should be Titeltje", function(){
		expect($('.activity:not(".template")').first().find('.activity_title')).toBe('h1');
		expect($('.activity:not(".template")').first().find('.activity_title').html()).toBe('Titeltje');
	});

	it("First digital clock hour should be 12", function(){
		var element = $('.activity:not(".template")').first().find('.digital_clock:not(".template") .hour');
		expect(element).toBe('div');
		expect(element.html()).toEqual('12');
	});

	it("First digital clock minute should be 00", function(){
		var element = $('.activity:not(".template")').first().find('.digital_clock:not(".template") .minute');
		expect(element).toBe('div');
		expect(element.html()).toEqual('00');
	});

	it("First digital clock hour should be 00", function(){
		var element = $('.activity:not(".template")').first().find('.digital_clock:not(".template") .second');
		expect(element).toBe('div');
		expect(element.html()).toEqual('00');
	});

	it("activity list should be wiped except for the template", function (){
		expect($('.activity_list').children().length).toEqual(2);
		wipeActivityList();
		expect($('.activity_list').children().length).toEqual(1);
	});

	it("audio tag is present for alert", function (){
		expect(alertSound).toBe('audio');
	})
});
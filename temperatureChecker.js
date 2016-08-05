(function(){
	var request = require('request');
	var cheerio = require('cheerio');
	var colors = require('colors');
	
	var electronics = null; // set in Run
	var ROW_INDEX = 0;
		
	var calgaryUrl = 'https://www.wunderground.com/q/zmw:00000.1.71877';
	
	function CheckTemperature(callback) {
		console.log('Checking temperature.');

		request(calgaryUrl, function (error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
								
				var results = {};
				results.temperature = Number($('#curTemp .wx-data .wx-value').text());
				results.name = $('.city-nav-header').text().trim();
				
				console.log(colors.yellow(results.name + ': ') + results.temperature + '°C');
				
				if(callback != undefined)
					callback(results);
			} 
			else {
				console.log('Error getting temperature.'.red);
			}
		});
	}
	
	function DisplayResults(data) {
		var indicators = [-10, 0, 5, 10, 15, 20, 25, 30];		
		electronics.MatrixGraph(data.temperature, indicators, 35, 0);
	}
	
	function Run(hardware) {
		electronics = hardware;
		CheckTemperature(DisplayResults);
	}
	
	//CheckTemperature();
	
	exports.Run = Run;
	exports.Get = CheckTemperature;
})();
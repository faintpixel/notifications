(function(){
	var request = require('request');
	var cheerio = require('cheerio');
	var colors = require('colors');
	var util = require('util');
	
	var electronics = null; // set in Run
	var ROW_INDEX = 2;
		
	var baseUrl = 'http://www.marketwatch.com/investing/stock/';
	
	function CheckStock(symbol, callback) {
		console.log('Checking stock symbol '.grey + symbol.yellow);
		
		var url = baseUrl + symbol;
		request(url, function (error, response, body) {
			if (!error) {
				var $ = cheerio.load(body);
								
				var results = {};
				results.name = $('#instrumentname').text();
				results.value = Number($('.pricewrap .bgLast').text());
				results.change = $('.lastpricedetails .bgChange').text();
				
				console.log(util.format('%s: %s (%s)', colors.yellow(results.name).bold, colors.yellow(results.value).bold, results.change));
								
				if(callback != undefined)
					callback(results);
			} 
			else {
				console.log(colors.red('Error getting stock info for ' + symbol + '.'));
			}
		});
	}
	
	function Display(data) {
		var indicators = [0.05, 0.10, 0.2, 0.3, 0.4, 0.5, 0.7, 1];
		electronics.MatrixGraph(data.value, indicators, 2, 2);
	}
	
	function Run(hardware, symbol) {
		electronics = hardware;
		CheckStock(symbol, Display)
	}
	
	exports.Run = Run;
	exports.Get = CheckStock;
	//CheckStock('nrn', callbackTest);

})();
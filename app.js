(function(){
	electronics = require('./electronics');
	stockPriceChecker = require('./stockPriceChecker');
	temperatureChecker = require('./temperatureChecker');
	
	electronics.Initialize(InitializationComplete);
	
	function InitializationComplete() {
		temperatureChecker.Run(electronics);
		
		stockPriceChecker.Run(electronics, 'NRN');
		
		//temperatureChecker.Get(UpdateTemperature, 0);
		
		//stockPriceChecker.Get('NRN', UpdateStockPrice, 2);
		
		//stockPriceChecker.Get('MSFT', UpdateStockPrice, 2);
	};	
})();
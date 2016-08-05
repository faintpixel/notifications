(function(){
	electronics = require('./electronics');
	stockPriceChecker = require('./stockPriceChecker');
	temperatureChecker = require('./temperatureChecker');
	
	//electronics.Initialize(InitializationComplete);
	
	RunHeadless();
	
	function InitializationComplete() {
		temperatureChecker.Run(electronics);		
		stockPriceChecker.Run(electronics, 'NRN');
	};	
	
	function RunHeadless() {
		// this is just for testing/debugging while the hardware is not connected.
		stockPriceChecker.Get('NRN');
		//temperatureChecker.Get();
	}
})();
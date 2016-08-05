(function(){
	var five = require("johnny-five");
	
	var board = new five.Board();
	var components = {
		matrix: null
	};
	
	
	var matrixRowBlinkIntervals = [null, null, null, null, null, null, null, null]; // keeps the intervals used for blinking rows
	
	console.log('Initializing electronics.');
	
	Initialize();
	
	function Initialize(callback) {
		board.on("ready", function() {
			components.matrix = new five.Led.Matrix({
				pins: {
					data: 2,
					clock: 3,
					cs: 4
				},
				devices: 1
			});
			
			components.rgbLed = new five.Led.RGB({
				pins: {
					red: 5,
					green: 6,
					blue: 9
				}
			});
			
			this.repl.inject({
				matrix: components.matrix,
				rgbLed: components.rgbLed
			});
			
			console.log('Board initialization complete.');
			
			if(callback != undefined)
				callback();
		});
	};
	
	function GetMatrix() {
		return components.matrix;
	}
	
	function BlinkMatrixRow(rowIndex) {
		var setValue = components.matrix.row(rowIndex).memory[rowIndex];
		
		StopBlinkMatrixRow(rowIndex);
		
		matrixRowBlinkIntervals[rowIndex] = setInterval (function() { 
			var currentValue = components.matrix.row(rowIndex).memory[rowIndex];
			if(currentValue == setValue)
				components.matrix.row(rowIndex, "00000000");
			else
				components.matrix.row(rowIndex, setValue);
		}, 2000 );		
	}
	
	function StopBlinkMatrixRow(rowIndex) {
		if(matrixRowBlinkIntervals[rowIndex] != null)
			clearInterval(matrixRowBlinkIntervals[rowIndex]);
	}
	
	function MatrixGraph(value, indicators, blinkValue, rowIndex) {
		var row = "";
		for(var i = 0; i < 8; i++) {
			if(value >= indicators[i])
				row += "1";
			else
				row += "0";
		}

		electronics.StopBlinkMatrixRow(rowIndex);
		electronics.matrix().row(rowIndex, row);
		
		if(value > blinkValue)
			electronics.BlinkMatrixRow(rowIndex);
	}
	
	exports.Initialize = Initialize;
	exports.matrix = GetMatrix;
	exports.BlinkMatrixRow = BlinkMatrixRow;
	exports.StopBlinkMatrixRow = StopBlinkMatrixRow;
	exports.MatrixGraph = MatrixGraph;
})(); 


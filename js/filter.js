function loFilterMove(num) {
	var mouseDown = document.getElementById("loFilterOne").value;
	document.body.onmousedown = function() { 
		document.body.onmousemove = function() {
		 	var minValue = 40;
			var maxValue = context.sampleRate / 2;
 	  	  	var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
			if (num == 1) {
				idVal = document.getElementById("loFilterOne").value;
 				var multiplier = Math.pow(2, numberOfOctaves * ((idVal/100) - 1.0));
 				oneLoFilter.frequency.value = maxValue * multiplier;
			}
			if (num == 2) {
				idVal = document.getElementById("loFilterTwo").value;
 				var multiplier = Math.pow(2, numberOfOctaves * ((idVal/100) - 1.0));
 				twoLoFilter.frequency.value = maxValue * multiplier;
			}
 	   }
   }
}

function hiFilterMove(num) {
	var mouseDown = document.getElementById("loFilterOne").value;
	document.body.onmousedown = function() { 
		document.body.onmousemove = function() {
		 	var minValue = 40;
			var maxValue = context.sampleRate / 2;
 	  	  	var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
			if (num == 1) {
				idVal = document.getElementById("hiFilterOne").value;
 				var multiplier = Math.pow(2, numberOfOctaves * ((idVal/100) + 1.0));
 				oneHiFilter.frequency.value = maxValue * multiplier;
			}
			if (num == 2) {
				idVal = document.getElementById("hiFilterTwo").value;
 				var multiplier = Math.pow(2, numberOfOctaves * ((idVal/100) + 1.0));
 				twoHiFilter.frequency.value = maxValue * multiplier;
			}
 	   }
   }
}
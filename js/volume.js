function volMove(num) {
    var volume = "vol" + num;
	var mouseDown = document.getElementById(volume).value;
	document.body.onmousedown = function() { 
		document.body.onmousemove = function() { 
		  var x = document.getElementById(volume).value;
		  document.getElementById("v1").innerHTML = x;
		  if (num == 1) {gainNode1.gain.value = Math.cos((fadeVal/100) * 0.5*Math.PI) * masterVol * x / 10000;}
		  if (num == 2) {gainNode2.gain.value = Math.cos((1.0 - (fadeVal/100)) * 0.5*Math.PI) * masterVol * x / 10000;}
		}
	}
}
function masterVolume() {
	var mouseDown = document.getElementById("masterVolume").value;
	document.body.onmousedown = function() { 
		document.body.onmousemove = function() { 
	 	   masterVol = document.getElementById("masterVolume").value;
	 	   document.getElementById("v1").innerHTML = masterVol;
		   
		   var x = document.getElementById("vol1").value;
		   var y = document.getElementById("vol2").value;
			if(oneLoaded && twoLoaded) {
			   gainNode2.gain.value = Math.cos((1.0 - (fadeVal/100)) * 0.5*Math.PI) * masterVol * y / 10000;
			   gainNode1.gain.value = Math.cos((fadeVal/100) * 0.5*Math.PI) *  masterVol * x / 10000;
			   
	  		}
			else if (oneLoaded) {
				gainNode1.gain.value = Math.cos((1.0 - (fadeVal/100)) * 0.5*Math.PI) * masterVol * x / 10000;
				
			}
			else if (twoLoaded) {
				gainNode2.gain.value = Math.cos((fadeVal/100) * 0.5*Math.PI) *  masterVol * y / 10000;
				
			}
		}
	}
}


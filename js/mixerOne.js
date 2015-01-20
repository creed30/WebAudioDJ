function mixerOneMove() {
    if (!oneIsOscillator) {
	    document.getElementById("mixerOne").value = 50;
		var mouseDown = document.getElementById("mixerOne").value;
		document.body.onmousedown = function() { 
			document.body.onmousemove = function() { 
	    
			  var x = document.getElementById("mixerOne").value;
			  document.getElementById("demo1").innerHTML = x;
			  soundSource1.playbackRate.value = x / 51;
			}
		}
	
		document.body.onmouseup = function() { 
	    
		  var x = 50;
		  document.getElementById("demo1").value = 50;
		}
	
		document.body.onmouseout = function() { 
	    
		  var x = 50;
		  document.getElementById("demo1").value = 50;
		}	
	}
	else if (oneIsOscillator) {
	    document.getElementById("mixerOne").value = 50;
		var mouseDown = document.getElementById("mixerOne").value;
		document.body.onmousedown = function() { 
			document.body.onmousemove = function() { 
	    
			  var x = document.getElementById("mixerOne").value;
			  document.getElementById("demo1").innerHTML = x;
			  soundSource1.frequency.value = x * 10;
			}
		}
	
		document.body.onmouseup = function() { 
	    
		  var x = 50;
		  document.getElementById("demo1").value = 50;
		}
	
		document.body.onmouseout = function() { 
	    
		  var x = 50;
		  document.getElementById("demo1").value = 50;
		}	
	}
}

function fillFirstOscillator() {
	document.getElementById("firstTrack").innerHTML = "";
	
	var options = ["Sin", "Square", "Sawtooth", "Triangle"];     
	var sel = document.getElementById('firstTrack');
	
	for(var i = 0; i < options.length; i++) {
	    var opt = document.createElement('option');
	    opt.innerHTML = options[i];
	    opt.value = i;
	    sel.appendChild(opt);
	}
}



function fillFirstTrack() {
	document.getElementById("firstTrack").innerHTML = "";
	
	var options = ["luke", "letsGo", "monkey", "yeah"];     
	var sel = document.getElementById('firstTrack');
	
	for(var i = 0; i < options.length; i++) {
	    var opt = document.createElement('option');
	    opt.innerHTML = options[i];
	    opt.value = "sound/" + options[i] + ".wav";
	    sel.appendChild(opt);
	}
	
}
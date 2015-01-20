function mixerTwoMove() {
    if (!twoIsOscillator) {
	    document.getElementById("mixerTwo").value = 50;
		var mouseDown = document.getElementById("mixerTwo").value;
		document.body.onmousedown = function() { 
			document.body.onmousemove = function() { 
	    
			  var x = document.getElementById("mixerTwo").value;
			  document.getElementById("demo1").innerHTML = x;
			  soundSource2.playbackRate.value = x / 51;
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
	else if (twoIsOscillator) {
	    document.getElementById("mixerTwo").value = 50;
		var mouseDown = document.getElementById("mixerTwo").value;
		document.body.onmousedown = function() { 
			document.body.onmousemove = function() { 
	    
			  var x = document.getElementById("mixerTwo").value;
			  document.getElementById("demo1").innerHTML = x;
			  soundSource2.frequency.value = x * 10;
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

function fillSecondOscillator() {
	document.getElementById("secondTrack").innerHTML = "";
	
	var options = ["Sin", "Square", "Sawtooth", "Triangle"];     
	var sel = document.getElementById('secondTrack');
	
	for(var i = 0; i < options.length; i++) {
	    var opt = document.createElement('option');
	    opt.innerHTML = options[i];
	    opt.value = i;
	    sel.appendChild(opt);
	}
}

function fillSecondTrack() {
	document.getElementById("secondTrack").innerHTML = "";
	
	var options = ["cat", "breathe", "fart", "laugh"];     
	var sel = document.getElementById('secondTrack');
	
	for(var i = 0; i < options.length; i++) {
	    var opt = document.createElement('option');
	    opt.innerHTML = options[i];
	    opt.value = "sound/" + options[i] + ".wav";
	    sel.appendChild(opt);
	}
	
}
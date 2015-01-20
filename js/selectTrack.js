//adapted from http://www.html5rocks.com/en/tutorials/webaudio/intro/

//global variables
var context;
var soundBuffer1;
var soundSource1;
var soundBuffer2;
var soundSource2;
var oneLoaded = false;
var twoLoaded = false;
var oneIsOscillator = false;
var twoIsOscillator = false;
var oneIsPlaying = false;
var twoIsPlaying = false;
var gainNode1;
var gainNode2;
var masterVol = 50;
var oneLoFilter;
var oneHiFilter;
var twoLoFilter;
var twoHiFilter;
var fadeVal;

window.addEventListener('load', setup, false); //this will run the setup() function when the page loads
var isPaused = false;

function setup() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
	fadeVal = document.getElementById("fade").value;
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }
}

//this will NOT work on local files, see the HW2 handout
function selectFirstTrack(buffer) {
	url = document.getElementById("firstTrack").value;
	if (!isNaN(url) && parseInt(Number(url)) == url) {
		soundSource1 = context.createOscillator();
		soundSource1.type = parseInt(Number(url)); // sine wave
		oneIsOscillator = true;
		gainNode1 = context.createGainNode();
		soundSource1.frequency.value = 500;
	}
	else {
		oneIsOscillator = false;
		console.log("Loading sound data from: " + url);
		var request = new XMLHttpRequest();
		request.open('GET', url, true); 
		request.responseType = 'arraybuffer'; 

		request.onload = function() {
			context.decodeAudioData(request.response, function(buffer) {
	 		   soundBuffer1 = buffer;
	 		  console.log("Loading finished.");
		    }, onLoadError);
		}
		
		request.send();
		gainNode1 = context.createGainNode();
		soundSource1 = context.createBufferSource();
	}
	oneLoaded = true;
}

function selectSecondTrack(buffer) {
	url = document.getElementById("secondTrack").value;
	if (!isNaN(url) && parseInt(Number(url)) == url) {
		soundSource2 = context.createOscillator();
		soundSource2.type = parseInt(Number(url)); // sine wave
		twoIsOscillator = true;
		gainNode2 = context.createGainNode();
		soundSource2.frequency.value = 500;
	}
	else {
		twoIsOscillator = false;
		console.log("Loading sound data from: " + url);
		var request = new XMLHttpRequest();
		request.open('GET', url, true); 
		request.responseType = 'arraybuffer'; 

		request.onload = function() {
		context.decodeAudioData(request.response, function(buffer) {
		  soundBuffer2 = buffer;
		  console.log("Loading finished.");
		}, onLoadError);
		}
		
		request.send();
		gainNode2 = context.createGainNode();
	}
	twoLoaded = true;
}

function onLoadError() {
	console.log("Load Error");
}

function playSound() {
	soundType1 = document.getElementById("firstTrack").value;
	soundType2 = document.getElementById("secondTrack").value;
	if (!oneLoaded && !twoLoaded) {
		alert("Please load at least one track... If one is selected, please click the Load Track Button.");
	}
	if (oneIsPlaying || twoIsPlaying) {
		alert("Please click Stop before loading another track. Make sure you load both if you would like to play both at the same time.");
	}
	else {
		if (oneLoaded) {
			if (oneIsOscillator) {
				oneIsPlaying = true;
			
				soundSource1.buffer = soundBuffer1;
				oneLoFilter = context.createBiquadFilter();
				// Create the audio graph.
				soundSource1.connect(oneLoFilter);
				oneLoFilter.connect(gainNode1);
				// Create and specify parameters for the low-pass filter.
				oneLoFilter.type = 0; // Low-pass filter. See BiquadFilterNode docs
		
				oneHiFilter = context.createBiquadFilter();
				// Create the audio graph.
				soundSource1.connect(oneHiFilter);
				oneHiFilter.connect(gainNode1);
				// Create and specify parameters for the low-pass filter.
				oneHiFilter.type = 1; // Low-pass filter. See BiquadFilterNode docs
			
				soundSource1.connect(gainNode1);
				//oscillator1.connect(context.destination);
				gainNode1.connect(context.destination);
				soundSource1.noteOn && soundSource1.noteOn(0);
				
			} else if (isPaused) {
				isPaused = false;
				oneIsPlaying = true;
				soundSource1.connect(context.destination);
				fade();
			} else if (!oneIsOscillator){
				oneIsPlaying = true;
			
				soundSource1.buffer = soundBuffer1;
			
				oneLoFilter = context.createBiquadFilter();
				// Create the audio graph.
				soundSource1.connect(oneLoFilter);
				oneLoFilter.connect(gainNode1);
				// Create and specify parameters for the low-pass filter.
				oneLoFilter.type = 0; // Low-pass filter. See BiquadFilterNode docs

		
				oneHiFilter = context.createBiquadFilter();
				// Create the audio graph.
				soundSource1.connect(oneHiFilter);
				oneHiFilter.connect(gainNode1);
				// Create and specify parameters for the low-pass filter.
				oneHiFilter.type = 1; // Low-pass filter. See BiquadFilterNode docs
		
				soundSource1.connect(gainNode1);
				gainNode1.connect(context.destination); 
				soundSource1.start(context.currentTime);
				soundSource1.loop = true;
			}
		}
		if (twoLoaded) {
			if (twoIsOscillator) {
				twoIsPlaying = true;
				twoLoFilter = context.createBiquadFilter();
				// Create the audio graph.
				soundSource2.connect(twoLoFilter);
				twoLoFilter.connect(gainNode2);
				// Create and specify parameters for the low-pass filter.
				twoLoFilter.type = 0; // Low-pass filter. See BiquadFilterNode docs
	
				twoHiFilter = context.createBiquadFilter();
				// Create the audio graph.
				soundSource2.connect(twoHiFilter);
				twoHiFilter.connect(gainNode2);
				// Create and specify parameters for the low-pass filter.
				twoHiFilter.type = 1; // Low-pass filter. See BiquadFilterNode docs

				soundSource2.connect(gainNode2);
				gainNode2.connect(context.destination);
				soundSource2.noteOn && soundSource2.noteOn(0);
			}
			else if (isPaused) {
				isPaused = false;
				twoIsPlaying = true;
				soundSource2.connect(context.destination);
				fade();
			}
			else if (!twoIsOscillator){
				twoIsPlaying = true;
				soundSource2 = context.createBufferSource();
				soundSource2.buffer = soundBuffer2;
		
				twoLoFilter = context.createBiquadFilter();
				// Create the audio graph.
				soundSource2.connect(twoLoFilter);
				twoLoFilter.connect(gainNode2);
				// Create and specify parameters for the low-pass filter.
				twoLoFilter.type = 0; // Low-pass filter. See BiquadFilterNode docs

	
				twoHiFilter = context.createBiquadFilter();
				// Create the audio graph.
				soundSource2.connect(twoHiFilter);
				twoHiFilter.connect(gainNode2);
				// Create and specify parameters for the low-pass filter.
				twoHiFilter.type = 1; // Low-pass filter. See BiquadFilterNode docs

		
				soundSource2.connect(gainNode2);
				gainNode2.connect(context.destination);
				soundSource2.start(context.currentTime);
				soundSource2.loop = true;
			}
		}
	}
}

function pauseSound() {
	if (oneIsPlaying) {
		if (oneIsOscillator) {
			oneIsPlaying = false;
			soundSource1.disconnect(context.destination);
			selectFirstTrack();
		}
		else if (!oneIsOscillator) {
			oneIsPlaying = false;
			soundSource1.disconnect(context.destination);
			isPaused = true;
		}
	}
	if (twoIsPlaying) {
		if (twoIsOscillator) {
			twoIsPlaying = false;
			soundSource2.noteOff(context.currentTime);
			selectSecondTrack();
		}
		else if (!twoIsOscillator){
			twoIsPlaying = false;
			soundSource2.disconnect(context.destination);
			isPaused = true;
		}
	}
}

function stopSound() {
	if (oneLoaded && oneIsPlaying) {
		if (oneIsOscillator) {
			oneIsPlaying = false;
			soundSource1.noteOff(context.currentTime);
			soundSource1.disconnect();
		} 
		else { 
			soundSource1.stop(0);
			oneIsPlaying = false;
		}
	}
	if (twoLoaded && twoIsPlaying) {
		if (twoIsOscillator) {
			twoIsPlaying = false;
			soundSource2.noteOff(context.currentTime);
			soundSource2.disconnect();
		}
		else {
			soundSource2.stop(0);
			twoIsPlaying = false;
		}
	}
	oneLoaded = false;
	twoLoaded = false;
	isPaused = false;
	document.getElementById("firstTrack").innerHTML = "null";
	document.getElementById("secondTrack").innerHTML = "null";
}

function logSoundData(buffer) {
	console.log("Buffer length: " + buffer.length);
}
function fade() {

	var mouseDown = document.getElementById("fade").value;
	document.body.onmousedown = function() { 
		document.body.onmousemove = function() { 
	    
		  fadeVal = document.getElementById("fade").value;
		  document.getElementById("demo3").innerHTML = fadeVal;
		  var gain1 = Math.cos((fadeVal/100) * 0.5*Math.PI);
		  var gain2 = Math.cos((1.0 - (fadeVal/100)) * 0.5*Math.PI);
		  gainNode1.gain.value = gain1;
		  gainNode2.gain.value = gain2;
		}
	}
  fadeVal = document.getElementById("fade").value;
  document.getElementById("demo3").innerHTML = fadeVal;
  var gain1 = Math.cos((fadeVal/100) * 0.5*Math.PI);
  var gain2 = Math.cos((1.0 - (fadeVal/100)) * 0.5*Math.PI);
  gainNode1.gain.value = gain1;
  gainNode2.gain.value = gain2;
}

function reloadPage() {
	location.reload(); 
}





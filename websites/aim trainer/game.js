let targetsSpawnInterval = 600;
let firstClicked = false;				//Indicates if first target has been clicked(i.e game has started or not)
let container, time, hits, misses,acc; 	//HTML Elements
let spawnID, timeID, loopID;			//ID for Intervals
let score = 0, miss = 0, accuracy  = 0;	//Stats to display
let startTime;							//State Variables to keep track of time elapsed

function setup()
{
	time = document.getElementById("time");				
	hits = document.getElementById("hits");
	misses = document.getElementById("misses");
	acc = document.getElementById("accuracy");
	container = document.getElementById("container");	
	
	container.onclick = function(){		//Check for misses
		if(firstClicked)
			miss++;
	}
	
	//Initialize State Variables
	firstClicked = false;
	spawnTarget();
	score = 0;
	miss = 0;
	accuracy = 0;
	startTime = 0;
	time.innerHTML = "Hit the first target to start!";
	hits.innerHTML = "Hits: ";
	misses.innerHTML = "Misses: ";
	acc.innerHTML = "Accuracy: ";
	
	
	loopID = setInterval(loop,16);
	return;
}

function loop()
{
	if(!firstClicked)						//Do nothing if not started
		return;
	hits.innerHTML = "Hits: "+score;
	misses.innerHTML = "Misses: "+miss;
	if(score+miss != 0)						//Check / by 0 error
	{
		acc.innerHTML = "Accuracy: "+ (score/(score+miss)* 100).toFixed(2) + "%";
	}
	return;
}

function spawnTarget()
{
	let parentRect = container.getBoundingClientRect();
		
	let xPos = rng(10, container.clientWidth-40);			//Random positioning for elements
	let yPos = rng(10, container.clientHeight-40);			
	
	let outer = document.createElement("span");				//Generate HTML for target
	outer.classList.add("dot");
	outer.classList.add("outer");
	
	let inner = document.createElement("span");
	inner.classList.add("dot");
	inner.classList.add("inner");
	
	outer.appendChild(inner);
	outer.style.top = yPos + "px";
	outer.style.left = xPos + "px";
	
	
	outer.onclick=function()			//start explosion animation
		{
			this.onclick=null;
			this.classList.add("targetAnim");
			this.lastChild.classList.add("targetAnim2");
			if(!firstClicked)
			{
				firstClicked = true;
				spawnID = setInterval(spawnTarget, targetsSpawnInterval + rng(0,200));
				startTime = Date.now();
				updateTime();
				timeID = setInterval(updateTime, 1000);
			}
			this.addEventListener("animationend", function(){		//Remove target on animation end
				this.classList.remove("targetAnim");
				this.lastChild.classList.remove("targetAnim2");
				container.removeChild(this);		
			});
			score++;
			miss--;					//Decrementing miss because miss increases when target is clicked on as well.
		}
		
		container.appendChild(outer);
}

function resetGame()
{
	while (container.children.length > 0) 
	{
		container.removeChild(container.lastChild);
	}
	clearInterval(spawnID);
	clearInterval(timeID);
	clearInterval(loopID);
	setup();
}

// Utility Funcs
function updateTime()		//Updates time elapsed since startTime
{
	let currTime = Date.now();
	let ms = (currTime - startTime);
	let sec = Math.floor(ms/1000);
	let min = Math.floor(sec/60);
	let hour = Math.floor(min/60);
	
	seconds = sec % 60;
	minutes = min % 60;
	hours = hour % 24;
	timeStr =  `${toDigits(hours,2)}:${toDigits(minutes,2)}:${toDigits(seconds,2)}`;
	time.innerHTML = "Time: "+timeStr;
}
function toDigits(num,d) 
{
  return num.toString().padStart(d, '0');
}
function rng(a, b)			//Random Number Generator
{
	return Math.floor((Math.random() * (b-a)) + a);
}

window.onload = setup;		//Call setup on load

// variables
var button1;
var button2;
var button3;
var button4;
var answer;
var dictionary;
var signal;

// main
$(document).ready(function(){
	initComponents();
});

// methods
function initComponents()
{
	initButtons();

	initDictionary();

	start();
}

function initButtons()
{
	// set button properties
	button1 = document.getElementById('button1');
	button1.style.position = 'absolute';
	button1.innerHTML = "button1";
	button1.style.height = '20%';
	button1.style.width = '20%';
	button1.style.left = '25%';
	button1.style.top = '25%';

	button2 = document.getElementById('button2');
	button2.style.position = 'absolute';
	button2.innerHTML = "button2";
	button2.style.height = '20%';
	button2.style.width = '20%';
	button2.style.left = '55%';
	button2.style.top = '25%';

	button3 = document.getElementById('button3');
	button3.style.position = 'absolute';
	button3.innerHTML = "button3";
	button3.style.height = '20%';
	button3.style.width = '20%';
	button3.style.left = '25%';
	button3.style.top = '55%';

	button4 = document.getElementById('button4');
	button4.style.position = 'absolute';
	button4.innerHTML = "button4";
	button4.style.height = '20%';
	button4.style.width = '20%';
	button4.style.left = '55%';
	button4.style.top = '55%';
}

function initDictionary()
{
	// load dictionary
	dictionary = ['a', 'green', 'I', 'see', 'like', 'one', 'the', 'we', 'do', 'look', 'was', 'yellow', 'you', 'are', 'have', 'that', 'they', 'two', 'he', 'is', 'three', 'to', 'with', 'for', 'go', 'here', 'me', 'where'];
}

function start()
{
	wait(500);

	// create list
	var tempnum;
	var templist = new Array();
	templist[0] = dictionary[Math.floor(Math.random() * dictionary.length)];
	for (var i = 1; i < 4; i++)
	{
		tempnum = Math.floor(Math.random() * dictionary.length);

		while (!$.inArray(dictionary[tempnum], templist))
		{
			tempnum = Math.floor(Math.random() * dictionary.length);
		}

		templist[i] = dictionary[tempnum];
	}

	// set buttons
	button1.innerHTML = templist[0];
	button2.innerHTML = templist[1];
	button3.innerHTML = templist[2];
	button4.innerHTML = templist[3];

	// set answer
	answer = Math.floor(Math.random() * 4) + 1;
	
	// say word
	var answord;
	switch (answer)
	{
		case 1:
		answord = button1.innerHTML;
		break;
		case 2:
		answord = button2.innerHTML;
		break;
		case 3:
		answord = button3.innerHTML;
		break;
		case 4:
		answord = button4.innerHTML;
		break;
	}
	var audio = new Audio();
	audio.src =('http://demo.thewynngroup.net/audio.php?tl=en&q=Which%20is%20'+answord);
	audio.play();
	
	console.log('ans:'+answer);
}

function guess(g)
{
	console.log(g+' '+answer);
	
	// log word
	var word;
	switch (g)
	{
		case 1:
		word = button1.innerHTML;
		break;
		case 2:
		word = button2.innerHTML;
		break;
		case 3:
		word = button3.innerHTML;
		break;
		case 4:
		word = button4.innerHTML;
		break;
	}
	
	// log answer
	var answord;
	switch (answer)
	{
		case 1:
		answord = button1.innerHTML;
		break;
		case 2:
		answord = button2.innerHTML;
		break;
		case 3:
		answord = button3.innerHTML;
		break;
		case 4:
		answord = button4.innerHTML;
		break;
	}
	
	// check answer
	if (answer == g)
	{
		// correct
		signal = document.createElement('button');
		document.getElementsByTagName('body')[0].appendChild(signal);
		signal.style.position = 'absolute';
		signal.innerHTML = "Congratulations!";
		signal.style.fontSize = '20pt';
		signal.style.height = '20%';
		signal.style.left = (0-signal.style.width)/2;
		signal.style.top = (0-signal.style.height)/2;
		
		var audio = new Audio();
		audio.src =('http://demo.thewynngroup.net/audio.php?tl=en&q=Correct!%20That%20is%20'+word);
		audio.onended = function() {start();signal.remove()};
		audio.play();
		
		signal.onclick = function(){this.remove();};
	} else
	{
		// incorrect
		signal = document.createElement('button');
		document.getElementsByTagName('body')[0].appendChild(signal);
		signal.style.position = 'absolute';
		signal.innerHTML = "Woops! try again";
		signal.style.fontSize = '20pt';
		signal.style.height = '20%';
		signal.style.left = (0-signal.style.width)/2;
		signal.style.top = (0-signal.style.height)/2;
		
		var audio = new Audio();
		audio.src =('http://demo.thewynngroup.net/audio.php?tl=en&q=That%20is%20'+word+'.%20Try%20again... ');
		audio.onended = function() {audio.src =('http://demo.thewynngroup.net/audio.php?ie=utf-8&tl=en&q=Which%20is%20'+answord+'?');
		audio.onended = function() {signal.remove();};
		audio.play();
		signal.remove();};
		audio.play();

		signal.onclick = function(){this.remove();};
	}
}

function wait(milliseconds)
{
	var starttime = new Date().getTime();
	while ((new Date().getTime() - starttime) < milliseconds)
	{
		//console.log("sleeping: "+(new Date().getTime() - starttime));
	}
}

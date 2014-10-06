// variables
var button1;
var button2;
var button3;
var button4;
var answer;
var dictionary;
var vol;
var signal;
var library;

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
	// set library field
	library = document.getElementById('library');
	library.style.position = 'absolute';
	library.style.height = '60%';
	library.style.width = '18%';
	library.style.left = '3%';
	library.style.top = '3%';
	
	// import dictionaries
	dictionary = [{name:'k.1', words:[['am','am'],['I','I'],['little','little'],['the','the'],['a','ay'],['to','to']]},
	              {name:'k.2', words:[['have','have'],['is','is'],['like','like'],['my','my'],['we','we'],['for','for'],['he','he']]},
	              {name:'k.3', words:[['me','me'],['with','with'],['she','she'],['look','look'],['see','see'],['of','of'],['they','they'],['you','you']]},
	              {name:'k.4', words:[['are','are'],['do','do'],['that','that'],['five','five'],['four','four'],['one','one'],['three','three'],['two','two'],['from','from'],['go','go'],['here','here']]}
	];
	//var bookshelf = document.URL.substring(0, document.URL.length-("/demo.js/").length);
	for (var i = 0; i < dictionary.length; i++)
	{
		// create button
		var temp = document.createElement('button');
		library.appendChild(temp);
		temp.appendChild(document.createTextNode(dictionary[i].name));
		temp.volnum = i;
		temp.onclick = function() {vol = this.volnum; console.log(this.volnum);};
		temp.style.width = '100%';
		
		// add new line
		temp = document.createElement('br');
		library.appendChild(temp);
	}
	vol = 0;
	
	// set redo button
	var redo = document.getElementById('replay');
	redo.style.position = 'absolute';
	redo.style.fontSize = '20pt';
	redo.style.height = '20%';
	redo.style.width = '18%';
	redo.style.left = '3%';
	redo.style.top = '66%';
	redo.onclick = function() {
		var answord = '';
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
	};
}

function start()
{
	wait(500);

	// create list
	var tempnum;
	var templist = new Array();
	templist[0] = Math.floor(Math.random() * dictionary[vol].words.length);
	for (var i = 1; i < 4; i++)
	{
		var ts = false;
		tempnum = Math.floor(Math.random() * dictionary[vol].words.length);
		
		while (!ts)
		{	
			tempnum = Math.floor(Math.random() * dictionary[vol].words.length);
			
			ts = true;
			for(var j = 0; j < templist.length; j++)
			{
				if (tempnum == templist[j])
				{
					ts = false;
				} 
			}
		}
		
		templist[i] = tempnum;
	}

	// set buttons
	button1.innerHTML = dictionary[vol].words[templist[0]][0];
	button1.phonetic = dictionary[vol].words[templist[0]][1];
	button2.innerHTML = dictionary[vol].words[templist[1]][0];
	button2.phonetic = dictionary[vol].words[templist[1]][1];
	button3.innerHTML = dictionary[vol].words[templist[2]][0];
	button3.phonetic = dictionary[vol].words[templist[2]][1];
	button4.innerHTML = dictionary[vol].words[templist[3]][0];
	button4.phonetic = dictionary[vol].words[templist[3]][1];

	// set answer
	answer = Math.floor(Math.random() * 4) + 1;
	
	// say word
	var answord = '';
	switch (answer)
	{
		case 1:
		answord = button1.phonetic;
		break;
		case 2:
		answord = button2.phonetic;
		break;
		case 3:
		answord = button3.phonetic;
		break;
		case 4:
		answord = button4.phonetic;
		break;
	}
	var audio = new Audio();
	audio.src =('http://demo.thewynngroup.net/audio.php?tl=en&q=Which%20is%20'+answord);
	audio.play();
	
	console.log('ans:'+answer);
}

function guess(g)
{
	// put up click blocker
	var block = document.createElement('button');
	document.getElementsByTagName('body')[0].appendChild(block);
	block.innerHTML = 'test';
	block.style.position = 'absolute';
	block.style.height = '80%';
	block.style.width = '80%';
	block.style.left = '10%';
	block.style.top = '10%';
	
	// log word
	var word = '';
	switch (g)
	{
		case 1:
		word = button1.phonetic;
		break;
		case 2:
		word = button2.phonetic;
		break;
		case 3:
		word = button3.phonetic;
		break;
		case 4:
		word = button4.phonetic;
		break;
	}
	
	// log answer
	var answord = '';
	switch (answer)
	{
		case 1:
		answord = button1.phonetic;
		break;
		case 2:
		answord = button2.phonetic;
		break;
		case 3:
		answord = button3.phonetic;
		break;
		case 4:
		answord = button4.phonetic;
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
		signal.style.left = '40%';
		signal.style.top = '40%';
		
		var audio = new Audio();
		audio.src =('http://demo.thewynngroup.net/audio.php?tl=en&q=Correct!%20That%20is%20'+word);
		audio.onended = function() {start();signal.remove();};
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
		signal.style.left = '40%';
		signal.style.top = '40%';
		
		var audio = new Audio();
		audio.src =('http://demo.thewynngroup.net/audio.php?tl=en&q=That%20is%20'+word+'.%20Try%20again... ');
		audio.onended = function() {
			audio.src =('http://demo.thewynngroup.net/audio.php?ie=utf-8&tl=en&q=Which%20is%20'+answord+'?');
			audio.onended = function() {
				signal.remove();
			};
			audio.play();
			signal.remove();
		};
		audio.play();

		signal.onclick = function(){this.remove();};
	}
	
	// remove click block
	block.parentNode.removeChild(block);
}

function wait(milliseconds)
{
	var starttime = new Date().getTime();
	while ((new Date().getTime() - starttime) < milliseconds)
	{
		//console.log("sleeping: "+(new Date().getTime() - starttime));
	}
}

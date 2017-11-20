dragula([
	document.getElementById('1'),
	document.getElementById('2'),
	document.getElementById('3'),
	document.getElementById('4'),
	document.getElementById('5')
])

.on('drag', function(el) {
	// add 'is-moving' class to element being dragged
	el.classList.add('is-moving');
})
.on('dragend', function(el) {
	
	// remove 'is-moving' class from element after dragging has stopped
	el.classList.remove('is-moving');
	
	// add the 'is-moved' class for 600ms then remove it
	window.setTimeout(function() {
		el.classList.add('is-moved');
		window.setTimeout(function() {
			el.classList.remove('is-moved');
		}, 600);
	}, 100);
});


var createOptions = (function() {
	var dragOptions = document.querySelectorAll('.drag-options');
	
	// these strings are used for the checkbox labels
	var options = ['Research', 'Strategy', 'Inspiration', 'Execution'];
	
	// create the checkbox and labels here, just to keep the html clean. append the <label> to '.drag-options'
	function create() {
		for (var i = 0; i < dragOptions.length; i++) {

			options.forEach(function(item) {
				var checkbox = document.createElement('input');
				var label = document.createElement('label');
				var span = document.createElement('span');
				checkbox.setAttribute('type', 'checkbox');
				span.innerHTML = item;
				label.appendChild(span);
				label.insertBefore(checkbox, label.firstChild);
				label.classList.add('drag-options-label');
				dragOptions[i].appendChild(label);
			});

		}
	}
	
	return {
		create: create
	}
	
	
}());

var showOptions = (function () {
	
	// the 3 dot icon
	var more = document.querySelectorAll('.drag-header-more');
	
	function show() {
		// show 'drag-options' div when the more icon is clicked
		var target = this.getAttribute('data-target');
		var options = document.getElementById(target);
		options.classList.toggle('active');
	}
	
	
	function init() {
		for (i = 0; i < more.length; i++) {
			more[i].addEventListener('click', show, false);
		}
	}
	
	return {
		init: init
	}
}());

createOptions.create();
showOptions.init();

/* Start customize */

function msgbarText(isLengthError, columnId, msgText){
	msgText.push(columnId);
}

function checkingResultCol1(){
	var msgText = [];
	
	var line1Values = $($('.drag-inner-list')[0]).find('.drag-item');
	var result = [
		['Mobile App Programmer', 'Analyst Programmer'],
		['Business Analyst', 'Project Manager'],
		['Data Scientist', 'Data Warehousing'],
		['Network Infrastructure', 'Data Center Operator']
	];
	
	var columnHeadings = [
		"Development", 
		"Business & Admin", 
		"Big Data Analysis",
		"Operation"
	]
	var resultLine0 = ['DREAMWEAVER', 'Sublime Text'];
	var checkingResult = [true, true, true, true];
	for(var i = 0; i <result.length; i++){
		//Start looping result set
		var columnItems = $($('.drag-inner-list')[i]).find('.drag-item');
		var cnt = 0;
		var columnItemTextArr = [];
		$(columnItems).each(function(){
			columnItemTextArr.push($(this).text())
		});
		
	
		
		for(var k = 0; k < columnItems.length; k++){
			//Start checking column by column
			var currentColumnId =  i ;
			var currentItem = $(columnItems[k]);
			var currentItemText = $(currentItem).text();
			console.log("k: " + k + ", currentItemText: " + currentItemText);
			console.log(columnItemTextArr);
			
			//Checking 1, if length not correct already false.
			if(result[i].length != columnItems.length){
			
			  msgbarText(true, currentColumnId, msgText);
				console.log("Column" + (i+1) + " has something wrong(length), would you please try again :) ");
				checkingResult[i] = false;
				break;
			};

			//Checking 2: even column length correct, the text inside still will fail!
			if(result[i].indexOf(currentItemText)>-1){
				cnt++;
			}else{
				console.log("currentItemText:" + currentItemText);
				console.log("result[i].indexOf(currentItemText): " + result[i].indexOf(currentItemText));
				msgbarText(false, currentColumnId, msgText);
				console.log("Column" + (i+1)  + " has something wrong(item), would you please try again :) ");
				checkingResult[i] = false;
				break;
			}
			
			if(cnt==columnItemTextArr.length){
				checkingResult[i] = true;
				console.log("Result Column " + i + " is correct!");
			}
		}
	}
	
	var finalResult = true;
	for(var i = 0; i <checkingResult.length; i++){
		if(!checkingResult[i]){
			finalResult = false;
			console.log("Final is false");
		}
	}
												 
	if(finalResult){
		$('#status-bar').text("You made it! Congratulations!");
		$('#msg-bar').text("You made it! Congratulations!")
		// alert("Really success!");
	}else{
		$('#status-bar').text("Oops!");
		var colWordings = "";
		for(var i = 0; i < msgText.length; i++){
			
			if(i>0){
				colWordings += " and ";
			}
			var idx = msgText[i];
			colWordings += "\"" + columnHeadings[idx] + "\"";
			
		}
		$('#msg-bar').text("There are wrong choices in column " + colWordings.toString() + " , try again!");
		// alert("Checking not success le~!");
	}
	
}


function reset(){
	location.reload();
}
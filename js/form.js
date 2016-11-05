var i = 0; /* Set Global Variable i for automatic increment of field's "Name" attribute - see remove element to identify which list element to remove*/
var j = 0; /* Set Global Variable j for automatic increment of the number of dynamic forms instantiated on DOM - keeps track of how many forms on the DOM*/
/*
---------------------------------------------
Creating a custom element 
---------------------------------------------

*/
 
//inheriting all the properties from the HTMLElement
var dynamicFormProto = Object.create(HTMLElement.prototype);
// Custom Elements can define special methods for tapping into times of their existence - this is called when the element is created
dynamicFormProto.createdCallback = function() {
	j++; // callback that is called when a component is created. (instantiated on the DOM)
	var main_content = '<div class="main_content"><div class="form">'
	var mainform = '<form id="mainform' + j +'"onsubmit="submitFunc(this.id)">';
	var inputText = '<input type="text" id="inputText'+j+'" name="inputText" placeholder="Add some text to this input form"/>';
	var myForm = '<ul class="listContainer" id="myForm'+j+'"></ul></form>';
	var buttons = '<button onclick="createBox(this.id)" id= "myButton'+ j +'">Add Input</button><br/><button  onclick="resetElements(this.id)" id= "resetBox'+ j +'">Reset</button></div>';
	var killDiv = '</div>';

	this.innerHTML = main_content + mainform + inputText + myForm + buttons + killDiv;
}; 

// to tell the browser about the new tag, the prototype adds properties and features (markup)
var dynamic_form = document.registerElement('dynamic-form', {prototype: dynamicFormProto});


/*
---------------------------------------------
Function to Remove Form Elements Dynamically
---------------------------------------------

*/
function removeElement(listElement, paraElement){
	var formNum = paraElement.slice(-1)
	if (document.getElementById(paraElement)){
		var para = document.getElementById(paraElement);
		var list = document.getElementById(listElement);
		list.removeChild(para);
	}
}

//creating my own '$' function for convenience
var $ = function (selector) {
	var elements = document.querySelectorAll(selector) //returns it in a node list format
    var node_array = Array.prototype.slice.call(elements); // converts NodeList to Array
    return node_array;
};

function submitFunc(formID) {
	var formNum = formID.slice(-1)
	var elements = $('.inputBox'+formNum); // is an array 
	alert("Submited! - check the console for your results")
	event.preventDefault();
	console.log("Results from form " + formNum, elements)
	return elements
}

/*
-----------------------------------------------------------------------------
Function that will be called upon, when user click on the Add button .
------------------------------------------------------------------------------
*/
function createBox(formID){
	var formNum = formID.slice(-1)
	var text = $('#inputText'+ formNum);
	var listElement = document.createElement('li');
	var inputBox = document.createElement("P");
	inputBox.setAttribute("type", "text");
	inputBox.setAttribute("value", text[0].value);
	inputBox.innerHTML = text[0].value;
	var image = document.createElement("IMG");
	image.setAttribute("src", "delete.png");
	inputBox.setAttribute("Name", "textelement_" + i++);
	listElement.appendChild(inputBox);
	image.setAttribute("onclick", "removeElement('myForm"+formNum+"', 'id_" + i + "')");
	listElement.appendChild(image);
	listElement.setAttribute("id", "id_" + i);
	listElement.setAttribute("class", "inputBox"+formNum)

	if(!$("#submitButton"+formNum).length) {
		var submitButton = document.createElement("INPUT");
		submitButton.setAttribute("type", "submit");
		submitButton.setAttribute("id", "submitButton"+ formNum);
		submitButton.setAttribute("value", 'Submit');
		document.getElementById("mainform"+formNum).appendChild(submitButton);
		document.getElementById("myForm"+formNum).appendChild(listElement);
	}
	else {
		document.getElementById("myForm"+formNum).appendChild(listElement);
	}
}

/*
-----------------------------------------------------------------------------
Function that will be called upon, when user click on the Reset Button.
------------------------------------------------------------------------------
*/
function resetElements(formID){
	var formNum = formID.slice(-1)
	document.getElementById('myForm'+formNum).innerHTML = '';
}




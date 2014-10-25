/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

// loads the state select using the state data in the usStates global array
// must create new option element for each state in the array
// set the properties of that element
// append new option element as child of the state select element
function loadStates() {
	var elem = document.getElementById("state");
	for (var i = 0; i < usStates.length; i++) {
		var opt = document.createElement("option");
		opt.value = usStates[i].code;
		var text = document.createTextNode(usStates[i].name);
		opt.appendChild(text);
		elem.appendChild(opt);
	}
	
} // loadStates()

document.addEventListener('DOMContentLoaded', loadStates);
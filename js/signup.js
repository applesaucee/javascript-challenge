/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

function loadStates() {
	var elem = document.getElementById("state");
	
	for (var i = 0; i < usStates.length; i++) {
		var opt = document.createElement("option");
		opt.value = usStates[i].code;
		var text = document.createTextNode(usStates[i].name);
		opt.appendChild(text);
		// Why do we have to append text to option in order to show the text for the option?
		// As in, what does it actually do?
		elem.appendChild(opt);
	} 
} // loadStates()

function showHideOcc() {
	var occ = document.getElementsByName("occupationOther")[0];
	
	if (occupation.value == "other") {
		occ.style.display = "inline";
	} else {
		occ.style.display = "none";
		//occ.form.reset();
		//need to figure out how to clear field without resetting the form the entire time
	}
} // showHideOcc()

function leave() {
	var depart = window.confirm("Do you really want to leave?");
	
	if (depart == true) {
		window.location = 'http://google.com';
	}
} // leave()

document.addEventListener('DOMContentLoaded', function() { 

	loadStates();
	occupation.addEventListener('change', showHideOcc);
	cancelButton.addEventListener('click', leave);
	//What allows us to access occupation without calling document.get.....?
});
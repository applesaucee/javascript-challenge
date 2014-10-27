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
		occ.value = '';
	}
} // showHideOcc()

function leave() {
	var depart = window.confirm("Do you really want to leave?");
	
	if (depart == true) {
		window.location = 'http://google.com';
	}
} // leave()

function validateForm(form) {
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
	var idx;
	var valid = true;
	
	for (idx = 0; idx < requiredFields.length - 2; idx++) {
		valid &= validateRequiredField(requiredFields[idx], form);
	}
	valid &= validateZip(requiredFields[5], form);
	
	return valid;
} // validateForm(form)

function validateRequiredField(field, form) {
	if (0 == form[field].value.trim().length) {
		form[field].className = 'invalid-field form-control';
		return false;
	} else {
		form[field].className = 'form-control';
		return true;
	} //how can i get this to properly box birthdate and zip code?
} // validateRequiredField(field, form)


// need to validate zip, birthdate, and occupation other

function validateZip(field, form) {
	var zipRegExp = new RegExp('^\\d{5}$');
	var zip = document.getElementsByName("zip")[0].value;
	if (zipRegExp.test(zip)) {
		form[field].className = 'form-control';
		console.log("this is true!")
		return true;
	} else {
		form[field].className = 'invalid-field form-control';
		console.log("this is false!");
		return false;
	}
} // validateZip(field,form)

function onSubmit(evt) {
	try {
		var valid = validateForm(this);
		
		if (!valid && evt.preventDefault) {
			evt.preventDefault();
		}
		
		evt.returnValue = valid;
		return valid;
	}
	catch(err) {
		alert("Exception: " + err);
	}
} // onSubmit()

document.addEventListener('DOMContentLoaded', function() { 
	loadStates();
	occupation.addEventListener('change', showHideOcc);
	cancelButton.addEventListener('click', leave);
	//What allows us to access occupation without calling document.get.....?
	var ourForm = document.getElementById("signup");
	ourForm.addEventListener('submit', onSubmit);
});
/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

function loadStates() {
	var elem = document.getElementsByName("state")[0];
	
	for (var i = 0; i < usStates.length; i++) {
		var opt = document.createElement("option");
		opt.value = usStates[i].code;
		var text = document.createTextNode(usStates[i].name);
		opt.appendChild(text);
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
	valid &= validateBirth(requiredFields[6], form);
	
    if (occupation.value == "other") {
        valid &= validateRequiredField("occupationOther", form);
    }
    
	return valid;
} // validateForm(form)

function validateRequiredField(field, form) {
	if (0 == form[field].value.trim().length) {
		form[field].className = 'invalid-field form-control';
		return false;
	} else {
		form[field].className = 'form-control';
		return true;
	}
} // validateRequiredField(field, form)

function validateZip(field, form) {
	var zipRegExp = new RegExp('^\\d{5}$');
	var zip = document.getElementsByName("zip")[0].value;
	if (zipRegExp.test(zip)) {
		form[field].className = 'form-control';
		return true;
	} else {
		form[field].className = 'invalid-field form-control';
		return false;
	}
} // validateZip(field,form)

function validateBirth(field, form) {
    var today = new Date();
    var dob = new Date(document.getElementById(field).value);
	var year = today.getFullYear() - dob.getUTCFullYear();
    var month = today.getMonth() - dob.getUTCMonth();
    var day = today.getDate() - dob.getUTCDate();
    
    if (month < 0 || (month == 0 && day < 0)) {
        year = year - 1;
    }
    
    if (year >= 13) {
		form[field].className = 'form-control';
		return true;
	} else {
		form[field].className = 'invalid-field form-control';
        document.getElementById("birthdateMessage").innerHTML = "You must be 13 years or older to sign up!";
		return false;
	}
} // validateBirth(field, form)

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
	var ourForm = document.getElementById("signup");
	ourForm.addEventListener('submit', onSubmit);
});
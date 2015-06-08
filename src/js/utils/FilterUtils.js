"use strict";

function strIncludes(str, term) {
	return (str.toLowerCase().indexOf(term.toLowerCase()) !== -1);
}

function isDateStr(entity) {
	const dateRegEx = /\d{4}-\d{2}-\d{2}/g;

	if (typeof entity === "string") {
		return dateRegEx.test(entity);
	} else {
		return false;
	}
}

// use tilt
export function contains(obj, term) {
	if(!term) return true;

	const k = Object.keys(obj);

	return k.some(cell => {
		switch (typeof obj[cell]) {
			case "string":
					return strIncludes(obj[cell], term);
			case "number":
					return strIncludes("" + obj[cell], "" + term);
			default:
					return false;
		}
	});
}

export function genericSort(arr, sortBy, asc, sortPath) {

	arr = arr.slice(0);

	return arr.sort((a, b) => {
		// ugly hack
		let t1 = sortPath ? a[sortPath][sortBy] : a[sortBy],
				t2 = sortPath ? b[sortPath][sortBy] : b[sortBy],
				sortVal;

		if (isDateStr(t1)) {
			sortVal = Date.parse(t1) - Date.parse(t2);
		} else if (typeof t1 === "string") {
			sortVal = t1.localeCompare(t2, "en", {
				sensitivity: "base"
			});
		} else {
			sortVal = t1 - t2;
		}

		return asc ? sortVal : -sortVal;
	});
}

export function isWithinBounds(obj, lower, upper, key) {
	const lowerAsDate = Date.parse(lower || "1970-01-01");
	const upperAsDate = Date.parse(upper || "3070-01-01");

	if(isDateStr(obj[key])) {
		let d = Date.parse(obj[key]);
		return lowerAsDate < d && d < upperAsDate;
	} else {
		return false;
	}
}

export function restrictTo(obj, restrictionObj) {
	const restrictBy = Object.keys(restrictionObj);

	return restrictBy.every(field => {
		return restrictionObj[field].options.indexOf(obj[field]) !== -1;
	});
}

// Turns an object into an array of objects
// Currently not being used
// todo: immut
export function tilt(obj) {
	return Object.keys(obj).map((e) => {
		return {
			key: e,
			val: obj[e]
		};
	});
}
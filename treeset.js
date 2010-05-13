var TreeSet = function() {
    this.elements = new Array(); 
};


TreeSet.prototype = {
    add: function(element) {
	this.elements.push(element);
    },
    remove: function(element) {
	for (var i = 0; i < this.elements.length; i++) {
	    if (element == this.elements[i]) {
		this.elements.splice(i,1);
		break;
	    }
	}
    },
    pollFirst: function() {
	var element = this.elements[0];
	this.elements.splice(0,1);
	return element;
    },
    lower: function(element) {
	var min_elm;
	for (var i = 0; i < this.elements.length; i++) {
	    if (element.compareTo(elements[i]) == -1) {
		if (!min_elm || min_elm.compareTo(elements[i]) == 1) {
		    min_elm = elements[i];
		}
	    }
	}

	return min_elm;
    },
    higher: function(element) {
	var max_elm;
	for (var i = 0; i < this.elements.length; i++) {
	    if (element.compareTo(elements[i]) == 1) {
		if (!max_elm || max_elm.compareTo(elements[i]) == -1) {
		    max_elm = elements[i];
		}
	    }
	}

	return max_elm;
    },
};
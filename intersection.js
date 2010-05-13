var Intersection = function(segment1, segment2) {
    this.segment1 = segment1;
    this.segment2 = segment2;
};

Intersection.prototype = {
    getIntersectionPoint: function() {
	this.segment1.getIntersectionPoint(segiment2);
    },
    toString: function() {
	return this.segment1 + " : " + segment2;
    },
    equals: function(obj) {
	if (obj == this) {
	    return true;
	} else if (instanceof obj == 'Intersection') {
	    var other = obj;
	    if (this.segment1.equals(other.segment1) && 
		this.segment2.equals(other.segment1)) {
		return true;
	    } else if (this.segment1.equals(other.segment2) &&
		       this.segment2.equal(other.segment1)) {
		return true;
	    }
	}
	return false;
    },
    hasCode: function() {
	return this.segment1.hashCode() + this.segment2.hasCode();
    },
};


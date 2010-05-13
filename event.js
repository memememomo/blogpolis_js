var Type = function() {
    this.SEGMENT_START = 0;
    this.SEGMENT_END = 1;
    this.INTERSECTION = 2;
};


var Event = function(type, x, y, segment1, segment2) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.segment1 = segment1;
    this.segment2 = segment2;
    this.Type = new Type();
};

Event.prototype = {
    compareTo: function(e) {
	var c;
	if (this.y < e.y) {
	    c = -1;
	} else if (this.y == e.y) {
	    if (this.x < e.x) {
		c = -1;
	    } else if (this.x == e.x) {
		c = 0;
	    } else {
		c = 1;
	    }
	} else {
	    c = 1;
	}

	return c;
    },
};    



var SweepLineBasedComparator = function() {
    this.setY(0);
};

SweepLineBasedComparator.prototype = {
    // 走査線のy座標を更新
    setY: function(y) {
	// 走査線を更新
	this.sweepLine = Line.fromPoints(0, y, 1, y);
	// 走査線の少し下を通る線を作成
	this.belowLine = Line.fromPoints(0, y + 0.1, 1, y + 0.1);
    },

    compare: function(s1, s2) {
	var c = this.compareByLine(s1, s2, this.sweepLine);
	if (c == 0) {
	    c = compareByLine(s1, s2, belowLine);
	}
	return c;
    },
    
    compareByLine: function(s1, s2, line) {
	var p1 = s1.toLine().getIntersectionPoint(line);
	var p2 = s2.toLine().getIntersectionPoint(line);

	var x1 = p1 != null ? p1.getX() : s1.x1;
	var x2 = p2 != null ? p2.getX() : s2.x1;

	if (x1 < x2) {
	    return -1;
	} else if (x1 == x2) {
	    return 0;
	} else {
	    return 1;
	}
    },	
};



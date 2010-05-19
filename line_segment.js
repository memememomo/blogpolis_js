var LineSegment = function(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
};


// 線分を延長して直線化
LineSegment.prototype.toLine = function() {
    return Line.fromPoints(x1, y1, x2, y2);
};

// 線分と直線の交差判定
LineSegment.prototype.intersectsLine = function(l) {
    var t1 = l.a * this.x1 + l.b * this.y1 + l.c;
    var t2 = l.a * this.x2 + l.b * this.y2 + l.c;
    return t1 * t2 <= 0;
};

// 線分同士の交差判定
/*
LineSegment.prototype.intersectsLineSegment = function(s) {
    return this.intersectsLine(s.toLine()) && s.intersects(this.toLine());
};
*/

LineSegment.prototype.intersectsLineSegment = function(s) {
    return this.bothSides(s) && s.bothSides(this);
};

LineSegment.prototype.bothSides = function(s) {
    var ccw1 = GeomUtils.ccw(this.x1, this.y1, s.x1, s.y1, this.x2, this.y2);
    var ccw2 = GeomUtils.ccw(this.x1, this.y1, s.x2, s.y2, this.x2, this.y2);
    if (ccw1 == 0 && ccw2 == 0) {
	return this.internal(s.x1, s.y1) || internal(s.x2, s.y2);
    } else {
	return ccw1 * ccw2 <= 0;
    }
};

LineSegment.prototype.internal = function(x,y) {
    return GeomUtils.dot(this.x1 - x, this.y1 - y, thix.x2 - x, this.y2 - y) <= 0;
};


// 交点座標の取得(直線)
LineSegment.prototype.getIntersectionPointLine = function(l) {
    if (!this.intersectsLine(l)) {
        return null;
    }
    return l.getIntersectionPoint(this.toLine());
};

// 交点座標の取得(線分)
LineSegment.prototype.getIntersectionPointLineSegment = function(s) {
    if (!this.intersectsLineSegment(s)) {
        return null;
    }
    return s.toLine().getIntersectionPoint(this.toLine());
};


LineSegment.prototype.toString = function() {
    return "(" + this.x1 + ", " + this.y1 + ") - (" + this.x2 + ", " + this.y2 + ")";
};
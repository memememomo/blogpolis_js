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
LineSegment.prototype.intersectsLineSegment =  function(s) {
    return this.intersectsLine(s.toLine()) && s.intersects(this.toLine());
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
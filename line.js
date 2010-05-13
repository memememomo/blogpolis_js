var Line = function(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
};


// 2直線の交点の座標を求める
Line.prototype.getIntersectionPoint = function(l) {
    var d = this.a * l.b - l.a * this.b;

    // ２直線が平行
    if (d == 0.0) {
        return null;
    }

    var x = (this.b * l.c - l.b * this.c) / d;
    var y = (l.a * this.c - this.a * l.c) / d;
    return new Point2D(x, y);
};


// 2点を通る直線を生成(クラスメソッド)
Line.fromPoints = function(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return new Line(dy, -dx, dx * y1 - dy * x1);
};


Line.prototype.toString = function() {
    return "a = " + a + ", b = " + b + ", c = " + c;
};



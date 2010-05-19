var GeomUtils = function() {};

GeomUtils.cross = function(x1, y1, x2, y2) {
    return x1 * y2 - x2 * y1;
};

GeomUtils.ccw = function(x1, y1, x2, y2, x3, y3) {
    return GeomUtils.cross(x2 - x1, y2 - y1, x3 - x2, y3 - y2);
};

GeomUtils.ccwP = function(p1, p2, p3) {
    return GeomUtils.ccw(p1.getX(), p1.getY(), p2.getX(), p2.getY(), p3.getX(), p3.getY());
};

GeomUtils.dot = function(x1, y1, x2, y2) {
    return x1 * x2 + y1 * y2;
};

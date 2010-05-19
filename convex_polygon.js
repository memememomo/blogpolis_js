var ConvexPolygon = function(vertices) {
    var length = vertices.length;
    if (length < 3) {
	throw "IllegalArgumentException";
    }
    this.vertices = vertices;
    this.edges = new Array();

    var ccw0 = GeomUtils.ccwP(vertices[0], vertices[1], vertices[2]);
    if (ccw0 == 0) {
	throw "Polygon is not convex";
    }
    for (var i = 1; i < length; i++) {
	var v1 = vertices[i];
	var v2 = vertices[(i+1)%length];
	var v3 = vertices[(i+2)%length];
	var ccw = GeomUtils.ccwP(v1, v2, v3);
	if (ccw0 * ccw <= 0) {
	    throw "Polygon is not convex.";
	}
    }

    for (var i = 0; i < length; i++) {
	var v1 = vertices[i];
	var v2 = vertices[(i + 1) % length);
	
	this.edges.push(new LineSegment(
			    v1.getX(), v1.getY(), v2.getX(), v2.getY()));
    }
};

ConvexPolygon.prototype.getVertex = function(index) {
    return this.vertices[index];
};

ConvexPolygon.prototype.getEdge = function(index) {
    return this.edges[index];
};

ConvexPolygon.prototype.getEdgeCount = function() {
    return this.edges.length;
};

ConvexPolygon.prototype.contains = function(x,y) {
    var minY = -10000000;
    var maxY = 10000000;
    
    if (y <= minY || y >= maxY) {
	return false;
    }

    var halfLine = new LineSegment(x, y, x + 10000000, y);
    var count = 0;
    for (var i = 0; i < this.edges.length; i++) {
	var edge = this.edges[i];
	
	if (edge.y2 == y) {
	    continue;
	} 
	if (edge.intersects(halfLine)) {
	    count++;
	}
    }

    return count % 2 == 1;
};

ConvexPolygon.prototype.getArea = function() {
    var crossSum = 0;
    var length = this.vertices.length;

    for (var i = 0; i < length; i++) {
	var v1 = this.vertices[i];
	var v2 = this.vertices[(i+1)%length];

	var cross = GeomUtils.cross(v1, v2);
	crossSum += cross;
    }
    var area = crossSum / 2.0;
    return (area < 0) ? -area : area;
};
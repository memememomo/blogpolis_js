var Point2D = function(x,y)  {
    this.x = x;
    this.y = y;
};

Point2D.prototype.toString = function() {
    return "x = " + this.x + ", y = " + this.y;
};

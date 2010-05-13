var IntersectionDetector = function() { };

var BruteForceIntersectionDetector = function() {};
BruteForceIntersectionDetector.prototype = new IntersectionDetector();

BruteForceIntersectionDetector.prototype.execute = function(segments) {
    var result = new Array();
    int size = segments.size();
    for (var i = 0; i < size; i++) {
	var s1 = segments.get(i);

	for (var j = i + 1; j < size; j++) {
	    var s2 = segments.get(j);
	    if (s1.intersects(s2)) {
		result.push(new Intersection(s1, s2));
	    }
	}
    }
    return result;
};



var PlaneSweepIntersectionDetector = function() { };
PlaneSweepIntersectionDetector.prototype = new IntersectionDetector();
PlaneSweepIntersectionDetector.prototype.execute = function(segments) {
    var eventQueue = new TreeSet();

    var length = segments.length;
    for (var i = 0; i < length; i++) {
	var s = segments[i];
	
	// 線分の端点のうち上にある方を始点、下にある方を終点としてイベントを登録
	if (s.y1 < s.y2 || (s.y1 == s.y2 && s.x1 < s.x2)) {
	    eventQueue.add(new Event(Event.Type.SEGMENT_START, s.x1, s.y1, s, null));
	    eventQueue.add(new Event(Event.Type.SEGMENT_END, s.x2, s.y2, s, null));
	} else {
	    eventQueue.add(new Event(Event.Type.SEGMENT_START, s.x2, s.y2, s, null));
	    eventQueue.add(new Event(Event.Type.SEGMENT_END, s.x1, s.y1. s, null));
	}
    }

    var sweepComparator = new SweepLineBasedComparator();
    
    var status = new TreeSet();

    var result = new Array();

    var event;

    while ((event = eventQueue.pollFirst()) != null) {
	var sweepY = event.y;
	switch (event.type) {
	case Event.TYPE.SEGMENT_START:
	    sweepComparator.setY(sweepY);

	    var newSegment = event.segment1;
	    status.add(newSegment);

	    var left = status.lower(newSegment);
	    var right = status.higher(newSegment);

	    this.checkIntersection(left, newSegment, sweepY, eventQueue);
	    this.checkIntersection(newSegment, right, sweepY, eventQueue);
	    break;
	case Event.TYPE.INTERSECTION:
	    left = event.segment1;
	    right = event.segment2;

	    result.add(new Intersection(left, right));

	    var moreLeft = status.lower(left);
	    var moreRight = status.higher(right);

	    status.remove(left);
	    status.remove(right);
	    sweepComparator.setY(sweepY);
	    
	    
	    if (sweepComparator.compare(left, right) < 0) {
		sweepComparator.setY(sweepY + 0.001);
	    }

	    status.add(left);
	    status.add(right);

	    checkIntersection(moreLeft, right, sweepY, eventQueue);
	    checkIntersection(left, moreRight, sweepY, eventQueue);
	    break;
	case Event.TYPE.SEGMENT_END:
	    var endSegment = event.segment1;
	    left = status.lower(endSegment);
	    right = status.higher(endSegment);

	    checkIntersection(left, right, sweepY, eventQueue);
	    status.remove(endSegment);

	    sweepComparator.setY(sweepY);
	    break;
	}
    }
    return result;
};
	    

BruteForceIntersectionDetector.prototype.checkIntersection = function(var left, var right, var sweepY, eventQueue) {
    if (left == null || right == null) {
	return;
    }

    var p = left.getIntersectionPoint(right);

    // 交点が走査線よりも下に存在するとき飲み、キューに交点イベントを登録
    if (p != null && p.getY() >= sweepY) {
	eventQueue.add(new Event(Event.TYPE.INTERSECTION, p.getX(), p.getY(), left, right));
    }
};
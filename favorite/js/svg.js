function drawRing(eleId, options) {
	var conf = {
		width:400,
		height:400,
		ringWidth:20,
		color:"rgba(0,0,0,0.2)"
	};
	var opts
	,	canvas
	,	styProp
	,	curPath
	,	R_ring
	;
	
	opts = $.extend({}, conf, options);
	styProp = {
		stroke: opts.color,
		"stroke-width": opts.ringWidth
	};
	R_ring = Math.min(opts.width, opts.height) / 2 - opts.ringWidth / 2;
	canvas = Raphael(eleId, opts.width, opts.height);
	/*!
	 * 自定义属性
	 */
	canvas.customAttributes.arc = function(value, total, R) {
		var R_ANGLE = 360
		,	per = R_ANGLE / total * value
		,	a = (R_ANGLE/4 - per) * Math.PI / (R_ANGLE / 2)
		,	centerCircle = Math.min(opts.width, opts.height) / 2
        ,	x = centerCircle + R * Math.cos(a)
        ,	y = centerCircle - R * Math.sin(a)
        ,	color = opts.color
        ,	path
        ;
        
        if (total == value) {
            path = [["M", centerCircle, centerCircle - R], ["A", R, R, 0, 1, 1, (centerCircle - 0.01), centerCircle - R]];
        } else {
            path = [["M", centerCircle, centerCircle - R], ["A", R, R, 0, +(per > (R_ANGLE / 2)), 1, x, y]];
        }
        return {path: path, stroke: color};
	};
	
	canvas.path().attr(styProp).attr({arc: [60, 60, R_ring]});
	curPath = canvas.path().attr({arc: [0, 60, R_ring]}).attr({stroke:"rgba(0,180,0,1)","stroke-width": opts.ringWidth});
	curPath.animate({arc: [40, 60, R_ring]}, 750, "easeout", function () {
        
    });
	return canvas;
}
drawRing("canvas", {
	width:200,
	height:200,
	ringWidth:20
});

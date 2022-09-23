// cool object animation
var canvas = document.getElementById('logo-canvas'),
	ctx = canvas.getContext('2d'),
	splash = document.getElementById('splash'),
	color = "#00D7B3",
	lasttime,
	freeze


function fixdim() {
	dimensions.update()

	var displaywidth = Math.sqrt(dimensions.width) * 14.5 //dimensions.width

	var doc = document.documentElement;
	var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

	// logo_wrap.style.top = top / 2 + 'px'
	var rect = splash.getBoundingClientRect()

	if (!freeze) {
		var displayheight = displaywidth * 4.5 / 15 //dimensions.width
		canvas.width = displayheight * window.devicePixelRatio
		canvas.style.width = displayheight + 'px'
		canvas.height = displayheight * window.devicePixelRatio
		canvas.style.height = displayheight + 'px'
	}
}

addEventListener('scroll', fixdim)

var gh = .12;

function main(time) {
	fixdim()
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	var t = time / 10000

	ctx.strokeStyle = ctx.fillStyle = color
	var sm = 1

	var m = objectwithrotation(t, t * 2, t * 3, mouse.x / 100, mouse.y / 100, 0)

	drawobject(ctx, m, {
		x: canvas.width / 2,
		y: canvas.height / 1.8,
		size: gh * canvas.height,
		line_width: 2,
	})

	lasttime = time
	requestAnimationFrame(main)
}

requestAnimationFrame(function init(t) {
	fixdim()
	lasttime = t
	requestAnimationFrame(main)
})

// cool object dimensions
var dimensions = {

	width: 0,

	height: 0,

	getWidth: function () {
		if (window.innerWidth) {
			return window.innerWidth;
		}
		if (document.documentElement && document.documentElement.clientHeight) {
			return document.documentElement.clientWidth;
		}
		if (document.body) {
			return document.body.clientWidth;
		}
		return 0;
	},

	getHeight: function () {
		if (window.innerWidth) {
			return window.innerHeight;
		}
		if (document.documentElement && document.documentElement.clientHeight) {
			return document.documentElement.clientHeight;
		}
		if (document.body) {
			return document.body.clientHeight;
		}
		return 0;
	},

	update: function () {
		var curW = this.getWidth()
		var curH = this.getHeight()
		if (curW != this.width || curH != this.height) {
			this.width = curW
			this.height = curH
			return true
		}
		return false
	}
}

// cool object main
function app1(p, a, c1, c2) {
	var l = Math.cos(a) * p[c1] + Math.sin(a) * p[c2]
	var k = -Math.sin(a) * p[c1] + Math.cos(a) * p[c2]
	p[c1] = l
	p[c2] = k
}

function app2(p, a, c1, c2) {
	var l = Math.cos(a) * p[c1] - Math.sin(a) * p[c2]
	var k = Math.sin(a) * p[c1] + Math.cos(a) * p[c2]
	p[c1] = l
	p[c2] = k
}

var _edges
function objectedges() {
	if (!_edges) {
		var m = objectwithrotation(0, 0, 0, 0, 0, 0)
		var edges = []
		var indicies = ['x', 'y', 'z', 'w']
		for (var i = 0; i < m.length; i++) {
			for (var j = i + 1; j < m.length; j++) {
				var count = 0
				for (var k = 0; k < 6; k++) { // change this value(4,5,6) to change shape of object
					if (m[i][indicies[k]] === m[j][indicies[k]]) count++
				};
				if (count === 3) edges.push([i, j])
			}
		}
		_edges = edges
	}
	return _edges
}

function objectwithrotation(a, b, c, d, e, f) {
	var verticies = []
	for (var i = 0; i < 16; i++) {
		var p = {
			x: (i & 1) * 2 - 1,
			y: ((i >> 1) & 1) * 2 - 1,
			z: ((i >> 2) & 1) * 2 - 1,
			w: ((i >> 3) & 1) * 2 - 1
		}
		app1(p, a, 'x', 'y')
		app1(p, b, 'y', 'z')
		app1(p, c, 'x', 'w')
		app2(p, d, 'x', 'z')
		app2(p, e, 'y', 'w')
		app2(p, f, 'z', 'w')
		verticies.push(p)
	}
	return verticies
}

function project(point, size) {
	return {
		x: (point.x + Math.SQRT2 * point.z) * size,
		y: (point.y + Math.SQRT2 * point.w) * size
	}
}

function drawobject(ctx, object, opts) {
	var edges = objectedges()
	for (var i = 0; i < object.length; i++) {
		var proj = project(object[i], opts.size)
		ctx.beginPath()
		ctx.arc(proj.x + opts.x, proj.y + opts.y, opts.corner_radius, 0, 2 * Math.PI)
		ctx.fill()
	};
	ctx.lineWidth = opts.line_width || 1
	ctx.beginPath()
	for (var i = 0; i < edges.length; i++) {
		var v1 = project(object[edges[i][0]], opts.size),
			v2 = project(object[edges[i][1]], opts.size)
		ctx.moveTo(v1.x + opts.x, v1.y + opts.y)
		ctx.lineTo(v2.x + opts.x, v2.y + opts.y)
	};
	ctx.stroke()
}


// cool object mouse follow
var mouse = {
	x: 0,
	y: 0,
	direction: 0,

	start: {
		x: 0,
		y: 0
	},

	dragging: false,

	set: function (x, y) {
		mouse.x = x
		mouse.y = y
		mouse.direction = Math.atan2(y - mouse.start.y, x - mouse.start.x)
	},

	coords: function (e) {
		// e.preventDefault(); 
		if (e.pageX) {
			mouse.set(e.pageX, e.pageY)
		}
		else if (e.offsetX) {
			mouse.set(e.offsetX, e.offsetY)
		}
		else if (e.layerX) {
			mouse.set(e.layerX, e.layerY)
		}
		else if (e.targetTouches && e.targetTouches.length > 0) {
			mouse.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY)
		}
	},

	down: function (e) {
		mouse.coords(e)
		mouse.start.x = mouse.x
		mouse.start.y = mouse.y
		mouse.dragging = true
		// console.log(e)

	},

	up: function (e) {
		mouse.coords(e)
		mouse.dragging = false
	}
}

document.addEventListener("touchstart", mouse.down, true);
document.addEventListener("touchend", mouse.up, true);
document.addEventListener("touchmove", mouse.coords, true);

document.addEventListener("mousedown", mouse.down, true);
document.addEventListener("mouseup", mouse.up, true);
document.addEventListener("mousemove", mouse.coords, true);
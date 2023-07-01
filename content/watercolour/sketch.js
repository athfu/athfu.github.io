var globalP = null;
function sketch(p) {
	globalP = p;
	console.log(p);
	const MAX_RECURSION_DEPTH = 3;
	const VARIANCE = 1.05;

	const BASE_DEFORMATIONS = 3;
	const LAYER_DEFORMATIONS = 5;
	const NUM_LAYERS = 10;
	const STROKE_OPACITY = 5;
	const LAYER_OPACITY = 2;

	const COLOR_CENTER = p.random(0, 360);

	p.setup = () => {
		let canvas = p.createCanvas(600, 600);
		p.colorMode(p.HSB, 360, 100, 100, 100);
		p.noLoop();
		// setTimeout(() => {
		// 	p.saveCanvas(canvas, "myCanvas", "jpg").then((filename) => {
		// 		console.log("saved the canvas as ${filename}");
		// 	});
		// }, 2000);
	};

	p.draw = () => {
		p.background(1100);
		console.log(p._colorMaxes);

		const n = 25;
		// p.blendMode(p.MULTIPLY);
		for (let i = 0; i < n; i += 1) {
			drawSplotch(Math.random() * p.width, Math.random() * p.height);
		}
	};

	function generatePolygon(n, radius, centerX, centerY) {
		let polygon = [];
		let angle = p.TWO_PI / n; // angle between adjacent vertices

		for (let i = 0; i < n; i++) {
			let x = centerX + p.cos(i * angle) * radius;
			let y = centerY + p.sin(i * angle) * radius;
			let vertex = p.createVector(x, y);
			vertex.variance = p.random(0.5, 2); // Assign a random variance value to each vertex
			polygon.push(vertex);
		}

		return polygon;
	}

	function drawSplotch(x, y) {
		radius = 200;
		let polygon = generatePolygon(8, radius, x, y);

		let basePolygon = polygon;
		basePolygon = deformPolygon(basePolygon, BASE_DEFORMATIONS);

		hsb = [p.random(0, 360), p.random(30, 60), p.random(90, 100)];
		// hsb = hsb.map((c) => Math.floor(c));
		const strokeOpacity = Math.random() * STROKE_OPACITY;
		const fillOpacity = Math.random() * LAYER_OPACITY;

		for (let i = 0; i < NUM_LAYERS; i++) {
			//let layerPolygon = basePolygon.map(v => v.copy())
			let layerPolygon = basePolygon.map((v) => copyVectorWithVariance(v));
			layerPolygon = deformPolygon(layerPolygon, LAYER_DEFORMATIONS);

			p.fill(...hsb, fillOpacity);

			p.strokeWeight(1);
			p.stroke(...hsb, strokeOpacity);
			drawPolygon(layerPolygon);
		}
	}

	function drawPolygon(deformedPolygon) {
		p.beginShape();
		for (const point of deformedPolygon) {
			p.vertex(point.x, point.y);
		}
		p.endShape(p.CLOSE);
	}

	function copyVectorWithVariance(vector) {
		let newVector = vector.copy();
		newVector.variance = vector.variance;
		return newVector;
	}

	function deformPolygon(polygon, recursionDepth) {
		if (recursionDepth === 0) {
			return polygon;
		}

		let deformedPolygon = [];

		for (let i = 0; i < polygon.length; i++) {
			let a = polygon[i];
			let c = polygon[(i + 1) % polygon.length];
			let b = p5.Vector.add(a, c).mult(0.5);

			let d = p5.Vector.sub(b, a);
			let segmentVariance = (a.variance + c.variance) * 0.5 * VARIANCE;
			let perpendicularVector = p.createVector(d.y, -d.x);
			perpendicularVector.mult(segmentVariance);
			let randomAngle = p.random(-p.PI / 2, p.PI / 2);
			perpendicularVector.rotate(randomAngle);

			let bPrime = p5.Vector.add(b, perpendicularVector);
			bPrime.variance = segmentVariance * 0.9 * p.random(0.9, 1.1); // Decrease and slightly randomize the variance for child vertices

			a.variance *= 0.9 * p.random(0.9, 1.1); // Decrease and slightly randomize the variance for parent vertices

			deformedPolygon.push(a);
			deformedPolygon.push(bPrime);
		}

		return deformPolygon(deformedPolygon, recursionDepth - 1);
	}
}

function renderWatercolor() {
	var myp5 = new p5(sketch, "sketch");
}

renderWatercolor();

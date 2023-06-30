function getDifferenceInDays(start, end) {
	let s = new Date(start);
	let e = new Date(end);
	const numOfDays = (e - s) / 86400000 + 1;
	return numOfDays;
}

function getEmptyStartDays(start) {
	let d = new Date(start);
	return d.getDay();
}

function getEmptyEndDays(end) {
	let d = new Date(end);
	return 6 - d.getDay();
}

function getDayOfWeek(date) {
	let d = new Date(date);
	let dayOfWeek = d.getDay();
	return dayOfWeek;
}

function getWeeks(start, end) {
	const numOfFullDays =
		getDifferenceInDays(start, end) +
		getEmptyStartDays(start) +
		getEmptyEndDays(end);
	const numOfWeeks = Math.ceil(numOfFullDays / 7);
	return numOfWeeks;
}

function getDate(start, days) {
	let today = new Date();
	const timezoneOffset = today.getTimezoneOffset() * 60 * 1000;
	let d = new Date(start);
	let numberOfDays = days * 86400000;
	let date = new Date(d.getTime() + numberOfDays - timezoneOffset);
	date = date.toISOString().split("T")[0];
	return date;
}

function getStartDate(allCounts) {
	return allCounts[0].date;
}

function getEndDate() {
	//end date should be the current day
	let today = new Date();
	const timezoneOffset = today.getTimezoneOffset();
	today = new Date(today.getTime() - timezoneOffset * 60 * 1000);
	const day = today.toISOString().split("T")[0];
	return day;
}

function labelMonths(allCounts, squareSize, padding, svgns, svg) {
	const months = [
		"jan",
		"feb",
		"mar",
		"apr",
		"may",
		"jun",
		"jul",
		"aug",
		"sep",
		"oct",
		"nov",
		"dec",
	];
	let startDate = getStartDate(allCounts);
	let endDate = getEndDate();
	const emptyStartDays = getEmptyStartDays(startDate);
	// get the end of week before the start date
	startingDay = getDate(startDate, -emptyStartDays - 1);
	let numOfWeeks = getWeeks(startDate, endDate);
	let currentMonth = 0;
	//ignore the last week
	for (let weekIndex = 1; weekIndex < numOfWeeks; weekIndex++) {
		endOfWeek = getDate(startingDay, 7 * weekIndex);
		console.log(endOfWeek);
		if (getMonth(endOfWeek) > currentMonth) {
			currentMonth = getMonth(endOfWeek);
			let newLabel = document.createElementNS(svgns, "text");
			newLabel.setAttribute("id", "monthLabel");
			newLabel.setAttribute("x", "180");
			newLabel.setAttribute("y", (squareSize + padding) * weekIndex);
			newLabel.textContent = months[currentMonth - 1];
			svg.appendChild(newLabel);
		}
	}
}

function getMonth(date) {
	if (date[5] == 0) {
		return date[6];
	} else {
		return date[5] + date[6];
	}
}

function hideTooltip() {
	let tooltip = document.getElementById("tooltip");
	tooltip.setAttribute("visibility", "hidden");
}

function drawSquares(allCounts, squareSize, padding, svgns, svg) {
	let startDate = getStartDate(allCounts);
	let endDate = getEndDate();

	const numOfDays = getDifferenceInDays(startDate, endDate);
	const emptyStartDays = getEmptyStartDays(startDate);

	function showTooltip(event, { date, dayCount }) {
		let tooltip = document.getElementById("tooltip");
		let tooltipText = document.getElementById("tooltip-text");
		let tooltipRect = document.getElementById("tooltip-rect");
		if (dayCount === 1) {
			tooltipText.textContent = `${date}: ${dayCount} word`;
			tooltipRect.setAttribute("width", 160);
		} else if (dayCount < 10) {
			tooltipText.textContent = `${date}: ${dayCount} words`;
			tooltipRect.setAttribute("width", 169);
		} else if (dayCount > 99) {
			tooltipText.textContent = `${date}: ${dayCount} words`;
			tooltipRect.setAttribute("width", 186);
		} else {
			tooltipText.textContent = `${date}: ${dayCount} words`;
			tooltipRect.setAttribute("width", 178);
		}

		var CTM = svg.getScreenCTM();

		var mouseX = (event.clientX - CTM.e) / CTM.a;
		var mouseY = (event.clientY - CTM.f) / CTM.d;
		let x = mouseX + 6 / CTM.a;
		let y = mouseY + 20 / CTM.d;

		tooltip.setAttributeNS(null, "transform", "translate(" + x + " " + y + ")");
		tooltip.setAttributeNS(null, "visibility", "visible");
	}

	let tooltip = document.getElementById("tooltip");
	tooltip.remove();
	for (let n = 0; n < numOfDays; n++) {
		let newSquare = document.createElementNS(svgns, "rect");
		let date = getDate(startDate, n);
		let dayOfWeek = getDayOfWeek(date);
		newSquare.setAttribute("id", date);
		let dayCount = 0;
		for (let i = 0; i < allCounts.length; i++) {
			if (allCounts[i].date === date) {
				dayCount = allCounts[i].count;
				break;
			}
		}

		newSquare.setAttribute("x", (squareSize + padding) * dayOfWeek);
		newSquare.setAttribute(
			"y",
			(squareSize + padding) * Math.floor((n + emptyStartDays) / 7)
		);
		newSquare.setAttribute("width", squareSize);
		newSquare.setAttribute("height", squareSize);
		newSquare.addEventListener("mousemove", (e) =>
			showTooltip(e, { date, dayCount })
		);
		newSquare.addEventListener("mouseout", hideTooltip);

		//max number of words
		const maxCount = Math.max(...allCounts.map((d) => d.count));
		let ratio = dayCount / maxCount;

		//min and max HSL
		const maxLight = 90;
		const minLight = 5;

		const maxSat = 90;
		const minSat = 5;

		const maxHue = 330;
		const minHue = 60;

		//fill squares based on word count
		// let color = `hsl(280,${(1 - ratio) * maxSat + minSat}%, ${
		// 	(1 - ratio) * maxLight + minLight
		// }%)`;
		let color = `hsl(${ratio * maxHue + minHue}, 85%, 75%)`;

		newSquare.setAttribute("fill", color);
		svg.appendChild(newSquare);
	}
	svg.appendChild(tooltip);
}

function drawHeatMap(allCounts) {
	const svgns = "http://www.w3.org/2000/svg";
	const svg = document.querySelector("svg");

	//squares
	const padding = 5;
	let squareSize = 20;

	//render squares
	drawSquares(allCounts, squareSize, padding, svgns, svg);
	labelMonths(allCounts, squareSize, padding, svgns, svg);
}

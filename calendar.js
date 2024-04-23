// Holidays data: https://isdayoff.ru/
function calendar (year = new Date().getFullYear(), month = new Date().getMonth()+1, container = undefined) {
	var style = document.createElement("style");
		style.innerHTML = 
			"th{text-align:center;}"+
			"td{padding:5px;text-align:right;background:#eee;border-radius:8px;width:3em;}"+
			"table{border-collapse:separate;border-spacing:5px;}";
	var shift = new Date(year, month-1, 1).getDay()-1;
	var thead = document.createElement("thead");
		thead.innerHTML = "<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>";
	var tbody = document.createElement("tbody");
	var table = document.createElement("table");
		table.appendChild(style);
		table.appendChild(thead);
		table.appendChild(tbody);
	fetch("https://isdayoff.ru/api/getdata?year="+year+"&month="+("0" + month).slice(-2)+"&cc=ru")
		.then(resp => resp.text())
		.then(data => data.split("").map(i => Number(i)))
		.then(days => "<tr>"+
			Array.from({length: shift}).map(a => "<td></td>").join("") + 
			days.map((day, i) => "<td" + (day ? " style='color: red'>" : ">")+(i+1)+"</td>" + (((i+1+shift)%7 === 0) ? "</tr><tr>" : "")).join("") +"</tr>")
		.then(tcontent => tbody.innerHTML = tcontent);
	if (container) container.appendChild(table);
	return table;
}

let publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1UfXhl1w-qtxRgiohj9VcfX0G0RsD1ZDgyiJv2MjvoiU/edit?usp=sharing';
let seriesIds = ['LNS12300060', 'LNS12032194', 'CES0500000003'];

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true 
  });
}

function showInfo(data, tabletop) {
  displayInfo(data)
}

function displayInfo(data) {
  seriesIds.forEach((id) => {
    const seriesData = data.filter((row) => row['indicator_id'] === id );
    var svg = dimple.newSvg("body", 800, 600);
    var chart = new dimple.chart(svg, seriesData);
    const xAxis = chart.addCategoryAxis("x", "date");
    xAxis.title = 'Month'
    const yAxis = chart.addMeasureAxis("y", "value");
    let values = seriesData.map((sd) => sd['value'])
    
    chart.addSeries("indicator_id", dimple.plot.area);
    chart.draw();
  });
}

window.addEventListener('DOMContentLoaded', init)
class View {
    static activeCharts = {};

    static drawCustom = function(items, quantity) {
        items.forEach(item => 
            document.getElementById(Global.DIV_CUSTOM).innerHTML += 
                Global.TEMPLATE_CUSTOM(
                    this.item = item.itemId, 
                    this.stackValue = Math.round(item.averageValue*quantity).toLocaleString(),
                    this.quantity = quantity,
                    this.weightValue = item.valueByWeight.toLocaleString()
                )
        );
    };

    static drawData = function(items, sortParam, title, chartDiv, rawDiv, skipLow, skipHigh) {
        items.sort((a, b) => a[sortParam] - b[sortParam]);
        var chartData = [[Global.TITLE_ENTRY, title]];
        var count = items.length;

        for (let i = skipLow; i < count-skipHigh; i++) {
            if (items[i][sortParam] > 0) {
                chartData.push([items[i].itemId, items[i][sortParam]]);
            }
        }
        
        var data = google.visualization.arrayToDataTable(chartData);
        View.activeCharts[chartDiv] ?? (View.activeCharts[chartDiv] = new google.charts.Bar(document.getElementById(chartDiv)));
        View.activeCharts[chartDiv].draw(data, {title: title});
        
        document.getElementById(rawDiv).innerHTML = '';
        for (let i = count - 1; i >= 0; i--) {
            var rawData = Global.TEMPLATE_RAW(
                this.item = items[i].itemId, 
                this.value = items[i][sortParam].toLocaleString(), 
                this.title = title
            );
            if (i > (count - 1) - skipHigh || i < skipLow || items[i][sortParam] == 0) {
                rawData = Global.TEMPLATE_SKIP(rawData);
            }
            document.getElementById(rawDiv).innerHTML += rawData;
        }
    };
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url, true);
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(xhr.response);
        }
    }
    xhr.send();
};

var loadFile = function(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', filePath, false);
    xmlhttp.setRequestHeader('Accept', 'Content-Type: "text/plain"');
    xmlhttp.send(null);
    if (xmlhttp.readyState==4) {
        result = xmlhttp.response;
    }
    return result;
};

var normalizeValues = function(array) {
    var max = Math.max(...array);
    var min = Math.min(...array);
    var range = max - min;
    return array.map(v => (v - min) / range);
};
function exportTable(filename) {
    removeOtherExporters();
    var settings = { formats: ['xls'], filename: filename, trimWhitespace: true };
    var Table = document.getElementsByTagName("table");
    setTimeout(() => {
        exportInstance = TableExport(Table, settings);
    }, 500);
}

function removeOtherExporters() {
    while (document.getElementsByClassName("button-default xls").length != 0) {
        document.getElementsByClassName("button-default xls")[0].remove();
    }
}

exportInstance = ''
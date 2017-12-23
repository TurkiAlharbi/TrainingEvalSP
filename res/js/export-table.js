exportInstance = '';

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

function exportTableById(filename, id) {
    removeOtherExporters();
    var settings = { formats: ['xls'], filename: filename, trimWhitespace: true };
    var Table = document.getElementById(id);
    return TableExport(Table, settings);
}

function exportTable2(filename) {
    removeOtherExporters();
    var settings = { formats: ['xls'], filename: filename, trimWhitespace: true };
    var Table = document.getElementsByTagName("table");
    return TableExport(Table, settings);
}
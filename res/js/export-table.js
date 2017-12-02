function exportTable(filename) {
    setTimeout(() => {
        settings = { formats: ['xls'], filename: filename, trimWhitespace: true };
        TableExport(document.getElementsByTagName("table"), settings);
    }, 500);
}
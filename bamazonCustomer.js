var mysql = require('mysql');
var Table = require('easy-table')
var con = mysql.createConnection({
    host: "192.168.99.100",
    port: 3306,
    user: "root",
    password: "docker",
    database: "bamazon"
});
con.connect(function (err) {
    if (err) throw err;

    var sql = "SELECT * FROM bamazon.products;";

    con.query(sql, function (err, result) {
        if (err) throw err;
        var t = new Table

        result.forEach(function (product) {
            t.cell('Product Id', product.id)
            t.cell('Product Name', product.product_name)
            t.cell('Price', product.price, Table.number(2))
            t.newRow()
        })

        console.log(t.toString())
    });
});
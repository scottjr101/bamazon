var mysql = require('mysql');
var Table = require('easy-table')
var inquirer = require('inquirer');
var pool = mysql.createPool({
    connectionLimit : 10,
    host: "192.168.99.100",
    port: 3306,
    user: "root",
    password: "docker",
    database: "bamazon"
});

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
};

function askUser() {

    inquirer.prompt([
    {
        type: 'input',
        name: 'id',
        message: 'Please enter the ID which you would like to purchase.',
        validate: validateInput,
        filter: Number
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate: validateInput,
        filter: Number
    }
    ]).then(function(input) {

        var item = input.id;
        var quantity = input.quantity;
        var queryStr = 'SELECT * FROM bamazon.products WHERE ?';

        pool.query(queryStr, {id: item}, function(err, data) {
			if (err) throw err;

			// If the user has selected an invalid item ID, data attay will be empty
			// console.log('data = ' + JSON.stringify(data));

			if (data === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid ID.');
				Inventory();

			} else {
				var productData = data[0];

				// console.log('productData = ' + JSON.stringify(productData));
				// console.log('productData.stock_quantity = ' + productData.stock_quantity);

				// If the quantity requested by the user is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you requested is in stock! Placing order!');

					// Construct the updating query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE id = ' + item;
					// console.log('updateQueryStr = ' + updateQueryStr);

					// Update the inventory
					pool.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log("\nYour order has been placed! Your total is $" + productData.price * quantity);
						console.log("\nThank you for shopping with us!");
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.release();
					})
				} else {
					console.log('\nInsufficient quantity!');
					console.log('\nPlease modify your order.');
					console.log("\n---------------------------------------------------------------------\n");
                    
					Inventory();
				};
			}
		})
    });

};

function Inventory() {
pool.getConnection(function (err, connection) {
    if (err) throw err;

    var sql = "SELECT * FROM bamazon.products;";

    connection.query(sql, function (err, result) {
        if (err) throw err;
        var t = new Table

        result.forEach(function (product) {
            t.cell('Product Id', product.id)
            t.cell('Product Name', product.product_name)
            t.cell('Price', product.price, Table.number(2))
            t.newRow()
        })
        console.log(t.toString());
        askUser();
    });
 });

};

function runBamazon() {
	// Display the available inventory
	Inventory();
}

// Run the application logic
runBamazon();

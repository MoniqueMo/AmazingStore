// pull in required dependencies
var inquirer = require ("inquirer");
var mysql = require ("mysql");
var Table = require ("cli-table");

// mySQL connection parameters
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "6Dwy&7nw",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to bamazon database id " + connection.threadId + "\n")
});

//Prints available Products
connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log("----------------------------------| Bamazon! |----------------------------\n");
    console.log("\n-------------------------------- CURRENT PRODUCTS -------------------------------------\n");

// For look to display all current items in the products table.
var table = new Table({
    head: ["Product Id", "Product Name", "Department","Price","Stock Quantity"]

});
for (var i = 0; i < res.length; i++){
    table.push([res[i].id, res[i].product_name, res[i].department_name, "$" + res[i].price, res[i].stock_quantity]);
}
console.log(table.toString() + "\n" +
"\n----------------------------------------------------------------------------------------------------\n");
});

//User Prompt to purchase item by Id
function purchaseItem() {
    connection.query("SELECT * FROM products", function (err, res){
        if (err) throw err;
        inquirer.prompt([{
            type: "input",
            name: "product_id",
            message: "Please enter Product ID of the Item you would like to buy.",
            validate: function (value){
                if(isNaN(value) === false) {
                    return true;
                }
                console.log("Please input ID from the Product Id's within the list above.")
            },
            filter: Number
        },
        { 
            type: "input",
            name: "quantity",
            message: "How many would you like to buy?",
            validate: function (value) {
                if(Number.isInteger(value)){
                    return true;
                }
                console.log("try agian with a valid number.")
            },
            filter: Number
        }
    ]).then(function(answers) {
        var item = answers.product_id;
        var quantity = answers.quantity;

        var selectedItem;
        for(var i = 0; i < res.length; i++){
            if(res[i].id === item) {
                selectedItem = res[i];
            }
        }
        //printing grand total to display in the cole

        var itemTotal = parseFloat((selectedItem.price) * quantity).toFixed(2);
        console.log("\nItems Purchased: \n" +
        "\nProduct Id: " + item +
        "\nProduct :" + selectedItem.product_name +
        "\nQuantity: " + quantity);

        if(quantity <= selectedItem.stock_quantity) {
            var newQuantity = (selectedItem.stock_quantity - quantity);
            console.log("\nThe item you selected is in stock and has been place to order!" + 
            "\nYour TOTAL is: $" + itemTotal + "\n ");

         //needs to update inventory database
         connection.query("UPDATE products SET ? WHERE ?",
         [{
             stock_quantity: newQuantity
            },
            {
             id: item
            }
        ],

        function (err, res) {
            if (err) throw err;
            console.log("your has been placed!" +
            "\n thank for shopping at bamazon!\n" +
            "\n---------------------------------------------------------------------\n");
        });   
        } else {
            console.log("\n sorry... we are out of stock or do not have the amount you have purchased." +
            "\nCurrent Inventory: " + selectedItem.stock_quantity + "units in stock." +
            "\n----------------------------------------------------------------------------\n");
            purchaseItem();

        }

    });
    });
}

purchaseItem();


const controller = {};

controller.list = (req, res) => {         //For now  we have not path to display for that reason we are just sending Hello World
    req.getConnection((err,conn) => {                  //callback function
        conn.query("SELECT *  FROM customer", (err, customers) => {          //The result we will call it customers
            if (err){
                res.json(err);
            }
            res.render("customers", {                   //Render the response from the view engine customers.ejs
                data: customers                         //We specify that the data to receive will be just customers
            });                            
        });        
    });
}; 
controller.save = (req, res) =>{
         //console.log(req.body)          //we are receiving the data from an request object called body
          //To save the data we have to set the connection with mysql
       // res.send("works")
        const data = req.body;
        req.getConnection((err, conn) => {
            ////we just have an object with one set of information, in case we have more we use more ? which means data
           conn.query("INSERT INTO customer set ?", [data], (err, customer) =>{//customer is a name we just set to call the rows with data
            console.log(customer);
            //res.send("works");
            res.redirect("/");
            });
        })
};

controller.edit = (req, res) =>{
    const{id} = req.params;
    req.getConnection((err,conn) =>{
        conn.query("SELECT * FROM customer WHERE id = ?", [id], (err, customer) => {
            res.render("customer_edit", {
                data: customer[0]
            });
        });
    });
};



controller.update = (req, res) =>{
    const{id} = req.params;
    const newCustomer = req.body;
    req.getConnection((err,conn) => {
        conn.query("UPDATE customer set ? WHERE id = ?", [newCustomer,id], (err,rows) => {
            res.redirect("/");
        })
    })
};



controller.delete = (req, res) =>{
    //console.log(req.params.id)           //prints the parameter received because is coming from a url
    //res.send("works");
    const{id} = req.params;
    req.getConnection((err,conn) => {
        conn.query("DELETE FROM customer WHERE id = ?", [id], (err,rows) =>{
            res.redirect("/");
        });
    })
};

module.exports = controller;
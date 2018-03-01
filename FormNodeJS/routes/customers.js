
/*get list of customers */
exports.list = function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query("Select * from customer", function (err, rows) {
            if (err)
                console.log('error is : %s', err);
            res.render('customers', { page_title: 'Customers List', data: rows });
        });
    });
};

/* add customers */
exports.add = function (req, res) {
    res.render('add-customer', {page_title:'add customers'});
};


exports.edit = function (req, res) {
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var query = connection.query('select * from customer where id=?', [id], function (err, rows) {
            if (err)
                console.log('error is : %s', err);
            res.render('edit-customer', {page_title:'edit customer', data: rows });
        });
    });
};


/* save customers */

exports.save = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone
        };

        var query = connection.query("Insert into customer set ? ", data, function (err, rows) {
            if (err)
                console.log("error inserting : %s", err);
            res.redirect('/customers');
        });
    });
};

exports.save_edit = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone
        };

        connection.query('Update customer set ? where id = ?', [data, id],
            function (err, result) {
                if (err)
                    console.log("error is : %s", err);
                res.redirect('/customers');
            });
    });
};

exports.delete_customer = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query('Delete from customer where id = ?', [id], function (err, rows) {
            if (err)
                console.log('error is : %s', err);
            res.redirect('/customers');
        });
    });
};
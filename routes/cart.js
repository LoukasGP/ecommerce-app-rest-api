const express = require("express");
const { pool } = require("../config");
const cartRouter = express.Router();
const {ensureAuthentication} = require('./login')



//get the users carts
cartRouter.get('/' ,ensureAuthentication ,(req,res) => {
    const requestedCart = Number(req.user.id)
    console.log(req.user)
    pool.query('SELECT * FROM cart WHERE user_id = $1' , [requestedCart] , function(err, data){
        // console.log(data)
        if(err){
            console.log(err)
            res.send('There was a problem retrieving that cart')
        } else {
            if(data.rowCount === 0){
                res.send('That cart does not exist')
            } else {
                res.send(data.rows)
            }
        }
    })
})

// view items in a specific cart 
// SQL query for this function: select users.first_name, users.last_name , cart.id as cart_id, product.name as product_name, product.description ,product.quantity from users join cart on users.id = cart.user_id join cart_item on cart.id = cart_item.cart_id join product on product.id = cart_item.product_id
cartRouter.get('/:cartId',ensureAuthentication ,(req,res) => {
    const requestedCart = Number(req.params.cartId)
    pool.query('select users.first_name, users.last_name , cart.id as cart_id, product.name as product_name, product.description ,product.quantity from users join cart on users.id = cart.user_id join cart_item on cart.id = cart_item.cart_id join product on product.id = cart_item.product_id WHERE cart.id = $1' , [requestedCart] , 
    function (err, data){
        if(err){
            console.log(err);
            res.send("Something Went Wrong")
        } else {
            if (data.rowCount === 0){
                res.send('There is nothing in this cart')
            } else {
                res.send(data.rows)
            }
        }
    }
    )
})


//edit item quantity
//delete an item from the cart
// Checkout


module.exports = cartRouter;
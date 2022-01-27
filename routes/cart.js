
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
    pool.query('select users.first_name, users.last_name , cart.id as cart_id, product.name as product_name, product.description from users join cart on users.id = cart.user_id join cart_item on cart.id = cart_item.cart_id join product on product.id = cart_item.product_id WHERE cart.id = $1' , [requestedCart] , 
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

/* place item in the cart 
 need to check to make sure that item exists first 
then place it in the cart */
const getProductByName = (itemId ,done) => {
    // console.log(itemName) 
    pool.query( "SELECT * FROM product WHERE id = $1 ", [itemId] ,
    function(err, result ){
        if(err){
            console.log(err);
            done(err,null)
        } else {
            done(null , result)
        }
    }  ) 

}

const checkProductInCart = (cartId, productId ,done) => {
    pool.query("SELECT * FROM cart_item WHERE cart_id = $1 AND product_id = $2 " , [cartId ,productId] ,
    function (err, result){
        if(err){
            console.log(err)
            done(err,null);
        } else {
            done(null,result);
        }
    })
}

// needs to be tested
cartRouter.post('/:cartId' , (req,res) => {
    const  itemId = req.body.itemId
    // console.log(itemName)
      getProductByName(itemId, function(err, result){
          if(err){
              throw err
          } else {
            if(result.rowCount === 0){
                res.send("Item is not in the database")
          } else {
                pool.query('INSERT INTO cart_item (product_id, cart_id) VALUES ($1 , $2)' ,[ result.rows[0].id , req.params.cartId ],
                function(err, result){
                    if(err){
                        console.log(err)
                        res.send("There was a problem adding item to your cart")
                    } else {
                        res.send("Item added successfully")
                    }
                }
                )
            }
          }
      })
})

//delete an item from the cart
cartRouter.delete('/:cartId',ensureAuthentication ,(req,res) =>{
    const productId = req.body.productId
    const cartId = req.params.cartId
    // console.log(productId)
    checkProductInCart(cartId ,productId ,function(err, result){
        if(err){
            throw err
        } else {
            if(result.rowCount === 0){
                res.send("Item is not in this cart")
            } else {
                pool.query('DELETE FROM cart_item WHERE product_id = $1' ,[productId] ,function(err,result){
                    if(err){
                        console.log(err)
                        res.send("There was a problem deleting this item")
                    } else {
                        res.send("Item deleted successfully")
                    }
                })
            }
        }
    } )
})



cartRouter.get('/:cartId/checkout',ensureAuthentication ,(req,res) =>{
    // a total would also be added up as well
    const requestedCart = Number(req.params.cartId)
    pool.query('select users.first_name, users.last_name , cart.id as cart_id, product.name as product_name, product.description ,product.price,product.quantity from users join cart on users.id = cart.user_id join cart_item on cart.id = cart_item.cart_id join product on product.id = cart_item.product_id WHERE cart.id = $1',[requestedCart],
    function(err,data){
      if(err){
          console.log(err)
      } else {
        //   console.log(data)
        let price = 0 ;
        let productsPurchased =[];
        for(let i=0 ; i< data.rows.length ; i++){
            
            price = price + parseInt(data.rows[i].price);
            console.log(parseInt(data.rows[i].price))
            productsPurchased.push(data.rows[i].product_name)
            
        }
        const sendMe = [price,productsPurchased]
        res.send(sendMe)
      }
    })
})



module.exports = cartRouter;
let productsElt = JSON.parse(localStorage.getItem("products"));

function displayProductInCart (product) {
    
    const templateEltCart = document.getElementById("templateCart");
    const cloneEltCart = document.importNode(templateEltCart.content, true);
    
    cloneEltCart.querySelector("#name").textContent = product.productName,
    cloneEltCart.querySelector("#qty").value = product.productQty,
    cloneEltCart.querySelector("#price").textContent = product.productPrice,
    cloneEltCart.querySelector("#option").textContent = product.productOption,
    cloneEltCart.querySelector("#amount").textContent = product.productQty * parseInt(product.productPrice),
   
    document.getElementById("cart__container").appendChild(cloneEltCart);   

};



function displayProducts (){

    if (productsElt === null){
        const templateEltCart = document.getElementById("templateCart");
        const cloneEltCart = document.importNode(templateEltCart.content, true);

        cloneEltCart.getElementById("cart-empty").textContent += "Oups ! Votre panier est vide";
            document.getElementById("cart__container").appendChild(cloneEltCart);
    } else {
        for(i = 0; i < productsElt.length; i++){                    
           displayProductInCart(productsElt[i]);
           
        }              
    }  
}
 displayProducts() ;   
 


 // Mettre la quantité dans une variable

 
   

/*
    let quantity = document.querySelectorAll(".qtyrow");
    let priceProduct = parseInt(document.querySelectorAll(".pricerow").textContent);
    let priceQty = document.querySelectorAll(".amountrow");
    let result = document.querySelectorAll(".amountrow").textContent ;
     
        quantity.forEach(quantity =>{
            quantity.addEventListener("change", Event =>{
                quantitySelect = Number(Event.target.value);
                result = quantitySelect * priceProduct;
                priceQty.textContent = Number(result);
                console.log(quantitySelect);
                console.log(typeof result);
                console.log(typeof quantitySelect);
                console.log(typeof priceProduct);
                console.log(result);
            });
            return result
        })
        
 ------------------------------      
 function amountRow () {
    let inputQty = document.getElementById("qty").value,
               
        priceProduct = parseFloat(document.getElementById("price").textContent),
        result = document.getElementById("amount").value ;
        
        result = parseFloat(document.getElementById("qty").value * Number(document.getElementById("price").value));
    console.log(result);

 };

 
 amountRow();
//-------------------------------------

  let input = document.querySelectorAll(".qtyrow");
 const priceProduct = parseFloat(document.querySelectorAll(".pricerow").textContent);
 let result = document.querySelectorAll(".amountrow").value ;
 let priceQty = document.querySelectorAll(".amountrow");

___________
 document.querySelectorAll(".qtyrow").forEach(input => {
     input.addEventListener("input", e =>{
         quantitySelect = e.target.value;
         result = quantitySelect * priceProduct;
         priceQty.textContent = result;
     })
     return result
 })
________________________

 

 input.addEventListener("input", e => {
     quantitySelect = e.target.value
     console.log(quantitySelect)

     result = quantitySelect * priceProduct;
     priceQty.textContent = result;
     console.log(input.value);


 }) 

*/

    

     
 

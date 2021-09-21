
let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
cartItems = Object.values(cartItems);

//console.log(Object.values(cartItems));
//console.log(cartItems);
//console.log(typeof cartItems);

function displayProductInCart (cartItems) {

    const templateEltCart = document.getElementById("templateCart");
    const cloneEltCart = document.importNode(templateEltCart.content, true);
    
    cloneEltCart.getElementById("img").src = cartItems.image,
    cloneEltCart.getElementById("name").textContent = cartItems.name,
    cloneEltCart.querySelector("#qty").textContent = cartItems.inCart,
    cloneEltCart.querySelector("#price").textContent = cartItems.price,
    cloneEltCart.querySelector("#option").textContent = cartItems.option,
    cloneEltCart.querySelector("#amount").textContent = cartItems.inCart * parseInt(cartItems.price) + " €",
   
    document.getElementById("cart__container").appendChild(cloneEltCart);   
};

function displayProducts (){

    if (cartItems === null){
        const templateEltCart = document.getElementById("templateCart");
        const cloneEltCart = document.importNode(templateEltCart.content, true);

        cloneEltCart.getElementById("cart-empty").textContent += "Oups ! Votre panier est vide";
            document.getElementById("cart__container").appendChild(cloneEltCart);
    } else {
        for(i = 0; i < cartItems.length; i++){                    
           displayProductInCart(cartItems[i]);
           
        }              
    }  
}
//------------- fonction pour afficher le montant total du panier-------

function displayTotalCost() {

    let cartCost =localStorage.getItem("totalCost");
    
    console.log("my cartCost is", cartCost);
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        const templateEltCart = document.getElementById("templateTotalCart");
        const cloneEltCart = document.importNode(templateEltCart.content, true);
        
        cloneEltCart.getElementById("total-amount").textContent += cartCost + ",00 €";
        document.getElementById("total__amount").appendChild(cloneEltCart);
    } else {
        const templateEltCart = document.getElementById("templateTotalCart");
        const cloneEltCart = document.importNode(templateEltCart.content, true);

        cloneEltCart.getElementById("total-amount").textContent += "0,00 €";
            document.getElementById("total__amount").appendChild(cloneEltCart);
    }
};

 displayProducts() ;   
 displayTotalCost();
//----------------------------- Essais code --------------------------
// on va créer une fonction pour afficher les articles qui sont ds le localStorage et ns allons l'appeler au chargemt de la page
// Et on verifie si il y a ds articles au LS -sinon erreur

/*
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".productCart");
    console.log(cartItems);
    if(cartItems && productContainer) {
        console.log("running");
        productContainer.innerText = "";
        Object.values(cartItems).map(item => {

        const templateEltCart = document.getElementById("templateCart");
        const cloneEltCart = document.importNode(templateEltCart.content, true);
        
        cloneEltCart.querySelector("#name").textContent = item.name,
        cloneEltCart.querySelector("#qty").value = item.inCart,
        cloneEltCart.querySelector("#price").textContent = item.price,
        cloneEltCart.querySelector("#option").textContent = item.option,
        cloneEltCart.querySelector("#amount").textContent = item.qty * parseInt(cartItems.price),
       
        document.getElementById("cart__Container").appendChild(cloneEltCart);
        });
    }

   
}

displayCart();

*/
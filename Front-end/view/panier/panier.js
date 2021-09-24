function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers")

    if(productNumbers) {
        document.querySelector("#spanCart").textContent = productNumbers;
    }
}

// Fonction pour affichage des produits sur page panier

function displayCart () {
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    let productContainer = document.querySelector("#templateCart");
    // console.log(cartItems);
    if (cartItems && productContainer) {
        // console.log("running");
        
        Object.values(cartItems).map(item => {
            const templateCart = document.getElementById("templateCart");
            const cloneEltCart = document.importNode(templateCart.content, true);

           
            cloneEltCart.getElementById("imgCart").src = item.image,
            cloneEltCart.getElementById("nameCart").textContent = item.name,
            cloneEltCart.getElementById("priceCart").textContent = item.price,
            cloneEltCart.getElementById("qtyCart").textContent = item.inCart,
            cloneEltCart.getElementById("optionCart").textContent = item.option,
            cloneEltCart.getElementById("amountCart").textContent = item.inCart * parseInt(item.price) +",00 €"

            document.getElementById("cart__container").appendChild(cloneEltCart);
        })  
         
    } else {
        let cartEmpty = document.getElementById("cart__container");
           cartEmpty.innerHTML = `<div id="cart-empty">Oups ! Votre panier est vide !</div>`;
    }
   
    displayTotalCost();
    deleteButtons (); 
}

//------------- fonction pour afficher le montant total du panier-------

function displayTotalCost() {

    let cartCost =localStorage.getItem("totalCost");
    
   // console.log("my cartCost is", cartCost);
    
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        const templateEltTotalCart = document.getElementById("templateTotalCart");
        const cloneEltTotalCart = document.importNode(templateEltTotalCart.content, true);
        
        cloneEltTotalCart.getElementById("total-amount").textContent += cartCost + ",00 €";
        document.getElementById("container__total").appendChild(cloneEltTotalCart);
    } else {
        const templateEltTotalCart = document.getElementById("templateTotalCart");
        const cloneEltTotalCart = document.importNode(templateEltTotalCart.content, true);

        cloneEltTotalCart.getElementById("total-amount").textContent += "0,00 €";
            document.getElementById("container__total").appendChild(cloneEltTotalCart);
    }
};

// fonction pour supprimer les produits du panier
// on créer une boucle pr chaque élément et on cible les éléments parents-on passe ensuite en minisucles et supprime les espaces
// On actualise ensuite le nombre de produits
// On doit convertir cartItems en JS


function deleteButtons() {
    
    let deleteButtons = document.querySelectorAll('.productCart i');
    let productName;
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    Object.values(cartItems).map(item => {
        let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');
            productName = JSON.stringify(productName);
            
            cartCost = parseInt(cartCost);
            item.price = parseInt(item.price)
            
            localStorage.setItem("cartNumbers", productNumbers - item.inCart);

            localStorage.setItem("totalCost", cartCost - (item.price * item.inCart));

            console.log(item.price);
            console.log( typeof cartCost);
            console.log(productName);
           
            
           localStorage.setItem("productsIncart", JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        });
        
    }
    })
   
}
   
 
onLoadCartNumbers();
displayCart ();


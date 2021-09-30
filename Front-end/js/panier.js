// Actualisation de l'icone du panier ds le header
onLoadCartNumbers();
// Constantes nécessaires
// let productContainer = document.querySelector("#cart__container");

const orderForm = document.querySelector(".orderForm");
const emptyCart = document.querySelector(".container__empty");

// Fonction pour affichage message si panier vide

if (cart.length < 1) {
    orderForm.classList.add("tohide");
    emptyCart.classList.add("cart-empty");
    // sinon affiche le tableau de produits
} else {
    orderForm.classList.add("tohide");
    emptyCart.classList.add("tohide");
    const fullCart = document.querySelector(".productsCart");
    fullCart.classList.remove("tohide");
    for(product of cart) {
        displayCart(product);
    }

    // ajout de produit
    function addProduct(event) {
        const index = event.target.getAttribute("data-index");
        cart[index].quantity++;
        localStorage.setItem("cameras", JSON.stringify(cart));
        location.reload();
    }

    const buttonAdd = document.querySelectorAll(".plus");
    for(add of buttonAdd) {
        add.addEventListener("click", addProduct);
    }

    // // supprimer un produit
    function subProduct(event) {
        const index = event.target.getAttribute("data-index");
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem("cameras", JSON.stringify(cart));
        location.reload();
    }

    const buttonSub = document.querySelectorAll(".minus");
    for(sub of buttonSub) {
        sub.addEventListener("click", subProduct);
    }

    // Affichage du prix total
    displayTotalCart();

    // fonction pour supprimer les produits du panier
    // console.log(cartItems.inCart)
    function remove(index){
        cart.splice(index, 1);
        // let productNumbers = localStorage.getItem("cartNumbers");
        // localStorage.setItem("cartNumbers", productNumbers - 1)
        localStorage.setItem("cameras", JSON.stringify(cart));
        location.reload();
        displayCart();
        onLoadCartNumbers();
    }

        
    // Fonction pour vider le panier avec le bouton
    const btnDeleteCart = document.querySelector("#clearCart");
    btnDeleteCart.addEventListener("click", () => {
        clearCart();
        location.reload();
    })
    
    
    
    // Fonction pour affichage du formulaire lors de la validation du panier
    
    const validateCart = document.querySelector(".validate-cart");
    const hideBtns = document.querySelector(".hideButtons")
    validateCart.addEventListener("click", () => {
        orderForm.classList.toggle("tohide");
        hideBtns.classList.add("tohide");
    });
    
    // Récupération et Validation du formulaire
    
    const order = document.querySelector(".order__btn-submit");
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
    
    order.addEventListener("click", (event) =>{
    // On rassemble les informations du formulaire de contact
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address : document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
    
        };
        // Contrôle de la validation du formulaire
        if(
            (regexName.test(contact.firstName) == true) &
            (regexName.test(contact.lastName) == true) &
            (regexCity.test(contact.city) == true) &
            (regexAddress.test(contact.address) == true) &
            (regexMail.test(contact.email) == true)
        ) {
            event.preventDefault();
    
            // Stockage de l'heure et date de commande
            const todayDate = new Date();
            let nowadays = todayDate.getDate();
                let month = todayDate.getMonth() + 1;
                let todayHours = todayDate.getHours();
                let todayMinutes = todayDate.getMinutes();
    
                if (nowadays < 10) {
                    nowadays = '0' + nowadays;
                }
    
                if (month < 10) {
                    month = '0' + month;
                }
    
                if (todayHours < 10) {
                    todayHours = '0' + todayHours;
                }
    
                if (todayMinutes < 10) {
                    todayMinutes = '0' + todayMinutes;
                }
    
                const date = nowadays + '-' + month + '-' + todayDate.getFullYear();
                const hours = todayHours + ':' + todayMinutes;
                const fullDate = { date, hours };
                const dateOrder = JSON.parse(localStorage.getItem('date')) || [];
                dateOrder.push(fullDate);
                localStorage.setItem('date', JSON.stringify(dateOrder));
    
                let products = [];
                for(listId of cart){
                    products.push(listId.id);
                    // console.log(itemId.id)
                }
    
                // fetch avec la méthode Post pour réception du n° de commande
    
                fetch("http://localhost:3000/api/cameras/order/", {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({ contact, products}),
                })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem("order", JSON.stringify(data));
                    document.location.href = "../confirmation/order.html";
                })
                .catch((erreur) => console.log("erreur :" + erreur));
    
        }else {
            alert("Merci de renseigner correctement les champs du formulaire");
        }
    });
   
}


// // fonction de mise à jour du nombre d'articles au panier
// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem("cartNumbers")

//     if(productNumbers) {
//         document.querySelector("#spanCart").textContent = productNumbers;
//     }
// }

// // Fonction pour affichage des produits sur page panier

// function displayCart(){
//     let result = "";
    
//     // console.log(cartItems);
//     for(let i = 0; i < cartItems.length; i++) {
//         let item = cartItems[i];
//         // console.log(item);
//             let amount = parseInt(item.price) * item.inCart;
//             amount = parseInt(amount);
//         result += `
//             <div class="productCart">
//                 <i class="fas fa-trash" id="trash-btn" class="trash" onclick="remove(${i})"></i>
//                 <img src="${item.image}" id="imgCart"/>
//                 <div id="nameCart">${item.name}</div>
//                 <div id="priceCart">${item.price}</div>
//                 <div id="qty-group">
//                     <button type="button" class="decrease" data-toggle="modal"data-index="${i}">
//                         <span class="fas fa-caret-square-left" data-index="${i}"></span>
//                     </button>
//                     <span id="qtyCart" value="">${item.inCart}</span>
//                     <button type="button" class="increase" data-toggle="modal"data-index="${i}">
//                         <span class="fas fa-caret-square-right" data-index="${i}"></span>
//                     </button>
//                 </div>
//                 <div id="optionCart">${item.option}</div>
//                 <div id="amountCart">${amount},00 €</div>
//             </div>
//         `       
//     }
   
//     productContainer.innerHTML = result;  
    
    
    
// }




// // ------------- fonction pour afficher le montant total du panier-------

// function displayTotalCost() {
    
//     totalContainer.innerHTML += `${updateTotalCost()},00 €`;

                                
// };



// function updateTotalCost () {
// let total = 0;

//     cartItems.forEach( (item) => {

//         total = total + item.inCart * parseInt(item.price);
        
//         // console.log(total)
//     });
//     return total
        
// }

// fonction pour ajouter un produit
// function addQtyProduct(event){
//     cartItems.forEach( (item) => {

//         console.log(event)
//     const index = event.target.getAttribute("data-index");
//     console.log(item);
//     cartItems[index].inCart ++;
//     localStorage.setItem("productsInCart", JSON.stringify(cartItems));
//     location.reload();


//     })
    
// }

// const buttonAdd = document.getElementsByClassName("increase");
// // console.log(buttonAdd);
// for(add of buttonAdd) {
//     add.addEventListener("click", addQtyProduct);
// }

// Fonction pour vider le localStorage : 




// displayTotalCost();
// onLoadCartNumbers();
// displayCart ();
  




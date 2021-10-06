//Constantes nécessaires
const cart = JSON.parse(localStorage.getItem("cameras")) || [];
// Url de l'api
const url = 'http://localhost:3000/api/cameras/';

// convertion unitaire du prix
function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    }).format(price / 100);
    return price;
}

// Création de la class produit
class Product {
    constructor(id,name,description, price, option, quantity, imgurl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = +price;
        this.option = option;
        this.quantity = +quantity;
        this.imgUrl = imgurl;
    }
}

// Calcul du Total du panier
function updateTotalCost () {
    let totalCart = 0;    
        cart.forEach((camera) => {  
            totalCart = totalCart + camera.quantity * camera.price;           
            // console.log(total)
        });
        return totalCart;          
    }

// Fonction pour ajout du tableau des produits selectionnés (qui servira à l'affichage pr le panier et recapitulatif commande)
function displayCart(product) {
    const indexProduct = cart.indexOf(product);
    const productList = document.querySelector(".cart__container");
    productList.innerHTML += `
                                <tr class="productList text-center">
                                    <td class="trash align-midle">
                                        <i class="fas fa-trash" id="trash-btn" class="trash" onclick="remove(${indexProduct})"></i>
                                    </td>
                                    <td class="imgCart w-25">
                                        <img src="${product.imgUrl}" class="imgCart img-fluid img-thumbnail" id="imgCart" alt="photo de l'article ${product.name}">
                                    </td>
                                    <td class="nameCart align-midle">
                                        <span class="nameCart">${product.name}</span>
                                    </td>
                                    <td class="optionCart align-midle">
                                        <span class="optionCart">${product.option}</span>
                                    </td>
                                    <td class="priceCart align-midle">
                                        <span class="priceCart">${convertPrice(product.price)}</span>
                                    </td>
                                    <td class="align-middle qty-group">
                                    <button type="button" class="rounded minus data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}" increase>
                                        <span class="fas fa-minus-square text-danger" data-index="${indexProduct}"></span>
                                    </button>
                                    <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
                                    <button type="button" class="rounded plus" data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct} decrease">
                                        <span class="fas fa-plus-square text-success" data-index="${indexProduct}"></span>
                                    </button>
                                    </td>
                                    <td class="amountCart align-midle">
                                        <span id="amountCart" class="amountCart">${convertPrice(product.quantity * product.price)}</span>
                                    </td>
                                </tr>                               
                            `;
}



// Affichage du Total panier
function displayTotalCart() {   
    const totalContainer = document.querySelector("#total-amount");
    totalContainer.innerHTML += `${convertPrice(updateTotalCost())}`;                     
};

// fonction pour affichage nombre de produits dans le panier
function onLoadCartNumbers() {
    let productNumbers = document.querySelector("#spanCart");
    if(cart.length == 0)  {
        productNumbers.innerHTML = `<i class="fas fa-shopping-basket"></i>Panier<span class="spanCart">0</span>`
    }else {
        let productNumbers = document.querySelector("#spanCart");
        let productInCart = 0;
        for(product of cart) {
            productInCart += product.quantity;
        }
        productNumbers.innerHTML = `<i class="fas fa-shopping-basket"></i>Panier<span class="spanCart">${productInCart}</span>`;      
    } 
}

// Fonction pour vider le panier : 
function clearCart() {
    localStorage.clear();
}


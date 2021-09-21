
//---------------- RECUPERATION DES ARTICLES SUIVANT LEUR ID ------------------------------

// on commence par créer une fonction qui va s'appeler elle même à l'ouverture de la page
// Cette fonction va récupérer l'id de chaque article dans notre url
// on va ensuite changer le contenu de chaque article en fonction de l'Id



(async function() {
    const cameraId = getCameraId()
    const camera = await getCamera(cameraId)
    changeContentCamera(camera)
    
})()

// On donne une nouvelle url en fonction de l'id du produit (de l'article)
function getCameraId() {
    return new URL(location.href).searchParams.get("id")
}

// On récupère notre article - Idem au fetch dans la fonction fait en page accueil

function getCamera(cameraId) {
    return fetch(`http://localhost:3000/api/cameras/${cameraId}`)
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(cameras) {
            return cameras
        })
        
        .catch(function(erreur) {
            alert(erreur)
        })
}



// j'injecte le contenu selon le contenu de l'Api

function changeContentCamera(camera) {

        
    document.getElementById("imgCamera").src = camera.imageUrl;
    document.getElementById("name").textContent = camera.name;
    document.getElementById("description").textContent = camera.description;
    document.getElementById("price").textContent = camera.price/100 + " €";
    
    const tabOption = camera.lenses;
    
    for (let option of tabOption) {
         
        document.getElementById("lenses").innerHTML += `<option value="${option}" id="options__lenses">${option}</option>`
    }
}

//-------- Gestion du panier et du localStorage ------------

//Variable pour récupérer cibler mes articles que j'ajoute au panier
//-----------------------------------------------querySelectorAll(".add-cart")
let carts = document.querySelectorAll(".add-cart");

// Récupération de la valeur de l'option choisie dans une constante
let optionSelect = document.querySelector("#lenses");

//------------------- let products était déclaré ici ---------------------------
//On déclare une variable qui va contenir les objets à l'intérieur
//------------------------------------let products [{}]
 
 
console.log((typeof products));

//Ecoute du bouton Ajouter l'article au panier 
// On déclare une variable qui contient notre tableau pour chaque élément et on va récupérer ds le lStorage avec la fonction"cartNumbers"
// Pour pouvoir lire ce que contient les cartes, j'appelle "product" en paramètres de cartNumbers et [i]pr chaque produit
for(let i = 0; i < carts.length; i++) {
    carts[i].addEventListener("click", () => {

        let products = [
            {
                name: document.getElementById("name").textContent,
                price: document.getElementById("price").textContent,
                id: new URL(location).search.substr(4),
                option: document.getElementById("lenses").value,
                image: document.getElementById("imgCamera").src,
                inCart: 0   
            }
            
         ];

        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

// Je créer une fonction pour que l'élément span récupére les valeurs du LS et ne se remet pas à 0 en cas d'actualisation
// Je vérifie si il y a quelque chose dans le LS - et pour que cette fonction fonctionne! il faut l'appeler -on l'appelle après le code
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");

    if(productNumbers) {
        document.querySelector("#cart-span").textContent  = productNumbers;
    }
}



// Je créer une fonction appelée N° de carte pour savoir combien d'éléments j'ajoute à la liste de cartes et les enregistrer au localStorage
// Et lorsque je clique à nouveau le nombre augmente- Je déclare donc 1 variable"productNumbers" qui récupére ce que j'ai ds le LS
// "productNumbers" renvoie une string, il faut donc la convertir
// ON va ensuite vérifier si il a qlques chose dans le LS (if)-sinon une erreur se produit- si il y a (if condition), si il y a pas(else condition), on met 1
// On cible aussi le span"cart-span" pour incrémenter la valeur en même temps

function cartNumbers(product) {
    //console.log("The product clicked is", product);
    let productNumbers = localStorage.getItem("cartNumbers");
    //console.log(productNumbers);
    //console.log(typeof productNumbers);

    productNumbers = parseInt(productNumbers);
    //console.log(typeof productNumbers);

    if(productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector("#cart-span").textContent = productNumbers + 1 ;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector("#cart-span").textContent = 1;
    }
     setItems(product);
}

function setItems(product) {
    //console.log("Inside of setItems function");
    //console.log("My product is", product);
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    //console.log("My cartItems are", cartItems);
// Je donne la condition que si mon article est déjà dans le panier alors j'augmente le nombre
    if(cartItems != null){
        
        if(cartItems[product.name] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
        cartItems[product.name].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
        [product.name]: product
        }
    }   
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Je créer une fonction pour calculer le prix total - je mets cette fonction ds la boucle d'écoute d'évenements-je mets éproduct" en param mais on peut l'appeler diféremment
function totalCost(product){
    console.log("The product price is", product.price);

    let cartCost = localStorage.getItem("totalCost");
    
    console.log("my cartCost is", cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        console.log("my cartCost is", cartCost);
        console.log(typeof product.price);
        localStorage.setItem("totalCost", cartCost + parseInt(product.price) +" €");
    }else {
        localStorage.setItem("totalCost", parseInt(product.price) +" €");
    }
    console.log("my cartCost is", cartCost);
    
}
onLoadCartNumbers();
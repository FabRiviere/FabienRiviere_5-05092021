let carts = document.querySelectorAll(".add-cart");
// let products = [];
//---------------- RECUPERATION DES ARTICLES SUIVANT LEUR ID ------------------------------

// on commence par créer une fonction qui va s'appeler elle même à l'ouverture de la page
// Cette fonction va récupérer l'id de chaque article dans notre url
// on va ensuite changer le contenu de chaque article en fonction de l'Id

(async function(){
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

    document.getElementById("imgCard").src = camera.imageUrl
    document.getElementById("name").textContent = camera.name
    document.getElementById("description").textContent = camera.description
    document.getElementById("price").textContent = camera.price /100 + ",00 €"
    
    const tabOption = camera.lenses;
    
    for (let option of tabOption) {
         
        document.getElementById("options").innerHTML += `<option value="${option}" id="optionsValues">${option}</option>`
    }
     const card = document.querySelector(".card");
     if(card) {
         addCartActions();
     }
}

function addCartActions () {
    const hoverProducts = document.getElementsByClassName("card");
    let carts = document.querySelectorAll(".add-cart");

    for(let i = 0; i < hoverProducts.length;i++) {
        hoverProducts[i].addEventListener("mouseover", () => {
            carts[i].classList.add("showcart");
        })

        hoverProducts[i].addEventListener("mouseout", () => {
            carts[i].classList.remove("showcart");
        })
    }
    
}


// On construit notre objet product

let products = [ 
    {
        name: document.getElementById("name").textContent,
        price: document.getElementById("price").textContent,
        inCart: 0,
        id: new URL(location).search.substr(4),
        option: document.getElementById("options").value,
        image: document.getElementById("imgCard").src,
        
          
    }
];

//Ecoute du bouton Ajouter l'article au panier 
// On déclare une variable qui contient notre tableau pour chaque élément et on va récupérer ds le lStorage avec la fonction"cartNumbers"
// Pour pouvoir lire ce que contient les cartes, j'appelle "product" en paramètres de cartNumbers et [i]pr chaque produit
// On passe ensuite en pramètres de la fonction"products[i]", afin de créer un indexage sur les produits

for (let i=0; i < carts.length; i++) {
    
    carts[i].addEventListener('click', () => {

        products = [ 
            {
                name: document.getElementById("name").textContent,
                price: document.getElementById("price").textContent,
                inCart: 0,
                id: new URL(location).search.substr(4),
                option: document.getElementById("options").value,
                image: document.getElementById("imgCard").src,
                
                  
            }
        ];
        
        cartNumbers(products[i]);
        totalCost(products[i]);
    
    
    })
}

// On créer une fonction pour ne pas remettre à zéro le panier à l'actualisation de la page
// Elle va donc controler si quelque chose existe dans le localStorage

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers")

    if(productNumbers) {
        document.querySelector("#spanCart").textContent = productNumbers;
    }
}


// On créer une focntion pour savoir combien d'articles on met dans le panier
// cartNumbers étant une string, on le convertir en nombre
// On dit ensuite que si productNumbers existe  (if) on lui ajoute 1 et si n'existe pas(else) on lui donne la valeur 1
// On ajoute ensuite le même résultat au span de la div avec la classe cart- icone de panier
// Après avoir mis en paramètres"products[i]" à la fucntion cartNumbers(en l'appelant ds la boucle for) on passe "product" en paramètres de la fonction
// on initialise et appelle enfin une fonction setItems avec "product" en param, que l'on va ensuite créer
function cartNumbers(product) {
    // console.log("The product clicked is", product)
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
   
    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector("#spanCart").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1)
        document.querySelector("#spanCart").textContent = 1;
    }
    setItems(product);
}

// Je récupére les keys et valeurs de l'objet et le stocke dans le LS- et comme c'est 1 objet on utilise JSON.Stringify
// Je doit ensuite vérifier si le produit existe déjà ou non - et ajouter 1 quantité lorsqu'on clique à nouveau sur le même produit
// la 2éme condition (2ème if), est la pour le 1er ajout au LS d'1 produit (avec ... qui est un opérateur JS)
// J'en profite pour ajouter l'option comme différenciation de produit : si prdt option = prdt option => Q=2 sinon Q=1
function setItems(product) {
    // console.log("inside of SetItems function");
    // console.log("my product is", product);
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
    

    if(cartItems != null){
        
        if(cartItems[product.name + product.option] == undefined) {
            cartItems = {
                ...cartItems,
                [product.name + product.option]: product
            }
        }
        cartItems[product.name + product.option].inCart += 1;
    }else {
        product.inCart = 1;
        cartItems ={
            [product.name + product.option] :product
        }
        console.log("my cartItems are", cartItems);
    }

    product.inCart = 1;
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

// Je créer une fonction pour prix total du panier que je vais stocker au LS - j'initialise cette Fct ds la boucle for et ds lécoute
// ds l'init ,on lui passe en param products[i] pour l'itération sur chaque produit - et ici on peut mettre le param qu'on veut mais logique(product) 
// La type de cartCost sera de type string - nous utilisons donc le parseInt pr le mettre en nombre

function totalCost(product){
    // console.log("the product price is", product.price)
    let cartCost = localStorage.getItem("totalCost");
    
    // console.log("My cart cost is", cartCost);
    // console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        
        
        localStorage.setItem("totalCost", cartCost + parseInt(product.price));
    }else {
        localStorage.setItem("totalCost", parseInt(product.price));
        
    }
}

onLoadCartNumbers();

// Je créer une fonction pour que l'élément span récupére les valeurs du LS et ne se remet pas à 0 en cas d'actualisation
// Je vérifie si il y a quelque chose dans le LS - et pour que cette fonction fonctionne! il faut l'appeler -on l'appelle après le code


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

        
    document.getElementById("imgCamera").src = camera.imageUrl
    document.getElementById("name").textContent = camera.name
    document.getElementById("description").textContent = camera.description
    document.getElementById("price").textContent = camera.price/100 + " €"
    
    const tabOption = camera.lenses
    
    for (let option of tabOption) {
         
        document.getElementById("lenses").innerHTML += `<option value="${option}" id="options__lenses">${option}</option>`
    }
}

//-------- Gestion du panier ------------

// Récupération des données selectionnées par l'utilisateur et envoie au panier

// sélection de l'id des options 

const optionSelect = document.querySelector("#lenses");

//selection du bouton dans le DOM
const addToCart = document.querySelector("#addtocart");
console.log(addToCart)

//Ecoute du bouton Ajouter l'article au panier et stopper l'envoi
addToCart.addEventListener("click", (Event) => {
    Event.preventDefault();  

//Obtention des valeurs du stockage
function fillStorage () {
    let name = localStorage.getItem("name");
    let description = localStorage.getItem("description");
    let price = localStorage.getItem("price");
    let quantity = localStorage.getItem("quantity");
    let option = localStorage.getItem("option");

    document.getElementById("name").value = name;
    document.getElementById("description").value = description;
    document.getElementById("price").value = price;
    document.getElementById("quantity_wanted").value = quantity;
    document.getElementById("options__lenses").value = option;

    console.log(quantity);
}



// Enregistrer les valeurs dans le stockage
function recordStorage() {
    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("description", document.getElementById("description").value);
    localStorage.setItem("price", document.getElementById("price").value);
    localStorage.setItem("quantity", document.getElementById("quantity_wanted").value);
    localStorage.setItem("option", document.getElementById("options__lenses").value);
}
console.log(recordStorage(price))
displayAddToCart();
});

const name = document.querySelector("#name");
const description = document.querySelector("#description");
const price = document.querySelector("#price");
const quantity = document.querySelector("#quantity_wanted");
const option = document.querySelector("#options__lenses")
const displayAdd = document.querySelector("#displayAdd");

addToCart.addEventListener("click", function() {
    localStorage.setItem("name", name.value),
    localStorage.setItem("description", description.value);
    localStorage.setItem("price", price.value);
    localStorage.setItem("quantity", quantity.value);
    localStorage.setItem("#options__lenses", lenses.value)
    
    console.log(description.value);


    displayAddToCart();
});

function displayAddToCart() {
 displayAdd.textContent = "Ce produit est dans votre panier";
}

*/


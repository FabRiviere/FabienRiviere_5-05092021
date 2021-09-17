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

//-------- Gestion du panier ------------

// Récupération des données selectionnées par l'utilisateur et envoie au panier

// sélection de l'id des options 

const optionSelect = document.querySelector("#lenses");

//selection du bouton dans le DOM
const addToCart = document.querySelector("#addtocart");


//Ecoute du bouton Ajouter l'article au panier 
addToCart.addEventListener("click", (products) => {
     
     products = {
        productName: document.getElementById("name").textContent,
        productPrice: document.getElementById("price").textContent,
        productId: new URL(location).search.substr(4),               //on retire de la chaine de caractère le début(?id=)
        productQty:  document.getElementById("quantity_wanted").value,
        productOption: document.getElementById("lenses").value
    }
  
// déclaration de la variable "productsElt" dans laquelle on met les keys et values qui sont ds le localstorage
let productsElt = JSON.parse(localStorage.getItem("products"));

// déclaration en constante de la fonction "popupconfirm" pour options pour le client d'aller au panier ou retour à l'accueil
const popupconfirm =() =>{
    if(window.confirm(`${document.getElementById("name").textContent} option: ${document.getElementById("lenses").value} a bien été ajouté au panier.
        Consultez le panier: OK ou retourner à la page d'accueil: ANNULER`)){
            window.location.href = "../panier/panier.html";
        }else {
            window.location.href = "../../../index.html";
        }
}

// Fonction ajouter 1 produit sélectionné dans le local storage
const addLocalStorage = () =>{
    productsElt.push(products); // ajout ds le tableau de l'objet choisi par le client
    localStorage.setItem("products", JSON.stringify(productsElt)); // transformation en JSON et envoi ds la key"products" du LStorage
};

// si il y a déjà des produits enregistrés dans le local storage(if) ou si il n'y a pas de produits enregistrés (else)
if (productsElt) {
    addLocalStorage();
    popupconfirm();
} else {
    productsElt =[];
    addLocalStorage();
    popupconfirm();
}
});



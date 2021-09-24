
//fonction "articles__container" qui va s'éxecuter dès le chargement de la page, mais qu'on va remplacer par fonction qui s'appelle toute seule
//On va récupérer des articles grace à une fonction "getCameras"
//Après avoir récupérer ces articles, on va devoir les afficher :"displayCamera". avec une boucle "for of" (pour chaque camera de la liste de cameras)
// Comme je veux retourner le "fetch" je mets ma fonction main en "await", et comme await s'éxécute en asynchone j'y ajoute un async

// methode 1
/*articles__container()

async function articles__container() {
    const cameras = await getCameras()
    for (camera of cameras) {
        displayCamera(camera)
    }
}
*/

//methode 2
//******************* Affichage et interaction sur page d'acceuil******************/

// On créer 1 fonction qui va s'appeler au chargement- on utilise async et await car on attend une promesse dans getcamera(fetch)

(async function() {
    const cameras = await getCameras()
    for (camera of cameras) {
        displayCamera(camera)
    }
})()

function getCameras() {
    return fetch("http://localhost:3000/api/cameras")
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

//On créer notre fonction "displayCamera"
// Je récupére le template, et créer une constante je le clone et je l'ajoute
// Je clone et récupére chaque élément que je veux afficher
// J'en profite pour récupérer chaque id d'article qui me seront nécessaire pour faire le lien vers la page de chaque article

function displayCamera() {
    const templateHome = document.getElementById("templateHome");
    const cloneElt = document.importNode(templateHome.content, true);

    cloneElt.getElementById("imgCard").src = camera.imageUrl
    cloneElt.getElementById("name").textContent = camera.name
    cloneElt.getElementById("description").textContent = camera.description
    cloneElt.getElementById("price").textContent = camera.price /100 + " ,00€"
    cloneElt.getElementById("productLink").href += `?id=${camera._id}`

    document.querySelector(".container__home").appendChild(cloneElt);
    const containerHome = document.querySelector(".container__home");
    if(containerHome){
        showArticle();
    }
    
}

function showArticle () {
    const hoverProducts = document.getElementsByClassName("card");
    let links = document.querySelectorAll(".cardlink");

    for(let i = 0; i < hoverProducts.length;i++) {
        hoverProducts[i].addEventListener("mouseover", () => {
            links[i].classList.add("showArticle");
        })

        hoverProducts[i].addEventListener("mouseout", () => {
            links[i].classList.remove("showArticle");
        })
    }
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers")

    if(productNumbers) {
        document.querySelector("#spanCart").textContent = productNumbers;
    }
}
onLoadCartNumbers();
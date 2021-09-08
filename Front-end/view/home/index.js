// Affichage et interaction sur page d'acceuil


//fonction "main" qui va s'éxecuter dès le chargement de la page, mais qu'on va remplacer par fonction qui s'appelle toute seule
//On va récupérer des articles grace à une fonction "getCameras"
//Après avoir récupérer ces articles, on va devoir les afficher :"displayCamera". avec une boucle "for of" (pour chaque camera de la liste de cameras)
// Comme je veux retourner le "fetch" je mets ma fonction main en "await", et comme await s'éxécute en asynchone j'y ajoute un async

/*articles__container()

async function articles__container() {
    const cameras = await getCameras()
    for (camera of cameras) {
        displayCamera(camera)
    }
}
*/

(async function() {
    const cameras = await getCameras()
    for (camera of cameras) {
        displayCamera(camera)
    }

})()
//On créer la fonction "getCameras"
// Je fais un fetch pour aller chercher les articles "cameras"
// Puis j'attribue des fonctions avec ".then" lorsqu'il aura récupérer les données- 1er then me récupére les données et me retourne en json
// puisque je fais un retour dans un then, j'en fais un second pour récupérer les données du 1er

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
    const templateElt = document.getElementById("templateArticle")
    const cloneElt = document.importNode(templateElt.content, true)

    cloneElt.getElementById("imgCamera").src = camera.imageUrl
    cloneElt.getElementById("name").textContent = camera.name
    cloneElt.getElementById("description").textContent = camera.description
    cloneElt.getElementById("price").textContent = camera.price/100 + " €"
    cloneElt.getElementById("camera__link").href += `?id=${camera._id}`

    document.getElementById("articles__container").appendChild(cloneElt)
}
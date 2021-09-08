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
         
        document.getElementById("lenses").innerHTML += `<option value="${option}" selected id="options__lenses">${option}</option>`
    }
}




//Appel de l'adresse URL de l'API
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        addCards(data);
    })
    .catch((error) => {
        alert(
            "Attention votre serveur Nodejs n'est pas lancé"
        );
    });

    // Mise à jour icone du panier ds le header
    onLoadCartNumbers();

    // Affichage des articles en page d'accueil
    function addCards(data) {
        for (product of data) {
            const card = document.querySelector(".container__home");
            const price = convertPrice(product.price);

            card.innerHTML += `
                                <div class="card" id="card">
                                    <img src="${product.imageUrl}" alt="image du produit ${product.name}" class="card__img" id="imgCard">
                                    <h3 class="card__name" id="name">${product.name}</h3>
                                    <p class="card__description" id="description">${product.description}</p>
                                    <p class="card__price" id="price">${price}</p>
                                    <a href="./Front-end/view/produit.html?_id=${product._id}" id="productLink" class="cardlink">Voir l'article</a>
                                </div>
                            `;
                            
        }
        showArticle();
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


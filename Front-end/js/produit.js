//Actualisation du nombre d'article ds l'icone du panier ds le header
onLoadCartNumbers();
// const nécéssaire pr récupération produits
// récupération de l'id du produit
const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get('_id');

// Appel de l'api suivant l'id de l'article
const newUrl = `http://localhost:3000/api/cameras/${newId}`;

fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
        const product = data;
        addCard(data);

        // affichage de l'article sur la page produit
        function addCard(product) {
            const productImage = document.getElementById("imgCard");
            productImage.innerHTML += `<img src="${product.imageUrl}" class="card__img" id="imgCard" alt="photo du produit ${product.name}">`;

            const productName = document.getElementById("name");
            productName.innerHTML += `<h5 class="card__name" id="name">${product.name}</h5>`;

            const productDescription = document.getElementById("description");
            productDescription.innerHTML += `<p class="card__description" id="description">${product.description}</p>`;

            const productPrice = document.getElementById("price");
            productPrice.innerHTML += `<h5 class="card__price" id="price">${convertPrice(product.price)}</h5>`;

            addLenses(product);
            const card = document.querySelector(".card");
            if(card) {
                addCartActions();
            }            
        }

        // Fonction pour le choix des options
        function addLenses(product) {
            let options = document.getElementById("options");
            for(let lenses of product.lenses) {
                options.innerHTML += `<option value="${lenses}">${lenses}</option>`;
            }          
        }
// fonction pour affichage du "bouton" ajouter au panier
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
            onLoadCartNumbers();
        }      
    }
    //Ecoute du click sur le bouton et actions ensuite en fonction si option identique ou non et si déjà présnet ou non
    let btnAddCart = document.getElementById("add-cart");
    btnAddCart.addEventListener("click", (e) => {
        e.preventDefault();
        let option = document.getElementById("options");
        let quantity = document.getElementById("quantity");

        // Création de la fiche produit selectionné
        let objectProduct = new Product(
            newId,
            product.name,
            product.description,
            product.price,
            option.value,
            quantity.value,
            product.imageUrl
        );
        // Vérifie si le produit est déjà présent
        // Si déjà present passe en true et stockage ds le LS
        let isInCart = false;
        let indexModification;
        for (products of cart) {
            switch (products.option) {
                case objectProduct.option:
                    isInCart = true;
                    indexModification = cart.indexOf(products);
            }
        }

        // Si déjà présent, incrémente la quantité
        if (isInCart) {
            cart[indexModification].quantity = +cart[indexModification].quantity + +objectProduct.quantity;
            localStorage.setItem("cameras", JSON.stringify(cart));
            // Sinon ajoute le produit au localStorage
        } else {
            cart.push(objectProduct);
            localStorage.setItem("cameras", JSON.stringify(cart));
        }
    });
});




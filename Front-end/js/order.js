onLoadCartNumbers();
const order = JSON.parse(localStorage.getItem("order")) || [];
const date = JSON.parse(localStorage.getItem("date")) || [];

// Affichage des informations du client(contact)
const informations = document.querySelector(".contact");
informations.innerHTML += `
                            <p class="thank">
                                <span class="thank-text">${order.contact.firstName}</span>
                                Merci de vos achats sur notre boutique en ligne ! 
                            </p>
                            <p class="date">Votre commande reçue le
                                <span class="date">${date[0].date}</span> à 
                                <span class="hours">${date[0].hours}</span> d'un montant total de
                                <span class="totalamount">${convertPrice(updateTotalCost())}</span> a été validée.
                            </p>
                            <p class="orderId"> Votre référence de commande est: 
                                <span class="orderId">${order.orderId}</span>
                            </p>
                            <p class="returnmail">Votre facture vous sera transmise par email à :
                                <span class"returnmail">${order.contact.email}</span>
                            </p>
                            
                            <div class="expedition__contact">
                                <p class="expedition"> Vos produits vous seront expédiés à l'adresse suivante :</p>
                                <p class="expedition__contact-name">${order.contact.firstName}${order.contact.lastName}</p>
                                <p class="expedition__contact-address">${order.contact.address}</p>
                                <p class="expedition__contact-city">${order.contact.city}</p>
                            </div>
                        `;

// Affichage du recapitulatif de commande
for(product of cart) {
    displayCart(product);
}

// Affichage du prix total 
displayTotalCart();

// Bouton imprimer
const print = document.getElementById("print__Btn");
print.addEventListener("click", (e) => {
    e.preventDefault;
    window.print();
    // vider le localStorage ? 
    // clearLocalStorage();
    location.reload();
});
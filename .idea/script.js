const toppingInfo = {
    pepperoni: { color: "#bb5511", position: { top: "44%", left: "63%" } },
    mushrooms: { color: "#c0c0c0", position: { top: "61%", left: "53%" } },
    onions: { color: "#ffffff", position: { top: "61%", left: "33%" } },
    sausage: { color: "#8B4513", position: { top: "44%", left: "23%" } },
    bacon: { color: "#b41f1f", position: { top: "27%", left: "33%" } },
    olives: { color: "#3B3C36", position: { top: "27%", left: "53%" } },
};

function updateToppings() {
    const selectedToppings = document.querySelectorAll('.toppings-options input[type="checkbox"]');

    selectedToppings.forEach((checkbox) => {
        const toppingName = checkbox.value;
    });

    updatePizzaPreview();
     console.log("Yep");
}

function updatePizzaPreview() {
    const pizzaName = document.getElementById("name").value;
    const cheeseOptions = document.querySelectorAll('.cheese-options input[type="checkbox"]');
    const sauceType = document.getElementById("sauce").value || 'tomato';
    const toppingsPreview = document.getElementById("toppingsPreview");

    // Collect selected cheese types for display
    const selectedCheeses = Array.from(cheeseOptions)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Update cheese
    const cheeseInitials = selectedCheeses.map(cheese => cheese.charAt(0).toUpperCase()).join(', ');
    document.getElementById("crustPreview").innerText = cheeseInitials;

    // Update sauce
    document.getElementById("saucePreview").style.backgroundColor = sauceType === "tomato" ? "#a33513" : (sauceType === "bbq" ? "#571e1a" : "#E8EDE4");

    // Reset toppings
    toppingsPreview.innerHTML = "";

    // Add selected toppings
    const selectedToppings = Array.from(document.querySelectorAll('.toppings-options input[type="checkbox"]:checked'));
    const summaryToppings = [];

    selectedToppings.forEach(topping => {
        const toppingName = topping.value;

        if (toppingInfo[toppingName]) {
            const toppingDiv = document.createElement("div");
            toppingDiv.style.backgroundColor = toppingInfo[toppingName].color;
            toppingDiv.style.position = "absolute";
            toppingDiv.style.top = toppingInfo[toppingName].position.top;
            toppingDiv.style.left = toppingInfo[toppingName].position.left;

            toppingDiv.style.width = "25px";
            toppingDiv.style.height = "25px";
            toppingDiv.style.borderRadius = "50%";

            toppingsPreview.appendChild(toppingDiv);

            const displayName = toppingName.replace(/_/g, ' ');
            summaryToppings.push(displayName);
        }
    });

    // Update summary
    const cheeseDisplay = selectedCheeses.length > 0 ? selectedCheeses.map(cheese => cheese.toLowerCase()).join(', ') : 'None';

    const summaryText = `<strong>${pizzaName.charAt(0).toUpperCase() + pizzaName.slice(1)} </strong>
    <br> Sauce: ${sauceType.charAt(0).toUpperCase() + sauceType.slice(1)}
    <br> Cheese: ${cheeseDisplay}
    <br> Toppings: ${summaryToppings.length > 0 ? summaryToppings.join(', ') : 'None'}`;

    document.getElementById('summaryText').innerHTML = summaryText;
}

// Initial preview update
document.addEventListener('DOMContentLoaded', () => {
    updatePizzaPreview();
});

let submittedNames = [];
function submitOrder() {
    const pizzaName = document.getElementById("name").value.trim();

    console.log("Entered pizza name:", pizzaName);

    // Check for pizza name
    if (!pizzaName) {
        alert("Please enter the pizza name.");
        return;
    }

    // Check for duplicate pizza name
    if (submittedNames.includes(pizzaName)) {
        alert("This pizza name already exists.");
        return;
    }

    // If unique, add the name to the list of submitted names
    submittedNames.push(pizzaName);
    alert("Your pizza " + pizzaName + " has been created!");
    console.log("Pizza time!");
}

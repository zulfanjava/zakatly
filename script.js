// Update Date and Time
function updateDateTime() {
    const now = new Date();
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        datetimeElement.textContent = now.toLocaleString();
    }
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Function to toggle and persist Color Blind Mode
function toggleColorBlindMode() {
    const body = document.body;

    if (body.classList.contains('color-blind-mode')) {
        body.classList.remove('color-blind-mode');
        localStorage.setItem('colorBlindMode', 'disabled');
    } else {
        body.classList.add('color-blind-mode');
        localStorage.setItem('colorBlindMode', 'enabled');
    }
}

// Apply Color Blind Mode if saved in localStorage
if (localStorage.getItem('colorBlindMode') === 'enabled') {
    document.body.classList.add('color-blind-mode');
}

// Add the Color Blind Mode styles
const style = document.createElement('style');
style.innerHTML = `
    body.color-blind-mode {
        --primary-color: #004D40; /* Dark teal */
        --secondary-color: #FF8F00; /* Darker orange */
        --background-color: #E0F2F1; /* Light teal */
        --text-color: #000; /* Black */
        --footer-bg: #004D40; /* Dark teal */
        --footer-text: #fff; /* White */

        /* Font and Line Adjustments for Color Blind Mode */
        font-weight: bold; /* Make text bold */
        line-height: 1.8; /* Increase line height for better readability */
    }

    body.color-blind-mode h1,
    body.color-blind-mode h2,
    body.color-blind-mode h3,
    body.color-blind-mode h4,
    body.color-blind-mode h5,
    body.color-blind-mode h6 {
        font-weight: 900; /* Make headings extra bold */
    }

    body.color-blind-mode p {
        font-weight: bold; /* Make paragraphs bold */
    }

    body.color-blind-mode .footer-section ul li a {
        font-weight: bold; /* Make footer links bold */
    }

    body.color-blind-mode .social-links a {
        font-weight: bold; /* Make social icons bold */
    }

    /* Thicker Lines for Color Blind Mode */
    body.color-blind-mode nav {
        border-bottom: 4px solid var(--primary-color); /* Thicker border for navbar */
    }

    body.color-blind-mode .contact-info button {
        border: 3px solid var(--secondary-color); /* Thicker border for buttons */
    }

    body.color-blind-mode .zakat-card {
        border: 3px solid var(--primary-color); /* Thicker border for cards */
    }

    body.color-blind-mode footer {
        border-top: 4px solid var(--secondary-color); /* Thicker border for footer */
    }

    body.color-blind-mode .footer-section ul li a {
        border-bottom: 2px solid var(--secondary-color); /* Thicker underline for links */
    }

    body.color-blind-mode .social-links a {
        border: 2px solid var(--primary-color); /* Thicker border for social icons */
        padding: 5px; /* Add padding for better visibility */
    }

    /* Bold border for the entire form container */
    body.color-blind-mode .zakat-calculator {
        border: 3px solid var(--primary-color); /* Thicker border for the form container */
        padding: 20px; /* Add some padding to make it look better */
        border-radius: 10px; /* Optional: Add rounded corners */
    }
`;
document.head.appendChild(style);

// Add event listener to the toggle button
const toggleButton = document.getElementById('colorToggle');
if (toggleButton) {
    toggleButton.addEventListener('click', toggleColorBlindMode);
}

// Zakat Income Calculation
function calculateZakat() {
    const monthlyIncome = parseFloat(document.getElementById('pendapatanBulanan').value) || 0;
    const otherIncome = parseFloat(document.getElementById('pendapatanLain').value) || 0;
    const failElement = document.getElementById('fail');

    // Clear previous error message
    failElement.textContent = '';

    if (monthlyIncome < 2124) {
        failElement.textContent = "Your income is below the nisab threshold. You are not required to pay Zakat.";
        failElement.style.color = 'red'; // Set the color of the error message to red
        document.getElementById('zakatSetahun').textContent = 'RM 0.00';
        document.getElementById('zakatBulanan').textContent = 'RM 0.00';
        return; // Exit the function early if income is below the threshold
    }

    const annualIncome = (monthlyIncome * 12) + otherIncome;
    document.getElementById('pendapatanTahunan').value = annualIncome.toFixed(2);

    const annualZakat = annualIncome * 0.025;
    const monthlyZakat = annualZakat / 12;

    document.getElementById('zakatSetahun').textContent = `RM ${annualZakat.toFixed(2)}`;
    document.getElementById('zakatBulanan').textContent = `RM ${monthlyZakat.toFixed(2)}`;
}

function resetZakat() {
    document.getElementById('pendapatanBulanan').value = '';
    document.getElementById('pendapatanTahunan').value = '';
    document.getElementById('pendapatanLain').value = '';
    document.getElementById('zakatSetahun').textContent = 'RM 0.00';
    document.getElementById('zakatBulanan').textContent = 'RM 0.00';
    document.getElementById('fail').textContent = ''; // Clear the error message on reset
}

document.getElementById('pendapatanBulanan')?.addEventListener('input', function () {
    const monthlyIncome = parseFloat(this.value) || 0;
    const annualIncome = monthlyIncome * 12;
    document.getElementById('pendapatanTahunan').value = annualIncome.toFixed(2);
});

// Zakat Gold Savings Calculation
document.getElementById('zakatSavingGold')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const gold1 = parseFloat(document.getElementById('gold1').value);
    const resultElement = document.getElementById('result1');

    if (gold1 < 85) {
        resultElement.textContent = "Zakat is not applicable because the weight of gold is below the nisab value.";
        const tGold1 = 349.88 * gold1;
        document.getElementById('price1').value = `${tGold1.toFixed(2)}`;
        document.getElementById('zakatSaving').value = '';
    } else {
        const tGold1 = 349.88 * gold1;
        document.getElementById('price1').value = `${tGold1.toFixed(2)}`;
        const zakatRate = 0.025;
        const zakatSaving = tGold1 * zakatRate;
        document.getElementById('zakatSaving').value = `${zakatSaving.toFixed(2)}`;
        resultElement.textContent = '';
    }
});

// Zakat Gold Use Calculation
document.getElementById('zakatUseGold')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const gold2 = parseFloat(document.getElementById('gold2').value);
    const resultElement = document.getElementById('result2');

    if (gold2 < 800) {
        resultElement.textContent = "Zakat is not applicable because the weight of gold is below the uruf value.";
        const tGold2 = 349.88 * gold2;
        document.getElementById('price2').value = `${tGold2.toFixed(2)}`;
        document.getElementById('zakatUse').value = '';
    } else {
        const tGold2 = 349.88 * gold2;
        document.getElementById('price2').value = `${tGold2.toFixed(2)}`;
        const zakatRate = 0.025;
        const zakatUse = tGold2 * zakatRate;
        document.getElementById('zakatUse').value = `${zakatUse.toFixed(2)}`;
        resultElement.textContent = '';
    }
});

// Zakat Silver Calculation
document.getElementById('zakatSilver')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const silver = parseFloat(document.getElementById('silver').value);
    const resultElement = document.getElementById('result');

    if (silver < 595) {
        resultElement.textContent = "Zakat is not applicable because the weight of silver is below the nisab value.";
        const tSilver = 2.75 * silver;
        document.getElementById('price').value = `${tSilver.toFixed(2)}`;
        document.getElementById('zakatsilver').value = '';
    } else {
        const tSilver = 2.75 * silver;
        document.getElementById('price').value = `${tSilver.toFixed(2)}`;
        const zakatRate = 0.025;
        const tZakatsilver = tSilver * zakatRate;
        document.getElementById('zakatsilver').value = `${tZakatsilver.toFixed(2)}`;
        resultElement.textContent = '';
    }
});

// Zakat Stock Calculation
document.getElementById('stockSavings')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const stock = parseFloat(document.getElementById('stock').value);
    const resultElement = document.getElementById('result1');

    if (stock < 32133.89) {
        resultElement.textContent = "Value is below the Current Nisab. Zakat is not yet obligatory";
        document.getElementById('zakatSaving').value = '';
    } else {
        const zakatRate = 0.025;
        const zakatSaving = stock * zakatRate;
        document.getElementById('zakatSaving').value = `${zakatSaving.toFixed(2)}`;
        resultElement.textContent = '';
    }
});
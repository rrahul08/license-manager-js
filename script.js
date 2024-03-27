let licenses = [];

function updateLicenseList(licenseArray = licenses , title = "License List") {
    const licenseList = document.getElementById('licenses');
    const titleElement = document.getElementById('licenseListTitle');

    titleElement.textContent = title;

    licenseList.innerHTML = '';

    licenseArray.forEach((license, index) => {
        const li = document.createElement('li');
        li.className =  'list-group-item';
        li.innerHTML = `<span style="width:25%";>${license.licenseKey}</span>
                        <span style="width:25%";>${license.product}</span> 
                        <span style="width:25%";>${license.expirationDate}
                        </span> 
                        <button style="background-color: #dc3545;
                        color: white;
                        border: none;
                        padding: 5px 10px;
                        border-radius: 5px;
                        cursor: pointer;"
                                onclick="deleteLicense(${index})">Delete</button>`;
        licenseList.appendChild(li);

    
    });

   
}


function addLicense() {
    const licenseKey = document.getElementById('licenseKey').value;
    const product = document.getElementById('product').value;
    const expirationDate = document.getElementById('expirationDate').value;

    if (!licenseKey.trim() || !product.trim() || !expirationDate.trim()) {
        alert('Please fill in all fields.');
        return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(expirationDate)) {
        alert('Invalid expiration date format. Please use YYYY-MM-DD.');
        return;
    }

    const newLicense = {
        licenseKey,
        product,
        expirationDate
    };

    licenses.push(newLicense);

    document.getElementById('licenseKey').value = '';
    document.getElementById('product').value = '';
    document.getElementById('expirationDate').value = '';

    updateLicenseList();
}

function deleteLicense(index) {
    licenses.splice(index, 1);
    updateLicenseList();
}

function sortByExpirationDate() {
    licenses.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
    updateLicenseList();
}

function loadLicenses() {
    const storedLicenses = localStorage.getItem('licenses');
    if (storedLicenses) {
        licenses = JSON.parse(storedLicenses);
        updateLicenseList();
    }
}

function showAllLicenses() {
    updateLicenseList(licenses);
}

function showActiveLicenses() {
    const activeLicenses = licenses.filter(license => new Date(license.expirationDate) > new Date());
    updateLicenseList(activeLicenses,"Active Licenses");
}

function showExpiredLicenses() {
    const expiredLicenses = licenses.filter(license => new Date(license.expirationDate) <= new Date());
    updateLicenseList(expiredLicenses,"Expired Licenses");
}

loadLicenses();

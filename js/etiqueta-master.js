let qrcode;

document.addEventListener("DOMContentLoaded", () => {
    const qrElement = document.getElementById("qrcode");
    if (qrElement) {
        qrcode = new QRCode(qrElement, {
            width: 70, 
            height: 70, 
            correctLevel: QRCode.CorrectLevel.H
        });
    }
    
    updateLabel();
});

function toggleOptionsMenu() {
    const menu = document.getElementById('options-menu');
    menu.classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.matches('#unlock-btn')) {
        const dropdowns = document.getElementsByClassName("options-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// --- Hash de senha (djb2) para não expor em texto claro ---
function hashSenha(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

// Hashes válidos (senhas de acesso dev)
const SENHAS_VALIDAS = [-537839990, 1281559840];

function promptForDeveloperMode() {
    const tentativa = prompt("Digite a senha de acesso para habilitar o Modo Desenvolvedor:");
    
    if (tentativa && SENHAS_VALIDAS.includes(hashSenha(tentativa))) {
        const areaBloqueada = document.getElementById('locked-fields');
        
        areaBloqueada.style.display = "block";
        areaBloqueada.style.pointerEvents = "auto";
        
        setTimeout(() => {
            areaBloqueada.style.opacity = "1";
            areaBloqueada.style.transition = "opacity 0.3s";
        }, 10);
        
        alert("Modo Desenvolvedor habilitado! Campos liberados.");
    } else if (tentativa !== null) {
        alert("Senha incorreta. Acesso negado.");
    }
}

// --- Package type toggle (mutually exclusive checkboxes) ---
function handlePackageType(selected) {
    const cheapest = document.getElementById('pkg-cheapest');
    const bulky = document.getElementById('pkg-bulky');
    
    if (selected === 'cheapest' && cheapest.checked) {
        bulky.checked = false;
    } else if (selected === 'bulky' && bulky.checked) {
        cheapest.checked = false;
    }
    
    updateLabel();
}

function updateLabel() {
    const inHeader = document.getElementById('in-header-free');
    const inRecipient = document.getElementById('in-recipient-free');
    const inSSP = document.getElementById('in-ssp');
    const inFSP = document.getElementById('in-fsp');
    const inID = document.getElementById('in-id');
    const inCluster = document.getElementById('in-cluster');
    const inDate = document.getElementById('in-date');

    const headerText = inHeader ? inHeader.value : "";
    const recipientText = inRecipient ? inRecipient.value : "";
    const ssp = inSSP ? inSSP.value.trim() : "";
    const fsp = inFSP ? inFSP.value.trim() : "";
    const id = inID ? inID.value.trim() : "";
    const clusterNum = inCluster ? inCluster.value.trim() : "";
    const promiseDateValue = inDate ? inDate.value : ""; 
    
    const addressType = document.querySelector('input[name="address-type"]:checked')?.value || "R";
    
    // --- Route icon ---
    const routeIcon = document.querySelector('input[name="route-icon"]:checked')?.value || "N";
    const routeCircle = document.getElementById('out-route-icon');
    
    if (routeCircle) {
        if (routeIcon === 'meliair') {
            routeCircle.innerHTML = '<img src="../icons/meliair.png" alt="MeliAir" style="width: 100%; height: 100%; object-fit: contain;">';
            routeCircle.classList.add('route-circle-img');
        } else {
            routeCircle.textContent = routeIcon;
            routeCircle.classList.remove('route-circle-img');
        }
    }
    
    // --- Package type (cheapest/bulky) ---
    const isCheapest = document.getElementById('pkg-cheapest')?.checked || false;
    const isBulky = document.getElementById('pkg-bulky')?.checked || false;
    const pkgContainer = document.getElementById('package-icon-container');
    const pkgImg = document.getElementById('package-icon-img');
    
    if (pkgContainer && pkgImg) {
        if (isCheapest) {
            pkgContainer.classList.remove('package-icon-hidden');
            pkgImg.src = '../icons/cheapest.png';
            pkgImg.alt = 'Cheapest';
        } else if (isBulky) {
            pkgContainer.classList.remove('package-icon-hidden');
            pkgImg.src = '../icons/bulkyicon.png';
            pkgImg.alt = 'Bulky';
        } else {
            pkgContainer.classList.add('package-icon-hidden');
        }
    }

    const watermarkToggle = document.querySelector('input[name="watermark-toggle"]:checked')?.value || "on";
    const watermarkElement = document.querySelector('.origin-tag');

    if (watermarkElement) {
        watermarkElement.style.display = (watermarkToggle === "off") ? "none" : "block";
    }

    document.getElementById('out-header-free').innerText = headerText;
    document.getElementById('out-recipient-free').innerText = recipientText;
    document.getElementById('out-ssp').innerText = ssp || "SSP20";
    document.getElementById('out-fsp').innerText = fsp || "BRSP00";
    document.getElementById('out-address-type').innerText = addressType;

    const valFSP = fsp || "BRSP00";
    const valSSP = ssp || "SSP20";
    const valCluster = clusterNum || "--";
    document.getElementById('out-cluster-combined').innerHTML = 
        `${valFSP} > ${valSSP} > <span class="cluster-number-bold">${valCluster}</span>`;

    const outDateElement = document.getElementById('out-date');
    const diasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

    if (!promiseDateValue) {
        const hoje = new Date();
        const diaSemana = diasSemana[hoje.getDay()];
        const dataFormatada = hoje.toLocaleDateString('pt-BR'); 
        outDateElement.innerText = `${diaSemana} ${dataFormatada}`;
    } else {
        const dateParts = promiseDateValue.split('-');
        const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        const diaSemana = diasSemana[dateObj.getDay()];
        const dataFormatada = dateObj.toLocaleDateString('pt-BR');
        outDateElement.innerText = `${diaSemana} ${dataFormatada}`;
    }

    const textManual = document.getElementById('barcode-text-manual');

    if (id) {
        JsBarcode("#barcode", id, {
            format: "CODE128", 
            lineColor: "#000", 
            width: 2.2, 
            height: 85, 
            displayValue: false, 
            margin: 0
        });

        const startPart = id.substring(0, id.length - 5);
        const lastFive = id.substring(id.length - 5);
        textManual.innerHTML = `${startPart}<span class="id-last-five-highlight">${lastFive}</span>`;
        textManual.style.color = "#000";

        if (qrcode) { 
            qrcode.clear(); 
            qrcode.makeCode(id); 
        }
    } else {
        JsBarcode("#barcode", "41234567890", {
            format: "CODE128", 
            lineColor: "#ccc", 
            width: 2.2, 
            height: 85, 
            displayValue: false, 
            margin: 0
        });

        textManual.innerHTML = `412345<span class="id-last-five-highlight">67810</span>`;
        textManual.style.color = "#ccc";

        if (qrcode) { 
            qrcode.clear(); 
            qrcode.makeCode("41234567890"); 
        }
    }
}

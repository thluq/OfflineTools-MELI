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

function promptForDeveloperMode() {
    const senhaCorreta = "3831213";
    const tentativa = prompt("Digite a senha de acesso para habilitar o Modo Desenvolvedor:");

    if (tentativa === senhaCorreta) {
        const areaBloqueada = document.getElementById('locked-fields');
        areaBloqueada.style.display = "block";
        
        setTimeout(() => {
            areaBloqueada.style.opacity = "1";
            areaBloqueada.style.transition = "opacity 0.3s";
        }, 10);
        
        alert("Modo Desenvolvedor habilitado! Campos liberados.");
    } else {
        alert("Senha incorreta. Acesso negado.");
    }
}

function updateLabel() {
    const headerText = document.getElementById('in-header-free').value;
    const recipientText = document.getElementById('in-recipient-free').value;
    const ssp = document.getElementById('in-ssp').value.trim();
    const fsp = document.getElementById('in-fsp').value.trim();
    const id = document.getElementById('in-id').value.trim();
    const clusterNum = document.getElementById('in-cluster').value.trim();
    const promiseDateValue = document.getElementById('in-date').value; 
    
    const addressType = document.querySelector('input[name="address-type"]:checked')?.value || "R";

    const placeholderRemetente = "";
    const placeholderDestinatario = "";

    document.getElementById('out-header-free').innerText = headerText || placeholderRemetente;
    document.getElementById('out-recipient-free').innerText = recipientText || placeholderDestinatario;
    document.getElementById('out-ssp').innerText = ssp || "SSP00";
    document.getElementById('out-fsp').innerText = fsp || "FSP00";
    document.getElementById('out-address-type').innerText = addressType;

    const valFSP = fsp || "FSP00";
    const valSSP = ssp || "SSP00";
    const valCluster = clusterNum || "00";
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
        JsBarcode("#barcode", "40000000001", {
            format: "CODE128", 
            lineColor: "#ccc", 
            width: 2.2, 
            height: 85, 
            displayValue: false, 
            margin: 0
        });

        textManual.innerHTML = `400000<span class="id-last-five-highlight">00001</span>`;
        textManual.style.color = "#ccc";

        if (qrcode) { 
            qrcode.clear(); 
            qrcode.makeCode("40000000001"); 
        }
    }
}
async function gerarEtiquetas() {
    const facility = document.getElementById('in-facility').value.trim() || "FACILITY";
    const startNum = parseInt(document.getElementById('in-start').value);
    const qty = parseInt(document.getElementById('in-qty').value);
    const container = document.getElementById('print-container');

    if (isNaN(startNum) || isNaN(qty) || qty <= 0) {
        alert("Por favor, insira valores válidos para numeração e quantidade.");
        return;
    }

    container.innerHTML = ''; 

    for (let i = 0; i < qty; i++) {
        const num = startNum + i;
        const semIdText = `SEMID_${facility}_${num}`;
        
        const label = document.createElement('div');
        label.className = 'label-page';
        
        label.innerHTML = `
            <div style="width: 100%; text-align: center; margin-top: 5mm;">
                <img src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.5/mercadolibre/logo__large_plus.png" 
                     style="height:32px; display: block; margin: 0 auto;">
            </div>
            
            <div class="label-header-title" style="margin-top: 6mm;">SEM ID ${facility}</div>
            
            <div style="margin: 10mm 0; width: 100%; display: flex; justify-content: center;">
                <svg id="barcode-${i}" class="barcode-canvas"></svg>
            </div>
            
            <div class="id-text-display">${semIdText}</div>
            
            <div id="qrcode-${i}" style="display: flex; justify-content: center; width: 100%;"></div>
        `;
        
        container.appendChild(label);

        JsBarcode(`#barcode-${i}`, semIdText, {
            format: "CODE128",
            lineColor: "#000",
            width: 1.7, 
            height: 85,
            displayValue: false,
            margin: 0
        });

        new QRCode(document.getElementById(`qrcode-${i}`), {
            text: semIdText,
            width: 130,
            height: 130,
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    setTimeout(() => {
        window.print();
    }, 800);
}

document.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && document.activeElement.tagName === "INPUT") {
        gerarEtiquetas();
    }
});
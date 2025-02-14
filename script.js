let participantes = [];

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const loadingElement = document.getElementById('loading');
    const winnerElement = document.getElementById('winner');

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];

        if (file && file.type === 'text/csv') {
            const reader = new FileReader();

            reader.onload = function(e) {
                const content = e.target.result;
                participantes = content.split(/[\r\n]+/)
                    .map(linha => linha.trim())
                    .filter(nome => nome);

                if (participantes.length === 0) {
                    alert('O arquivo parece estar vazio ou mal formatado.');
                    fileInput.value = ''; // Reseta o input
                }
            };

            reader.onerror = function() {
                alert('Erro ao ler o arquivo. Tente novamente.');
                fileInput.value = ''; // Reseta o input
            };

            reader.readAsText(file);
        } else {
            alert('Por favor, envie um arquivo CSV válido.');
            fileInput.value = ''; // Reseta o input
        }
    });

    window.sortear = function() {
        if (participantes.length === 0) {
            alert('Nenhum participante encontrado. Por favor, envie uma planilha válida.');
            return;
        }

        loadingElement.style.display = 'block';
        winnerElement.style.display = 'none';
        winnerElement.innerText = '';

        setTimeout(() => {
            const indice = Math.floor(Math.random() * participantes.length);
            const vencedor = participantes[indice];

            loadingElement.style.display = 'none';
            winnerElement.style.display = 'block';
            winnerElement.innerHTML = `
                <p>🎉 Parabéns ao vencedor! 🎉</p>
                <span>${sanitize(vencedor)}</span>
            `;

            const winnerName = winnerElement.querySelector('span');
            winnerName.style.fontSize = '2em';
            winnerName.style.color = '#FFD700';
            winnerName.style.fontWeight = 'bold';
        }, 3000); // 3 segundos de "Sorteando..."
    };

    function sanitize(text) {
        const div = document.createElement('div');
        div.innerText = text;
        return div.innerHTML;
    }
});
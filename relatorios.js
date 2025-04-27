
document.addEventListener('DOMContentLoaded', function() {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const planos = JSON.parse(localStorage.getItem('planos')) || [];
    const ordens = JSON.parse(localStorage.getItem('ordens')) || [];
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

    document.getElementById('card-equipamentos').querySelector('span').innerText = equipamentos.length;
    document.getElementById('card-planos').querySelector('span').innerText = planos.length;
    document.getElementById('card-os-abertas').querySelector('span').innerText = ordens.length;
    document.getElementById('card-os-concluidas').querySelector('span').innerText = historico.length;

    const ctx = document.getElementById('graficoPizza').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['OS Abertas', 'OS Concluídas'],
            datasets: [{
                label: 'Ordens de Serviço',
                data: [ordens.length, historico.length],
                backgroundColor: ['#fb8500', '#219ebc'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true
        }
    });
});

function exportarRelatorio() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'pt', 'a4');

    html2canvas(document.getElementById('relatorio-content')).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save('relatorio_pcm.pdf');
    });
}

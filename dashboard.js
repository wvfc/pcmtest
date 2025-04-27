
function carregarResumo() {
    const equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];
    const planos = JSON.parse(localStorage.getItem('planos')) || [];
    const ordens = JSON.parse(localStorage.getItem('ordens')) || [];
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    const alertas = document.querySelectorAll('#alerta-lista div').length;

    document.getElementById('card-equipamentos').querySelector('span').innerText = equipamentos.length;
    document.getElementById('card-planos').querySelector('span').innerText = planos.length;
    document.getElementById('card-os-abertas').querySelector('span').innerText = ordens.length;
    document.getElementById('card-os-concluidas').querySelector('span').innerText = historico.length;
    document.getElementById('card-alertas').querySelector('span').innerText = alertas;
}

function exportarBackup() {
    const dados = {
        equipamentos: JSON.parse(localStorage.getItem('equipamentos')) || [],
        planos: JSON.parse(localStorage.getItem('planos')) || [],
        ordens: JSON.parse(localStorage.getItem('ordens')) || [],
        historico: JSON.parse(localStorage.getItem('historico')) || []
    };
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_soutech_pcm.json';
    a.click();
}

function importarBackup(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const dados = JSON.parse(e.target.result);
            if (dados.equipamentos && dados.planos && dados.ordens && dados.historico) {
                localStorage.setItem('equipamentos', JSON.stringify(dados.equipamentos));
                localStorage.setItem('planos', JSON.stringify(dados.planos));
                localStorage.setItem('ordens', JSON.stringify(dados.ordens));
                localStorage.setItem('historico', JSON.stringify(dados.historico));
                alert('Backup restaurado com sucesso! Recarregando...');
                location.reload();
            } else {
                alert('Arquivo inválido.');
            }
        } catch (error) {
            alert('Erro ao importar backup.');
        }
    };
    reader.readAsText(file);
}

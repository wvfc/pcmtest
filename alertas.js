
function carregarAlertas() {
    const planos = JSON.parse(localStorage.getItem('planos')) || [];
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    const listaAlertas = document.getElementById('alerta-lista');
    listaAlertas.innerHTML = '';

    const hoje = new Date();

    planos.forEach(plan => {
        let ultimoServico = historico.filter(h => h.equipamento === plan.equipamento)
                                     .map(h => new Date(h.data))
                                     .sort((a, b) => b - a)[0];

        if (!ultimoServico) {
            ultimoServico = new Date('2000-01-01');
        }

        const diasDesdeUltima = Math.floor((hoje - ultimoServico) / (1000 * 60 * 60 * 24));
        const frequenciaDias = parseInt(plan.frequencia) || 0;

        if (diasDesdeUltima >= frequenciaDias && frequenciaDias > 0) {
            const div = document.createElement('div');
            div.style.background = '#ef476f';
            div.style.color = 'white';
            div.style.padding = '10px';
            div.style.marginBottom = '10px';
            div.style.borderRadius = '8px';
            div.innerHTML = `⚠️ Atenção: Equipamento <b>${plan.equipamento}</b> está com manutenção vencida! Última há ${diasDesdeUltima} dias.
                <br><button onclick="gerarOS('${plan.equipamento}')" style="margin-top:10px;padding:6px 12px;border:none;border-radius:5px;background:white;color:#ef476f;font-weight:bold;cursor:pointer;">Gerar OS 🛠️</button>`;
            listaAlertas.appendChild(div);
        }
    });
}

function gerarOS(equipamento) {
    const ordens = JSON.parse(localStorage.getItem('ordens')) || [];
    ordens.push({
        equipamento: equipamento,
        descricao: 'Manutenção preventiva programada conforme plano.',
        status: 'Aberta',
        data: new Date().toISOString()
    });
    localStorage.setItem('ordens', JSON.stringify(ordens));

    alert('Ordem de Serviço criada com sucesso para ' + equipamento + '!');
    location.reload();
}

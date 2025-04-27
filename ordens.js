
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('os-form');
    const list = document.getElementById('os-list');
    const searchInput = document.getElementById('search-os');
    const statusFilter = document.getElementById('filter-status');
    let ordens = JSON.parse(localStorage.getItem('ordens')) || [];

    function render(filtro = '', status = '') {
        list.innerHTML = '';
        ordens
            .filter(os => (os.equipamento + os.descricao).toLowerCase().includes(filtro.toLowerCase()) &&
                          (status ? os.status === status : true))
            .forEach((os, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<b>${os.equipamento || 'Sem equipamento'}</b> - ${os.descricao || 'Sem descrição'} - ${os.status}
                    <button onclick="finalizarOS(${index})">Finalizar</button>`;
                list.appendChild(li);
            });
    }

    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        ordens.push({
            equipamento: document.getElementById('equipamento').value.trim(),
            descricao: document.getElementById('descricao').value.trim(),
            status: 'Aberta',
            data: new Date().toISOString()
        });
        localStorage.setItem('ordens', JSON.stringify(ordens));
        form.reset();
        render();
    });

    window.finalizarOS = function(index) {
        ordens[index].status = 'Concluída';
        let historico = JSON.parse(localStorage.getItem('historico')) || [];
        historico.push(ordens[index]);
        localStorage.setItem('historico', JSON.stringify(historico));
        ordens.splice(index, 1);
        localStorage.setItem('ordens', JSON.stringify(ordens));
        render();
    };

    searchInput?.addEventListener('input', () => render(searchInput.value, statusFilter?.value || ''));
    statusFilter?.addEventListener('change', () => render(searchInput?.value || '', statusFilter.value));

    render();
});

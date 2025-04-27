
document.addEventListener('DOMContentLoaded', function() {
    const list = document.getElementById('historico-list');
    const searchInput = document.getElementById('search-historico');
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

    function render(filtro = '') {
        list.innerHTML = '';
        historico
            .filter(h => (h.equipamento + h.descricao).toLowerCase().includes(filtro.toLowerCase()))
            .forEach(h => {
                const li = document.createElement('li');
                li.innerText = `${h.equipamento || 'Equipamento não informado'} - ${h.descricao || 'Sem descrição'} - Concluído em ${h.data ? new Date(h.data).toLocaleDateString() : 'Data indefinida'}`;
                list.appendChild(li);
            });
    }

    searchInput?.addEventListener('input', () => render(searchInput.value));
    render();
});

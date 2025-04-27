
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('equip-form');
    const list = document.getElementById('equip-list');
    const searchInput = document.getElementById('search-equip');
    const typeFilter = document.getElementById('filter-type');
    let equipamentos = JSON.parse(localStorage.getItem('equipamentos')) || [];

    function render(filtro = '', tipo = '') {
        list.innerHTML = '';
        equipamentos
            .filter(eq => (eq.nome + eq.tag).toLowerCase().includes(filtro.toLowerCase()) &&
                          (tipo ? eq.tipo === tipo : true))
            .forEach((eq, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<b>${eq.nome || 'Não informado'}</b> (${eq.tag || 'Sem tag'}) - ${eq.localizacao || 'Sem localização'} - ${eq.tipo || 'Sem tipo'}
                    <button onclick="deleteEquip(${index})">Excluir</button>`;
                list.appendChild(li);
            });
    }

    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        equipamentos.push({
            nome: document.getElementById('nome').value.trim(),
            tag: document.getElementById('tag').value.trim(),
            localizacao: document.getElementById('localizacao').value.trim(),
            tipo: document.getElementById('tipo').value.trim()
        });
        localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
        form.reset();
        render();
    });

    window.deleteEquip = function(index) {
        equipamentos.splice(index, 1);
        localStorage.setItem('equipamentos', JSON.stringify(equipamentos));
        render();
    };

    searchInput?.addEventListener('input', () => render(searchInput.value, typeFilter?.value || ''));
    typeFilter?.addEventListener('change', () => render(searchInput?.value || '', typeFilter.value));

    render();
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('plan-form');
    const list = document.getElementById('plan-list');
    const searchInput = document.getElementById('search-plan');
    const typeFilter = document.getElementById('filter-plan-type');
    let planos = JSON.parse(localStorage.getItem('planos')) || [];

    function render(filtro = '', tipo = '') {
        list.innerHTML = '';
        planos
            .filter(plan => plan.equipamento.toLowerCase().includes(filtro.toLowerCase()) &&
                            (tipo ? plan.tipo === tipo : true))
            .forEach((plan, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<b>${plan.equipamento || 'Sem equipamento'}</b> - ${plan.tipo || 'Tipo não informado'} - ${plan.frequencia || 'Sem frequência'} dias
                    <button onclick="deletePlan(${index})">Excluir</button>`;
                list.appendChild(li);
            });
    }

    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        planos.push({
            equipamento: document.getElementById('equipamento').value.trim(),
            tipo: document.getElementById('tipo').value.trim(),
            frequencia: document.getElementById('frequencia').value.trim()
        });
        localStorage.setItem('planos', JSON.stringify(planos));
        form.reset();
        render();
    });

    window.deletePlan = function(index) {
        planos.splice(index, 1);
        localStorage.setItem('planos', JSON.stringify(planos));
        render();
    };

    searchInput?.addEventListener('input', () => render(searchInput.value, typeFilter?.value || ''));
    typeFilter?.addEventListener('change', () => render(searchInput?.value || '', typeFilter.value));

    render();
});

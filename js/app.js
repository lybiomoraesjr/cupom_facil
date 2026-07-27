document.addEventListener('DOMContentLoaded', () => {
    updateMisturas();
    setupEventListeners();
    toggleOrderTypeFields(); // Call on load to set initial state
});

let currentOrder = {
    items: [],
    deliveryFee: 0,
};

function updateMisturas() {
    const misturaSelect = document.getElementById('item-mixture');
    
    misturaSelect.innerHTML = '<option value="">Selecione a mistura</option>';
    if (MISTURAS && MISTURAS.length > 0) {
        MISTURAS.forEach(mistura => {
            const option = document.createElement('option');
            option.value = mistura;
            option.textContent = mistura;
            misturaSelect.appendChild(option);
        });
    } else {
        misturaSelect.innerHTML = '<option value="">Nenhuma mistura disponível</option>';
    }
}

function setupEventListeners() {
    document.getElementById('item-size').addEventListener('change', () => {
        const size = document.getElementById('item-size').value;
        document.getElementById('item-mixture').disabled = !size;
    });

    document.getElementById('payment-method').addEventListener('change', (e) => {
        document.getElementById('payment-change').style.display = e.target.value === 'dinheiro' ? 'inline-block' : 'none';
    });
}

function toggleOrderTypeFields() {
    const orderType = document.getElementById('order-type').value;
    const clientData = document.getElementById('client-data-fieldset');
    const deliveryFields = document.getElementById('delivery-fields');
    const deliveryFeeFieldset = document.getElementById('delivery-fee-fieldset');

    clientData.style.display = 'block';
    deliveryFields.style.display = 'none';
    deliveryFeeFieldset.style.display = 'none';
    currentOrder.deliveryFee = 0;


    if (orderType === 'delivery') {
        deliveryFields.style.display = 'block';
        deliveryFeeFieldset.style.display = 'block';
        currentOrder.deliveryFee = 5.00;
        document.getElementById('delivery-fee').value = '5.00';

    } else if (orderType === 'local') {
        clientData.style.display = 'none';
    }
    updateTotal();
}

function addItem() {
    const size = document.getElementById('item-size').value;
    const mixture = document.getElementById('item-mixture').value;
    const observation = document.getElementById('item-observation').value;

    if (!size || !mixture) {
        alert('Por favor, selecione o tamanho e a mistura da marmitex.');
        return;
    }

    const price = PRECOS[size];
    const item = {
        id: Date.now(),
        type: 'marmitex',
        size,
        mixture,
        price,
        observation,
    };

    currentOrder.items.push(item);
    renderOrderSummary();
    updateTotal();
    clearItemInputs();
}

function addCustomItem() {
    const qty = parseInt(document.getElementById('custom-item-qty').value);
    const name = document.getElementById('custom-item-name').value;
    const price = parseFloat(document.getElementById('custom-item-price').value);

    if (qty <= 0 || !name || isNaN(price) || price <= 0) {
        alert('Por favor, preencha a quantidade, nome e preço do produto.');
        return;
    }

    const item = {
        id: Date.now(),
        type: 'custom',
        qty,
        name,
        price: qty * price,
        unitPrice: price
    };

    currentOrder.items.push(item);
    renderOrderSummary();
    updateTotal();
    clearCustomItemInputs();
}


function renderOrderSummary() {
    const summaryList = document.getElementById('order-summary');
    summaryList.innerHTML = '';

    currentOrder.items.forEach(item => {
        const li = document.createElement('li');
        li.className = 'p-2 border-b flex justify-between items-center';
        
        let text;
        if (item.type === 'marmitex') {
            text = `${item.size} - ${item.mixture}`;
            if (item.observation) {
                text += ` <span class="text-sm text-gray-500">(${item.observation})</span>`;
            }
        } else {
            text = `${item.qty}x ${item.name}`;
        }

        li.innerHTML = `
            <span>${text} (R$ ${item.price.toFixed(2)})</span>
            <button onclick="removeItem(${item.id})" class="bg-red-500 text-white px-2 py-1 rounded-md text-sm">Remover</button>
        `;
        summaryList.appendChild(li);
    });
}

function removeItem(itemId) {
    currentOrder.items = currentOrder.items.filter(item => item.id !== itemId);
    renderOrderSummary();
    updateTotal();
}

function clearItemInputs() {
    document.getElementById('item-size').value = '';
    document.getElementById('item-mixture').value = '';
    document.getElementById('item-observation').value = '';
    document.getElementById('item-mixture').disabled = true;
}

function clearCustomItemInputs() {
    document.getElementById('custom-item-qty').value = '1';
    document.getElementById('custom-item-name').value = '';
    document.getElementById('custom-item-price').value = '';
}

function applyManualFee() {
    const manualFee = parseFloat(document.getElementById('delivery-fee').value);
    if (!isNaN(manualFee) && manualFee >= 0) {
        currentOrder.deliveryFee = manualFee;
        updateTotal();
    }
}

function updateTotal() {
    const subtotal = currentOrder.items.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + currentOrder.deliveryFee;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('delivery-fee-summary').textContent = currentOrder.deliveryFee.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function printOnly() {
    if (currentOrder.items.length === 0) {
        alert("Nenhum item no pedido para imprimir.");
        return;
    }
    prepareReceipt();
    window.print();
}

function finalizeOrder() {
    currentOrder = { items: [], deliveryFee: 0 };
    renderOrderSummary();
    toggleOrderTypeFields(); // to reset delivery fee
    updateTotal();
    document.getElementById('client-name').value = '';
    document.getElementById('client-cep').value = '';
    document.getElementById('client-street').value = '';
    document.getElementById('client-number').value = '';
    document.getElementById('client-neighborhood').value = '';
    document.getElementById('client-complement').value = '';
    document.getElementById('client-reference').value = '';
    document.getElementById('client-phone').value = '';
    document.getElementById('payment-change').value = '';
    clearCustomItemInputs();
    clearItemInputs();
    alert("Pedido finalizado. Pronto para o próximo!");
}

function prepareReceipt() {
    const orderType = document.getElementById('order-type');
    const selectedOrderType = orderType.options[orderType.selectedIndex].text;
    
    // Header
    document.getElementById('receipt-date').textContent = new Date().toLocaleString('pt-BR');

    // Client Data
    const clientName = document.getElementById('client-name').value;
    const clientPhone = document.getElementById('client-phone').value;
    const clientStreet = document.getElementById('client-street').value;
    const clientNumber = document.getElementById('client-number').value;
    const clientNeighborhood = document.getElementById('client-neighborhood').value;
    const clientComplement = document.getElementById('client-complement').value;
    const clientReference = document.getElementById('client-reference').value;

    document.getElementById('receipt-client-name').textContent = clientName || 'N/A';
    document.getElementById('receipt-client-phone').textContent = clientPhone || 'N/A';
    document.getElementById('receipt-client-street').textContent = clientStreet || 'N/A';
    document.getElementById('receipt-client-number').textContent = clientNumber || 'N/A';
    document.getElementById('receipt-client-neighborhood').textContent = clientNeighborhood || 'N/A';
    document.getElementById('receipt-client-complement').textContent = clientComplement || 'N/A';
    document.getElementById('receipt-client-reference').textContent = clientReference || 'N/A';
    document.getElementById('receipt-order-type').textContent = selectedOrderType;

    document.getElementById('receipt-client-address-line').style.display = clientStreet ? 'block' : 'none';
    document.getElementById('receipt-client-neighborhood-line').style.display = clientNeighborhood ? 'block' : 'none';
    document.getElementById('receipt-client-complement-line').style.display = clientComplement ? 'block' : 'none';
    document.getElementById('receipt-client-reference-line').style.display = clientReference ? 'block' : 'none';


    // Items
    const itemsTable = document.getElementById('receipt-items-table');
    itemsTable.innerHTML = '';
    currentOrder.items.forEach(item => {
        if (item.type === 'marmitex') {
            const tr = document.createElement('tr');
            let accompaniments = REGRAS_EXCECAO_ACOMPANHAMENTO[item.mixture] || ACOMPANHAMENTOS_BASE;

            tr.innerHTML = `
                <td colspan="2"><strong>${item.mixture} (${item.size})</strong></td>
                <td>R$ ${item.price.toFixed(2)}</td>
            `;
            itemsTable.appendChild(tr);

            const trAccompaniments = document.createElement('tr');
            trAccompaniments.innerHTML = `<td colspan="3" class="item-accompaniments">${accompaniments}</td>`;
            itemsTable.appendChild(trAccompaniments);

            if (item.observation) {
                const trObs = document.createElement('tr');
                trObs.innerHTML = `<td colspan="3" class="item-obs">Obs: ${item.observation}</td>`;
                itemsTable.appendChild(trObs);
            }
        } else { // custom item
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.qty}x</td>
                <td><strong>${item.name}</strong></td>
                <td>R$ ${item.price.toFixed(2)}</td>
            `;
            itemsTable.appendChild(tr);
        }
    });

    // Total
    const subtotal = currentOrder.items.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + currentOrder.deliveryFee;
    const paymentMethod = document.getElementById('payment-method');
    const selectedPayment = paymentMethod.options[paymentMethod.selectedIndex].text;
    const paymentChange = document.getElementById('payment-change').value;

    document.getElementById('receipt-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('receipt-delivery-fee').textContent = currentOrder.deliveryFee.toFixed(2);
    document.getElementById('receipt-total').textContent = total.toFixed(2);
    document.getElementById('receipt-payment-method').textContent = selectedPayment;
    
    if (selectedPayment === 'Dinheiro' && paymentChange) {
        document.getElementById('receipt-payment-change-line').style.display = 'block';
        document.getElementById('receipt-payment-change').textContent = parseFloat(paymentChange).toFixed(2);

    } else {
        document.getElementById('receipt-payment-change-line').style.display = 'none';
    }
}

function fetchAddress(force = false) {
    const cepField = document.getElementById('client-cep');
    const cep = cepField.value.replace(/\D/g, '');

    if (force || cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('client-street').value = data.logradouro;
                    document.getElementById('client-neighborhood').value = data.bairro;
                    document.getElementById('client-complement').value = data.complemento;
                    document.getElementById('client-number').focus();
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar CEP:', error);
                alert('Não foi possível buscar o CEP.');
            });
    }
}
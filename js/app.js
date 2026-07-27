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

    // Add event listeners to remove red border and hide error message on input
    const requiredFields = ['client-name', 'client-street', 'client-neighborhood'];
    requiredFields.forEach(fieldId => {
        document.getElementById(fieldId).addEventListener('input', (e) => {
            e.target.classList.remove('border-red-500');
            const errorDiv = document.getElementById('error-message');
            errorDiv.classList.add('hidden');
            errorDiv.textContent = '';
        });
    });
}

function updateItemOptions(orderType) {
    const sizeSelect = document.getElementById('item-size');
    const sizeLabel = document.querySelector('label[for="item-size"]');
    sizeSelect.innerHTML = ''; // Clear existing options

    if (orderType === 'local') {
        sizeLabel.textContent = 'Tipo de Prato:';
        sizeSelect.add(new Option('Selecione o Tipo', ''));
        for (const [key, value] of Object.entries(PRECOS_LOCAL)) {
            sizeSelect.add(new Option(`${key} - R$ ${value.toFixed(2)}`, key));
        }
    } else {
        sizeLabel.textContent = 'Marmitex:';
        sizeSelect.add(new Option('Selecione o Tamanho', ''));
        for (const [key, value] of Object.entries(PRECOS)) {
            sizeSelect.add(new Option(`${key} - R$ ${value.toFixed(2)}`, key));
        }
    }
}

function toggleOrderTypeFields() {
    const orderType = document.getElementById('order-type').value;
    const clientData = document.getElementById('client-data-fieldset');
    const deliveryFields = document.getElementById('delivery-fields');
    const deliveryFeeFieldset = document.getElementById('delivery-fee-fieldset');

    // Reset all fields visibility
    clientData.style.display = 'block';
    deliveryFields.style.display = 'none';
    deliveryFeeFieldset.style.display = 'none';
    currentOrder.deliveryFee = 0;

    updateItemOptions(orderType);

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
    const orderType = document.getElementById('order-type').value;
    const qty = parseInt(document.getElementById('item-qty').value);
    const size = document.getElementById('item-size').value;
    const mixture = document.getElementById('item-mixture').value;
    const observation = document.getElementById('item-observation').value;

    if (qty <= 0 || !size || !mixture) {
        alert('Por favor, preencha a quantidade, tipo/tamanho e a mistura.');
        return;
    }

    let unitPrice;
    let description;
    if (orderType === 'local') {
        unitPrice = PRECOS_LOCAL[size];
        description = size; // "Prato Feito" or "Comercial"
    } else {
        unitPrice = PRECOS[size];
        description = `Marmitex (${size})`;
    }

    const item = {
        id: Date.now(),
        type: 'meal', // Generic type for marmitex or prato feito
        qty,
        description,
        mixture,
        price: qty * unitPrice,
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
        if (item.type === 'meal') {
            text = `${item.qty}x ${item.description} - ${item.mixture}`;
            if (item.observation) {
                text += ` <span class="text-sm text-gray-500">(${item.observation})</span>`;
            }
        } else { // custom
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
    document.getElementById('item-qty').value = '1';
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

function validateDeliveryFields() {
    const orderType = document.getElementById('order-type').value;
    const errorDiv = document.getElementById('error-message');
    
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';
    const requiredFieldIds = ['client-name', 'client-street', 'client-neighborhood'];
    requiredFieldIds.forEach(id => document.getElementById(id).classList.remove('border-red-500'));

    if (orderType !== 'delivery') {
        return true;
    }

    const requiredFields = {
        'client-name': 'Nome do cliente',
        'client-street': 'Rua',
        'client-neighborhood': 'Bairro'
    };
    let isValid = true;
    let missingFields = [];

    for (const fieldId in requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('border-red-500');
            missingFields.push(requiredFields[fieldId]);
        }
    }

    if (!isValid) {
        errorDiv.textContent = `Campos obrigatórios para Delivery: ${missingFields.join(', ')}.`;
        errorDiv.classList.remove('hidden');
    }

    return isValid;
}

function printOnly() {
    if (currentOrder.items.length === 0) {
        alert("Nenhum item no pedido para imprimir.");
        return;
    }
    if (!validateDeliveryFields()) {
        return;
    }
    prepareReceipt();
    window.print();
}

function finalizeOrder() {
    const confirmation = window.confirm("Tem certeza que deseja cancelar o pedido? Isso vai apagar todo o conteúdo.");
    if (!confirmation) {
        return;
    }

    currentOrder = { items: [], deliveryFee: 0 };
    renderOrderSummary();
    toggleOrderTypeFields();
    updateTotal();
    document.getElementById('client-name').value = '';
    document.getElementById('client-street').value = '';
    document.getElementById('client-number').value = '';
    document.getElementById('client-neighborhood').value = '';
    document.getElementById('client-complement').value = '';
    document.getElementById('client-reference').value = '';
    document.getElementById('client-phone').value = '';
    document.getElementById('payment-change').value = '';
    clearCustomItemInputs();
    clearItemInputs();
    alert("Pedido cancelado. Pronto para o próximo!");
}

function prepareReceipt() {
    const orderType = document.getElementById('order-type');
    const selectedOrderType = orderType.options[orderType.selectedIndex].text;
    
    document.getElementById('receipt-date').textContent = new Date().toLocaleString('pt-BR');

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

    const itemsTable = document.getElementById('receipt-items-table');
    itemsTable.innerHTML = '';
    currentOrder.items.forEach(item => {
        if (item.type === 'meal') {
            const tr = document.createElement('tr');
            let accompaniments = REGRAS_EXCECAO_ACOMPANHAMENTO[item.mixture] || ACOMPANHAMENTOS_BASE;

            tr.innerHTML = `
                <td>${item.qty}x</td>
                <td><strong>${item.description} - ${item.mixture}</strong></td>
                <td>R$ ${item.price.toFixed(2)}</td>
            `;
            itemsTable.appendChild(tr);

            const trAccompaniments = document.createElement('tr');
            trAccompaniments.innerHTML = `<td colspan="3" class="item-accompaniments">${accompaniments}</td>`;
            itemsTable.appendChild(trAccompaniments);

            if (item.observation) {
                const trObs = document.createElement('tr');
                trObs.innerHTML = `<td colspan="3" class="item-obs"><strong>Obs: ${item.observation}</strong></td>`;
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

    const subtotal = currentOrder.items.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + currentOrder.deliveryFee;
    const paymentMethod = document.getElementById('payment-method');
    const selectedPayment = paymentMethod.options[paymentMethod.selectedIndex].text;
    const paymentChange = document.getElementById('payment-change').value;
    const paymentStatusSelect = document.getElementById('payment-status');
    const paymentStatusValue = paymentStatusSelect.value;
    const paymentStatusText = paymentStatusSelect.options[paymentStatusSelect.selectedIndex].text;

    document.getElementById('receipt-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('receipt-delivery-fee').textContent = currentOrder.deliveryFee.toFixed(2);
    document.getElementById('receipt-total').textContent = total.toFixed(2);
    document.getElementById('receipt-payment-method').textContent = selectedPayment;
    document.getElementById('receipt-payment-status').textContent = paymentStatusText;

    if (paymentStatusValue === 'pago') {
        document.getElementById('receipt-amount-to-charge').textContent = '0.00';
    } else {
        document.getElementById('receipt-amount-to-charge').textContent = total.toFixed(2);
    }
    
    if (selectedPayment === 'Dinheiro' && paymentChange) {
        document.getElementById('receipt-payment-change-line').style.display = 'block';
        document.getElementById('receipt-payment-change').textContent = parseFloat(paymentChange).toFixed(2);
    } else {
        document.getElementById('receipt-payment-change-line').style.display = 'none';
    }
}

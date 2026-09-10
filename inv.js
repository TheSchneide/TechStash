if (!localStorage.getItem('techStash_inv')) {
    const dummyData = [
        { id: 1, name: 'AMD Ryzen 5 5600G', category: 'CPU', condition: 'Used - Good', price: 6500, status: 'In Stock' },
        { id: 2, name: 'AMD Radeon RX 5700 XT', category: 'GPU', condition: 'Used - Good', price: 9000, status: 'In Stock' },
        { id: 3, name: 'Biostar B450MX-S', category: 'Motherboard', condition: 'Brand New', price: 3500, status: 'Reserved' }
    ];
    localStorage.setItem('techStash_inv', JSON.stringify(dummyData));
}

function loadTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    const inventory = JSON.parse(localStorage.getItem('techStash_inv')) || [];
    tableBody.innerHTML = '';

    inventory.forEach(item => {
        const badgeClass = item.status === 'Reserved' ? 'badge-reserved' : 'badge-stock';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.condition}</td>
            <td>₱${item.price}</td>
            <td><span class="badge ${badgeClass}">${item.status}</span></td>
            <td>
                <button class="btn btn-edit" onclick="editItem(${item.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        let inventory = JSON.parse(localStorage.getItem('techStash_inv'));
        inventory = inventory.filter(item => item.id !== id);
        localStorage.setItem('techStash_inv', JSON.stringify(inventory));
        loadTable();
    }
}

function editItem(id) {
    window.location.href = `inv-form.html?id=${id}`;
}

loadTable();
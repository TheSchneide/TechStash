async function loadTable() {
    try {
        const response = await fetch('/api/techs');
        const inventory = await response.json();
        const tableBody = document.getElementById('inventoryTableBody');
        tableBody.innerHTML = '';

        inventory.forEach(item => {
            const badgeClass = (item.status === 'Reserved' || item.status === 'Sold') ? 'badge-reserved' : 'badge-stock';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.condition}</td>
                <td>₱${Number(item.price).toLocaleString()}</td>
                <td><span class="badge ${badgeClass}">${item.status}</span></td>
                <td>
                    <button class="btn btn-edit" onclick="editItem(${item.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading inventory:', error);
    }
}

async function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            const response = await fetch(`/api/techs/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                loadTable();
            } else {
                alert('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }
}

function editItem(id) {
    window.location.href = `inv-form.html?id=${id}`;
}

loadTable();
const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('id');

if (editId) {
    document.getElementById('pageTitle').textContent = 'Edit Item';
    const inventory = JSON.parse(localStorage.getItem('techStash_inv')) || [];
    const itemToEdit = inventory.find(item => item.id == editId);
    
    if (itemToEdit) {
        document.getElementById('itemId').value = itemToEdit.id;
        document.getElementById('itemName').value = itemToEdit.name;
        document.getElementById('itemCategory').value = itemToEdit.category;
        document.getElementById('itemCondition').value = itemToEdit.condition;
        document.getElementById('itemPrice').value = itemToEdit.price;
        document.getElementById('itemStatus').value = itemToEdit.status;
    }
}

document.getElementById('itemForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    let inventory = JSON.parse(localStorage.getItem('techStash_inv')) || [];
    
    const itemData = {
        name: document.getElementById('itemName').value,
        category: document.getElementById('itemCategory').value,
        condition: document.getElementById('itemCondition').value,
        price: document.getElementById('itemPrice').value,
        status: document.getElementById('itemStatus').value
    };

    if (editId) {
        itemData.id = parseInt(editId);
        const index = inventory.findIndex(item => item.id == editId);
        inventory[index] = itemData;
    } else {
        itemData.id = Date.now(); 
        inventory.push(itemData);
    }

    localStorage.setItem('techStash_inv', JSON.stringify(inventory));
    
    window.location.href = 'inv.html';
});
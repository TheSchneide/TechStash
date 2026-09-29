const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get('id');

if (editId) {
    document.getElementById('pageTitle').textContent = 'Edit Item';
    fetch(`/api/techs/${editId}`)
        .then(res => res.json())
        .then(itemToEdit => {
            if (itemToEdit) {
                document.getElementById('itemId').value = itemToEdit.id;
                document.getElementById('itemName').value = itemToEdit.name;
                document.getElementById('itemCategory').value = itemToEdit.category;
                document.getElementById('itemCondition').value = itemToEdit.condition;
                document.getElementById('itemPrice').value = itemToEdit.price;
                document.getElementById('itemStatus').value = itemToEdit.status;
            }
        })
        .catch(err => console.error('Error fetching item:', err));
}

document.getElementById('itemForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    const itemData = {
        name: document.getElementById('itemName').value,
        category: document.getElementById('itemCategory').value,
        condition: document.getElementById('itemCondition').value,
        price: parseFloat(document.getElementById('itemPrice').value),
        status: document.getElementById('itemStatus').value
    };

    try {
        let url = '/api/techs';
        let method = 'POST';

        if (editId) {
            url = `/api/techs/${editId}`;
            method = 'PUT';
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });

        if (response.ok) {
            window.location.href = 'inv.html';
        } else {
            alert('Failed to save item');
        }
    } catch (error) {
        console.error('Error saving item:', error);
    }
});
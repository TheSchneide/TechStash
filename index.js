async function loadDashboard() {
    try {
        const response = await fetch('/api/techs');
        const inventory = await response.json();
        
        const totalItemsCount = inventory.length;
        const totalValueAmount = inventory.reduce((sum, item) => sum + Number(item.price), 0);
        const reservedOrSold = inventory.filter(item => 
            item.status === 'Reserved' || item.status === 'Sold'
        ).length;

        document.getElementById('totalItems').textContent = totalItemsCount;
        document.getElementById('totalValue').textContent = totalValueAmount.toLocaleString(); 
        document.getElementById('totalReserved').textContent = reservedOrSold;

        const tableBody = document.getElementById('recentTableBody');
        tableBody.innerHTML = '';

        const recentItems = [...inventory].reverse().slice(0, 3);

        recentItems.forEach(item => {
            const badgeClass = (item.status === 'Reserved' || item.status === 'Sold') 
                ? 'badge-reserved' 
                : 'badge-stock';
                
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>₱${Number(item.price).toLocaleString()}</td>
                <td><span class="badge ${badgeClass}">${item.status}</span></td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

loadDashboard();
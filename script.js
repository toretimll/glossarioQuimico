document.addEventListener('DOMContentLoaded', () => {
    loadTerms();
    resetFilters();
});

function loadTerms() {
    const container = document.getElementById('itemsContainer');
    termsData.forEach((term, index) => {
        const itemHTML = `
            <div class="item category-${term.categories.join(' category-')}">
                <button class="term-button" onclick="toggleContent(${index})">${term.name}</button>
                <div class="content" id="content-${index}" style="display:none;">
                    <p>${term.description}</p>
                    <img src="${term.gif}" alt="Descrição do GIF">
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', itemHTML);
    });
}

function toggleContent(index) {
    const content = document.getElementById(`content-${index}`);
    content.style.display = content.style.display === "none" || content.style.display === "" ? "block" : "none";
}

function filterItems() {
    const checkboxes = document.querySelectorAll('.category-checkboxes input[type="checkbox"]');
    const items = document.querySelectorAll('.item');
    const selectedCategories = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => `category-${checkbox.value}`);
    let hasVisibleItems = false;

    items.forEach(item => {
        const categories = Array.from(item.classList).filter(className => className.startsWith('category-'));
        const shouldShow = selectedCategories.length === 0 || selectedCategories.some(category => categories.includes(category));
        item.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) hasVisibleItems = true;
        item.querySelector('.content').style.display = 'none'; // fecha o conteúdo associado
    });

    document.getElementById('noResultsMessage').style.display = hasVisibleItems ? 'none' : 'block';
}

function resetFilters() {
    document.querySelectorAll('.category-checkboxes input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    filterItems();
}

function searchItems() {
    const searchBar = document.getElementById('searchBar');
    const searchText = searchBar.value.toLowerCase();
    const items = document.querySelectorAll('.item');
    let hasVisibleItems = false;

    items.forEach(item => {
        const textContent = item.textContent.toLowerCase();
        const shouldShow = textContent.includes(searchText);
        item.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) hasVisibleItems = true;
        item.querySelector('.content').style.display = 'none'; // fecha o conteúdo associado
    });

    document.getElementById('noResultsMessage').style.display = hasVisibleItems ? 'none' : 'block';
}

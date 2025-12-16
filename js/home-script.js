// 主页逻辑
document.addEventListener('DOMContentLoaded', async function() {
    // 初始化
    const dataLoader = new CharacterDataLoader();
    const wivesGrid = document.getElementById('wives-grid');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const wifeCount = document.getElementById('wife-count');
    const filterTags = document.getElementById('filter-tags');
    const modal = document.getElementById('character-modal');
    const closeModal = document.querySelector('.close-modal');

    // 创建背景爱心
    createBackgroundHearts();

    // 加载数据
    await loadAndDisplayCharacters();

    // 初始化标签筛选
    initializeFilterTags();

    // 搜索功能
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('input', debounce(handleSearch, 300));

    // 模态框控制
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 点击页面其他地方关闭模态框
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    async function loadAndDisplayCharacters() {
        // 显示加载中
        wivesGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-heartbeat fa-spin"></i>
                <p>正在加载老婆数据...</p>
            </div>
        `;

        // 加载数据
        const characters = await dataLoader.loadData();

        // 更新计数
        updateWifeCount(characters.length);

        // 显示角色卡片
        displayCharacters(characters);
    }

    function displayCharacters(characters) {
        if (characters.length === 0) {
            wivesGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-heart-broken"></i>
                    <p>没有找到匹配的老婆~</p>
                    <button id="reset-search" class="sort-btn" style="margin-top: 20px;">显示全部</button>
                </div>
            `;

            // 添加重置搜索按钮事件
            document.getElementById('reset-search')?.addEventListener('click', () => {
                searchInput.value = '';
                dataLoader.filteredCharacters = [...dataLoader.characters];
                displayCharacters(dataLoader.filteredCharacters);
                updateWifeCount(dataLoader.characters.length);
                setActiveFilterTag('all');
            });

            return;
        }

        const cardsHTML = characters.map(character => `
            <div class="wife-card" data-id="${character.id}">
                <i class="${character.icon} wife-icon"></i>
                <a href="character.html?id=${character.id}" class="wife-name">${character.name}</a>
                <p class="wife-desc">${character.description}</p>
                <div class="wife-tags">
                    ${character.tags.slice(0, 3).map(tag => `<span class="wife-tag">${tag}</span>`).join('')}
                </div>
                <div class="card-bg" style="background: linear-gradient(135deg, ${character.color}40, transparent);"></div>
            </div>
        `).join('');

        wivesGrid.innerHTML = cardsHTML;

        // 重新附加点击事件
        attachCardClickEvents();
    }

    function initializeFilterTags() {
        const tags = dataLoader.getAllTags();
        const tagsHTML = tags.map(tag => `
            <span class="filter-tag ${tag === 'all' ? 'active' : ''}" data-tag="${tag}">
                ${tag === 'all' ? '全部' : tag}
            </span>
        `).join('');

        filterTags.innerHTML = tagsHTML;

        // 为标签添加点击事件
        filterTags.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tag')) {
                const tag = e.target.dataset.tag;
                setActiveFilterTag(tag);
                const filtered = dataLoader.filterByTag(tag);
                updateWifeCount(filtered.length);
                displayCharacters(filtered);
            }
        });
    }

    function setActiveFilterTag(activeTag) {
        document.querySelectorAll('.filter-tag').forEach(tag => {
            if (tag.dataset.tag === activeTag) {
                tag.classList.add('active');
            } else {
                tag.classList.remove('active');
            }
        });
    }

    function setActiveSort(activeSort) {
        [sortDefaultBtn, sortNameBtn, sortDateBtn].forEach(btn => {
            btn.classList.remove('active');
        });

        switch(activeSort) {
            case 'default':
                sortDefaultBtn.classList.add('active');
                break;
            case 'name':
                sortNameBtn.classList.add('active');
                break;
            case 'date':
                sortDateBtn.classList.add('active');
                break;
        }
    }

    function handleSearch() {
        const query = searchInput.value;
        const filtered = dataLoader.searchCharacters(query);
        updateWifeCount(filtered.length);
        displayCharacters(filtered);

        // 重置标签筛选状态
        setActiveFilterTag('all');
    }

    function updateWifeCount(count) {
        wifeCount.textContent = count;
    }

    function attachCardClickEvents() {
        const wifeCards = document.querySelectorAll('.wife-card');
        wifeCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.tagName === 'A') return;

                const link = this.querySelector('a');
                if (link) {
                    // 点击效果
                    this.style.transform = 'scale(0.95)';
                    this.style.boxShadow = '0 0 30px rgba(227, 127, 229, 0.5)';

                    setTimeout(() => {
                        this.style.transform = '';
                        this.style.boxShadow = '';
                        // 直接跳转，不再预览
                        window.location.href = link.href;
                    }, 200);
                }
            });
        });
    }

    // 防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});

// 创建背景爱心
function createBackgroundHearts() {
    const bgHearts = document.getElementById('bg-hearts');
    const heartCount = 25;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';

        // 随机属性
        const left = Math.random() * 100;
        const size = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.2 + 0.05;

        heart.style.left = `${left}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.opacity = opacity;

        bgHearts.appendChild(heart);
    }
}
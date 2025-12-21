// ================ 轮播图状态 ================
let currentSlide = 0;
let carouselImages = [];
let carouselInterval = null;

// ================ 主加载函数 ================
async function loadCharacter() {
    console.log("开始加载角色数据...");

    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('id') || 'eromanga';
    console.log("角色ID:", characterId);

    let characterData = null;

    // 尝试加载JSON数据
    try {
        const response = await fetch('../MyGirlfriends/data/characters.json');
        if (response.ok) {
            const jsonData = await response.json();
            characterData = jsonData.characters.find(c => c.id === characterId);
            console.log("从JSON加载成功");
        }
    } catch (error) {
        console.log("JSON加载失败:", error.message);
    }

    // 如果JSON加载失败，使用测试数据
    if (!characterData) {
        characterData = testCharacters.find(c => c.id === characterId) || testCharacters[0];
        console.log("使用测试数据");
    }

    // 设置页面标题
    document.title = `${characterData.name} - 老婆之家`;
    document.getElementById('character-title').textContent = characterData.name;

    // 渲染信息卡片
    renderInfoCard(characterData);

    // 初始化轮播图
    initCarousel(characterData);

    console.log("页面加载完成！");
}

// ================ 信息卡片渲染 ================
function renderInfoCard(characterData) {
    const infoCard = document.getElementById('info-card');

    infoCard.innerHTML = `
        <div class="info-header">
            <div class="info-avatar">
                <img src="${characterData.avatar}" alt="${characterData.name}" draggable="false">
            </div>
            <h1 class="info-name">${characterData.name}</h1>
            <p class="info-japanese">${characterData.japaneseName || ''}</p>
            <p class="info-desc">${characterData.description}</p>
        </div>
        
        <div class="info-tags">
            ${(characterData.tags || []).map(tag => `
                <span class="info-tag">${tag}</span>
            `).join('')}
        </div>
        
        <div class="info-meta">
            ${characterData.birthday ? `
            <div class="meta-item">
                <i class="fas fa-birthday-cake"></i>
                <span>生日: ${characterData.birthday}</span>
            </div>
            ` : ''}
            
            ${characterData.age ? `
            <div class="meta-item">
                <i class="fas fa-user"></i>
                <span>年龄: ${characterData.age}</span>
            </div>
            ` : ''}
            
            ${characterData.height ? `
            <div class="meta-item">
                <i class="fas fa-ruler-vertical"></i>
                <span>身高: ${characterData.height}</span>
            </div>
            ` : ''}
            
            ${characterData.series ? `
            <div class="meta-item">
                <i class="fas fa-film"></i>
                <span>出自: ${characterData.series}</span>
            </div>
            ` : ''}
        </div>
    `;
}

// ================ 轮播图函数 ================
function initCarousel(characterData) {
    const carouselSection = document.getElementById('carousel-section');
    if (!carouselSection) return;

    // 获取所有图片
    carouselImages = [];
    // 添加gallery图片
    if (characterData.gallery && characterData.gallery.length > 0) {
        carouselImages = carouselImages.concat(characterData.gallery);
    }

    // 清空轮播图
    const slidesContainer = document.getElementById('carousel-slides');
    slidesContainer.innerHTML = '';

    // 创建幻灯片
    carouselImages.forEach((imgSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `${characterData.name} 图片 ${index + 1}`;
        img.loading = 'lazy';
        img.draggable = false;

        slide.appendChild(img);
        slidesContainer.appendChild(slide);
    });

    // 更新信息
    updateCarouselInfo();

    // 绑定事件
    bindCarouselEvents();

    // 开始自动播放
    startAutoPlay();
}

function bindCarouselEvents() {
    // 绑定按钮事件
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // 触摸滑动支持
    const slidesContainer = document.getElementById('carousel-slides');
    let startX = 0;

    slidesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slidesContainer.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    });
}

function goToSlide(index) {
    if (carouselImages.length === 0) return;

    if (index < 0) index = carouselImages.length - 1;
    if (index >= carouselImages.length) index = 0;

    currentSlide = index;

    // 更新位置
    const slidesContainer = document.getElementById('carousel-slides');
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // 更新信息
    updateCarouselInfo();
}

function prevSlide() {
    goToSlide(currentSlide - 1);
    resetAutoPlay();
}

function nextSlide() {
    goToSlide(currentSlide + 1);
    resetAutoPlay();
}

function updateCarouselInfo() {
    const currentEl = document.getElementById('current-slide');
    const totalEl = document.getElementById('total-slides');

    if (currentEl) currentEl.textContent = currentSlide + 1;
    if (totalEl) totalEl.textContent = carouselImages.length;
}

function startAutoPlay() {
    if (carouselImages.length <= 1) return;

    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
    clearInterval(carouselInterval);
    startAutoPlay();
}

// ================ 页面初始化 ================
document.addEventListener('DOMContentLoaded', function() {
    console.log("页面加载完成");
    loadCharacter();
});

// ================ 错误处理 ================
window.addEventListener('error', function(e) {
    console.error("页面错误:", e.error);
    const infoCard = document.getElementById('info-card');
    if (infoCard) {
        infoCard.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>页面加载失败</p>
                <a href="../index.html" class="nav-home" style="margin-top: 20px; display: inline-block;">
                    <i class="fas fa-home"></i> 返回首页
                </a>
            </div>
        `;
    }
});
// 调整轮播图尺寸
function adjustCarouselSize() {
    const carouselSection = document.getElementById('carousel-section');
    const slides = document.querySelectorAll('.carousel-slide');

    if (!carouselSection || slides.length === 0) return;

    const containerHeight = carouselSection.clientHeight;
    const containerWidth = carouselSection.clientWidth;

    slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (!img) return;

        const aspectRatio = parseFloat(slide.dataset.aspectRatio) || 1;

        // 根据容器尺寸优化显示
        if (containerWidth / containerHeight > aspectRatio) {
            // 容器更宽，图片高度占满
            img.style.objectFit = 'contain';
            img.style.width = 'auto';
            img.style.height = '100%';
        } else {
            // 容器更高，图片宽度占满
            img.style.objectFit = 'cover';
            img.style.width = '100%';
            img.style.height = 'auto';
        }
    });
}
// 数据加载器
class CharacterDataLoader {
    constructor() {
        this.characters = [];
        this.filteredCharacters = [];
    }

    // 加载JSON数据
    async loadData() {
        try {
            const response = await fetch('./data/characters.json');
            const data = await response.json();
            this.characters = data.characters;
            this.filteredCharacters = [...this.characters];
            return this.characters;
        } catch (error) {
            console.error('加载数据失败:', error);
            return [];
        }
    }

    // 获取所有角色
    getAllCharacters() {
        return this.characters;
    }

    // 搜索角色
    searchCharacters(query) {
        if (!query.trim()) {
            this.filteredCharacters = [...this.characters];
            return this.filteredCharacters;
        }

        const searchTerm = query.toLowerCase();
        this.filteredCharacters = this.characters.filter(character => {
            return (
                character.name.toLowerCase().includes(searchTerm) ||
                character.description.toLowerCase().includes(searchTerm) ||
                character.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        });

        return this.filteredCharacters;
    }

    // 按标签筛选
    filterByTag(tag) {
        this.filteredCharacters = this.characters.filter(character =>
            character.tags.includes(tag)
        );
        return this.filteredCharacters;
    }

    // 获取所有标签
    getAllTags() {
        const tags = new Set();
        this.characters.forEach(character => {
            character.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }
}
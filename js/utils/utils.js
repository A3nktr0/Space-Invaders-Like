export const debounce = (f, delay = 0) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => f(...args), delay);
    };
};

export const generateEnemiesMap = (rows, cols) => {
    let enemiesMap = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let randomEnemyType = Math.floor(Math.random() * 3) + 1;
            row.push(randomEnemyType);
        }
        enemiesMap.push(row);
    }
    return enemiesMap;
}
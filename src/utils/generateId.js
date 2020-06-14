function generateRandomValue() {
    const fixedRandomValue = Math.random().toFixed(7);
    return fixedRandomValue.split('.')[1];
}

function generateTimeStamp() {
    return Date.now();
}

export default () => {
    return `${generateRandomValue()}_${generateTimeStamp()}`;
}
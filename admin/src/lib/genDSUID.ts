export const genDSUID = (lenghSize: number): string => {
    const genRanHex = (size: number): string =>
        [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    return genRanHex(lenghSize).toUpperCase();
};

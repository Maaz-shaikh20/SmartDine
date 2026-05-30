"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDescription = void 0;
const generateDescription = (name, category) => {
    const safeName = name || 'dish';
    const safeCategory = category || 'food';
    return `Delicious ${safeName} prepared with rich flavors, perfect for ${safeCategory} lovers.`;
};
exports.generateDescription = generateDescription;

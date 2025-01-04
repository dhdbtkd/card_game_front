import { Card } from '../types/card';

const generateRandomCharactorWithoutDuplicate = (usedValues: Set<string>): string => {
    const alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomChar: string;

    do {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        randomChar = alphabet[randomIndex];
    } while (usedValues.has(randomChar));

    usedValues.add(randomChar);

    return randomChar;
};

/**
 *
 * @param count 카드 수
 * @returns 카드 배열
 */
export const generateRandomCards = (count: number): Card[] => {
    if (count > 26) {
        throw new Error('카드 갯수가 26개를 초과할 순 없습니다.');
    }
    const cards: Card[] = [];
    const usedValues = new Set<string>();

    for (let i = 0; i < count; i++) {
        const alphabet = generateRandomCharactorWithoutDuplicate(usedValues);
        cards.push({
            id: i * 2 + 1,
            value: alphabet,
        });
        cards.push({
            id: i * 2 + 2,
            value: alphabet,
        });
    }

    return shuffleArray(cards);
};

/**
 * 랜덤하게 섞는 유틸리티 함수
 */
const shuffleArray = (array: Card[]): Card[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

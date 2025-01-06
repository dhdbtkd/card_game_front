import { Card } from '../types/card';

export const getRandomHeros = (data: Card[], n: number) => {
    if (n > data.length) {
        throw new Error('n은 배열의 길이보다 클 수 없습니다.');
    }

    // 랜덤하게 n개의 데이터를 선택
    const selectedData = [...data].sort(() => 0.5 - Math.random()).slice(0, n);

    // 각 데이터를 두 번씩 복제하고 새로운 ID 생성
    const duplicatedData = selectedData.flatMap((item) => [
        { ...item, id: item.id * 2 + 1 },
        { ...item, id: item.id * 2 + 2 },
    ]);

    // Fisher-Yates Shuffle 알고리즘을 이용한 무작위 섞기
    for (let i = duplicatedData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [duplicatedData[i], duplicatedData[j]] = [duplicatedData[j], duplicatedData[i]];
    }

    // 섞은 배열에서 n개 선택
    return duplicatedData;
};

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

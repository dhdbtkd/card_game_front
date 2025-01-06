import { Card } from '@/app/types/card';
import { NextResponse } from 'next/server';
import { generateRandomCards, getRandomHeros } from '@/app/utils/generateCards';

const overwatchHerosDatas = [
    {
        id: 1,
        value: '해저드',
        imgSrc: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/612ae1e6d28125bd4d4d18c2c4e5b004936c094556239ed24a1c0a806410a020.png',
    },
    {
        id: 2,
        value: '디바',
        imgSrc: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/ca114f72193e4d58a85c087e9409242f1a31e808cf4058678b8cbf767c2a9a0a.png',
    },
    {
        id: 3,
        value: '겐지',
        imgSrc: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/4edf5ea6d58c449a2aeb619a3fda9fff36a069dfbe4da8bc5d8ec1c758ddb8dc.png',
    },
];

// const cards: Card[] = generateRandomCards(3);
const cards: Card[] = getRandomHeros(overwatchHerosDatas, 3);

export async function GET() {
    return NextResponse.json(cards);
}

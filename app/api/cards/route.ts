import { Card } from '@/app/types/card';
import { NextResponse } from 'next/server';
import { getRandomHeros } from '@/app/utils/generateCards';

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
    {
        id: 4,
        value: '둠피스트',
        imgSrc: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/13750471c693c1a360eb19d5ace229c8599a729cd961d72ebee0e157657b7d18.png',
    },
    {
        id: 5,
        value: '라마트라',
        imgSrc: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/3e0367155e1940a24da076c6f1f065aacede88dbc323631491aa0cd5a51e0b66.png',
    },
    {
        id: 6,
        value: '라인하르트',
        imgSrc: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/490d2f79f8547d6e364306af60c8184fb8024b8e55809e4cc501126109981a65.png',
    },
];

// const cards: Card[] = generateRandomCards(3);
const cards: Card[] = getRandomHeros(overwatchHerosDatas, 6);

export async function GET() {
    return NextResponse.json(cards);
}

import { Card } from '@/app/types/card';
import { NextResponse } from 'next/server';
import { generateRandomCards } from '@/app/utils/generateCards';

const cards: Card[] = generateRandomCards(10);

export async function GET() {
    return NextResponse.json(cards);
}

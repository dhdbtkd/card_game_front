'use client';
import { useEffect, useState } from 'react';
import { Card } from './types/card';
import CardComponent from './components/card';

const Home: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<Card[]>([]);
    const [solvedCards, setSolvedCards] = useState<Card[]>([]);
    const [isWaiting, setIsWating] = useState<boolean>(false);

    const handleCardClick = (card: Card) => {
        if (solvedCards.includes(card) || flippedCards.includes(card)) {
            return;
        }

        const newFlippedCards = [...flippedCards, card];
        setFlippedCards(newFlippedCards);

        console.log('🚀 ~ handleCardClick ~ flippedCards:', newFlippedCards);
        if (newFlippedCards.length === 2) {
            const [first, second] = newFlippedCards;
            if (first.value === second.value) {
                const newSolvedCards = [...solvedCards, first, second];
                setSolvedCards(newSolvedCards);
            }
            setIsWating(true);
            setTimeout(() => {
                setFlippedCards([]);
                setIsWating(false);
            }, 500);
        }
    };

    //api에서 카드 데이터를 가져온다.
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const res = await fetch('/api/cards');
                if (!res.ok) {
                    throw new Error(`Failed to fetch cards: ${res.status}`);
                }
                const data = await res.json();
                setCards(data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch card data. Please try again later.');
            }
        };
        fetchCards();
    }, []);
    const resetGame = () => {};
    const startGame = () => {};
    return (
        <div className="p-14">
            <h2 className="text-center mb-3 text-lg">NextJS Card Game</h2>
            <div className="flex items-center justify-center mb-6">
                <button className="px-5 py-1 rounded-full border border-zinc-700 cursor-pointer hover:bg-zinc-800 mx-2">
                    Reset
                </button>
                <button className="px-5 py-1 rounded-full border border-zinc-700 cursor-pointer hover:bg-zinc-800 mx-2">
                    Start
                </button>
            </div>
            {cards.length === 0 ? (
                <p>loading</p>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="grid gap-5 grid-cols-5">
                        {cards.map((card) => (
                            <CardComponent
                                key={card.id}
                                card={card}
                                isFlipped={flippedCards.includes(card)}
                                isSolved={solvedCards.includes(card)}
                                handleCardClick={handleCardClick}
                                isWaiting={isWaiting}
                            ></CardComponent>
                            // <div
                            //     key={card.id}
                            //     data-value={card.value}
                            //     data-solve={false}
                            //     className="cursor-pointer hover:bg-zinc-800 flex items-center justify-center w-28 h-40 p-4 rounded-lg border border-zinc-100"
                            //     onClick={() => {
                            //         handleCardClick(card);
                            //     }}
                            // >
                            //     {solvedCards.includes(card) || flippedCards.includes(card) ? (
                            //         <span>{card.value}</span>
                            //     ) : (
                            //         <span>?</span>
                            //     )}
                            // </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

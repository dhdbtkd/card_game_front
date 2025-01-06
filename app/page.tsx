'use client';
import { useQuery, QueryClientProvider, QueryClient, QueryKey } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Card } from './types/card';
import CardComponent from './components/card';
import Timer, { TimerHandle } from './components/Timer';
import { Icon } from '@iconify/react';

import { useTimer } from './hooks/useTimer';

const queryClient = new QueryClient();

const fetchCards = async ({ queryKey }: { queryKey: QueryKey }): Promise<Card[]> => {
    try {
        const [_key] = queryKey;
        console.log(_key);

        const res = await fetch('/api/cards');
        if (!res.ok) {
            throw new Error(`Failed to fetch cards: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching cards.');
    }
};
// Home 컴포넌트를 래퍼 컴포넌트로 분리
const HomeWrapper: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
    );
};

const Home: React.FC = () => {
    //use query
    const {
        data: cards = [],
        isLoading,
        error,
        refetch,
    } = useQuery<Card[]>({
        queryKey: ['cards'],
        queryFn: fetchCards,
    });

    // const [cards, setCards] = useState<Card[]>([]);
    const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<Card[]>([]);
    const [solvedCards, setSolvedCards] = useState<Card[]>([]);
    const [isWaiting, setIsWating] = useState<boolean>(false);
    const timerRef = useRef<TimerHandle>(null);

    const { isRunning, toggleTimer, time } = useTimer(); // 타이머 상태 가져오기

    const shuffleCards = (cards: Card[]) => {
        const shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setShuffledCards(shuffled);
    };
    useEffect(() => {
        console.log('카드 로딩 완료');
        if (cards) shuffleCards(cards);
    }, [cards]);
    useEffect(() => {
        if (cards.length > 0 && solvedCards.length === cards.length) {
            completeGame();
        }
    }, [solvedCards]);

    if (isLoading)
        return <p className="flex items-center justify-center text-5xl font-bold w-full h-full p-16">Loading</p>;
    if (error) return <p>Failed to load cards.</p>;

    const handleCardClick = (card: Card, duration: number) => {
        if (solvedCards.includes(card) || flippedCards.includes(card)) {
            return;
        }

        const newFlippedCards = [...flippedCards, card];
        setFlippedCards(newFlippedCards);
        if (newFlippedCards.length === 2) {
            const [first, second] = newFlippedCards;
            if (first.value === second.value) {
                const newSolvedCards = [...solvedCards, first, second];
                setSolvedCards(newSolvedCards);
                setFlippedCards([]);
            } else {
                setIsWating(true);
                setTimeout(() => {
                    setFlippedCards([]);
                    setIsWating(false);
                }, duration);
            }
        }
    };

    //api에서 카드 데이터를 가져온다.
    // useEffect(() => {
    //     const fetchCards = async () => {
    //         try {
    //             const res = await fetch('/api/cards');
    //             if (!res.ok) {
    //                 throw new Error(`Failed to fetch cards: ${res.status}`);
    //             }
    //             const data = await res.json();
    //             setCards(data);
    //         } catch (error) {
    //             console.error(error);
    //             alert('Failed to fetch card data. Please try again later.');
    //         }
    //     };
    //     fetchCards();
    // }, []);

    const resetGame = () => {
        refetch();
        setSolvedCards([]);
        setFlippedCards([]);
        toggleTimer(false);
        if (timerRef.current) {
            timerRef?.current?.resetTimer();
        }
        shuffleCards(cards);
    };
    const startGame = () => {
        toggleTimer();
        console.log(isRunning);
    };
    const completeGame = () => {
        setTimeout(() => {
            toggleTimer(false);
        }, 50);
    };
    return (
        <QueryClientProvider client={queryClient}>
            <div className="p-4 lg:p-14 bg-zinc-900 text-zinc-100">
                <h2 className="text-center mb-3 text-lg">NextJS Card Game</h2>
                <div className="text-center mb-3 text-sm">
                    <div className="flex text-xs text-zinc-300 items-center justify-center">
                        <Icon className="text-base mr-1" icon="majesticons:timer-line" />
                    </div>
                    <Timer ref={timerRef}></Timer>
                </div>
                <div className="flex items-center justify-center mb-3 lg:mb-6">
                    <button
                        className="px-5 py-1 rounded-full border border-zinc-700 cursor-pointer hover:bg-zinc-800 mx-2 text-sm"
                        onClick={resetGame}
                    >
                        Retry
                    </button>
                    {/* <button
                        className="px-5 py-1 rounded-full border border-zinc-700 cursor-pointer hover:bg-zinc-800 mx-2"
                        onClick={startGame}
                    >
                        {isRunning ? 'Stop' : 'Start'}
                    </button> */}
                </div>
                {!shuffledCards || shuffledCards.length === 0 ? (
                    <p className="flex items-center justify-center text-5xl font-bold w-full h-full">loading</p>
                ) : (
                    <div className="relative">
                        <div className="flex justify-center items-center">
                            <div className="grid gap-3 lg:gap-5 grid-cols-3 lg:grid-cols-5 p-5 lg:p-10 w-full lg:w-auto place-items-center">
                                {shuffledCards.map((card) => (
                                    <CardComponent
                                        key={card.id}
                                        card={card}
                                        isFlipped={flippedCards.includes(card)}
                                        isSolved={solvedCards.includes(card)}
                                        handleCardClick={handleCardClick}
                                        isWaiting={isWaiting}
                                    ></CardComponent>
                                ))}
                            </div>
                        </div>
                        {!isRunning && solvedCards.length !== cards.length ? (
                            <div className="absolute top-0 left-0 w-full h-full justify-center flex items-center z-10 backdrop-blur-sm ">
                                <div
                                    className="duration-300 hover:-translate-y-2 rounded-lg bg-zinc-100 text-zinc-900 px-16 py-4 text-lg cursor-pointer"
                                    onClick={startGame}
                                >
                                    Lets start
                                </div>
                            </div>
                        ) : cards.length > 0 && solvedCards.length === cards.length ? (
                            <div className="absolute top-0 left-0 w-full h-full justify-center flex flex-col items-center z-10 backdrop-blur ">
                                <div className="text-4xl font-bold mb-4">Done !!</div>
                                <div className="text-xl text-center  rounded-lg px-2">Your Record {time.format}</div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                )}
            </div>
        </QueryClientProvider>
    );
};

export default HomeWrapper;

import React from 'react';
import { Card } from '../types/card';

interface CardProps {
    card: Card;
    isFlipped: boolean;
    isSolved: boolean;
    isWaiting: boolean;
    handleCardClick: (card: Card, duration: number) => void;
}

const CardComponent: React.FC<CardProps> = ({ card, isFlipped, isSolved, handleCardClick, isWaiting }) => {
    return (
        <div
            data-value={card.value}
            className={`relative  flex items-center justify-center w-full h-full aspect-h-4 aspect-w-3 lg:w-28 lg:h-40 lg:p-4 rounded-lg border border-zinc-100 bg-cover bg-center bg-opacity-90 ${
                isSolved ? 'bg-green-600' : isFlipped ? 'bg-zinc-800' : 'cursor-pointer hover:bg-zinc-800'
            }
            ${isWaiting ? 'cursor-not-allowed' : ''}`}
            onClick={() => {
                if (!isWaiting) handleCardClick(card, 500);
            }}
            style={{
                perspective: '1000px', // 3D 효과를 위한 시점 설정
                transition: 'transform 0.25s', // 애니메이션 속도
                transform: isFlipped || isSolved ? 'rotateY(180deg)' : 'rotateY(0deg)', // 회전 효과
                transformStyle: 'preserve-3d', // 3D 회전 효과 유지
                backgroundImage: (isFlipped && card.imgSrc) || isSolved ? `url(${card.imgSrc})` : '',
            }}
        >
            <div
                className={`w-full h-full transform-style-preserve-3d select-none ${isFlipped ? 'flip' : ''}`}
                style={{}}
            >
                {/* 카드 앞면 */}
                <div
                    className={`absolute w-full h-full backface-hidden flex items-center justify-center ${
                        isFlipped || isSolved ? 'hidden' : ''
                    }`}
                >
                    <span>?</span>
                </div>
                {/* 카드 뒷면 */}
                {/* <img className="h-full w-full object-contain" src={card.imgSrc}></img> */}
                <div
                    className={`absolute w-full h-full backface-hidden flex items-center justify-center text-2xl font-bold ${
                        isFlipped ? 'rotateY(180deg)' : ''
                    }`}
                    style={{
                        transform: isFlipped || isSolved ? 'rotateY(180deg)' : '',
                    }}
                >
                    <span>{isSolved || isFlipped ? '' : ''}</span>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;

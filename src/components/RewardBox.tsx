import React from 'react';
import styled, {keyframes} from "styled-components";
import {CSSTransition} from "react-transition-group";

interface Props {
    rewards: {
        apple: number;
        fish: number;
    };
    size?: number;
    style?: any;
}

export const RewardBox: React.FC<Props> = props => {
    const { rewards, size = 10, style } = props;
    const { apple, fish } = rewards;

    const AppleGem = styled.div`
        width: ${size};
        height: ${size};
        border-radius: 50%;
        background-color: #ff5722;
    `;

    const FishGem = styled.div`
        width: ${size};
        height: ${size};
        border-radius: 50%;
        background-color: #3076ff;
    `;

    return (
        <div
            style={{
                minWidth: size * 4,
                height: size * 5,
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: '#000',
                display: 'flex',
                flexDirection: 'row',
                ...style
            }}
        >
            <div
                style={{
                    width: '50%',
                    height: size * 5,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#000',
                    display: 'flex',
                    flexFlow: 'column wrap'
                }}
            >
                {Array(apple)
                    .fill(null)
                    .map((_i, key) => (
                        <AppleGem key={key} />
                    ))}
            </div>
            <div
                style={{
                    width: '50%',
                    height: size * 5,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderColor: '#000',
                    display: 'flex',
                    flexFlow: 'column wrap'
                }}
            >
                {Array(fish)
                    .fill(null)
                    .map((_i, key) => (
                        <FishGem key={key} />
                    ))}
            </div>
        </div>
    );
};

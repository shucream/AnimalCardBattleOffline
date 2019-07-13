import React from 'react';
import styled, {keyframes} from "styled-components";
import {CSSTransition} from "react-transition-group";
import {AppleGem} from "./AppleGem";
import {FishGem} from "./FishGem";

interface Props {
    rewards: {
        apple: number;
        fish: number;
    };
    soundEffect: (sound: any) => void;
    size?: number;
    style?: any;
}

export const RewardBox: React.FC<Props> = props => {
    const { rewards, size = 10, soundEffect, style } = props;
    const { apple, fish } = rewards;

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
                        <AppleGem key={key} soundEffect={soundEffect} size={size}/>
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
                        <FishGem key={key} soundEffect={soundEffect} size={size}/>
                    ))}
            </div>
        </div>
    );
};

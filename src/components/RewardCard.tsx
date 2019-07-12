import React from 'react';
import RewardImage from '../assets/reward.jpg';
import BackgroundImage from '../assets/background.jpg';

export interface RewardSet {
    apple: number;
    fish: number;
}

export type Rewards =
    | { apple: 0; fish: 5 }
    | { apple: 5; fish: 0 }
    | { apple: 4; fish: 2 }
    | { apple: 2; fish: 4 }
    | { apple: 3; fish: 3 }
    | { apple: 3; fish: 2 }
    | { apple: 2; fish: 3 };

interface Props {
    rewards: Rewards;
    size?: number;
    reverse?: boolean;
    style?: any;
}

export const RewardCard: React.FC<Props> = props => {
    const { rewards, size = 100, reverse, style } = props;
    const height = size;
    const width = size / 1.55;
    let dx = reverse ? width * 2 : width;
    let left = reverse ? -size : 0;
    switch (!reverse) {
        case rewards.apple === 3 && rewards.fish === 2:
            left = 0;
            break;
        case rewards.apple === 2 && rewards.fish === 3:
            dx += width;
            left -= width;
            break;
        case rewards.apple === 3 && rewards.fish === 3:
            dx += width * 2;
            left -= width * 2;
            break;
        case rewards.apple === 2 && rewards.fish === 4:
            dx += width * 3;
            left -= width * 3;
            break;
        case rewards.apple === 4 && rewards.fish === 2:
            dx += width * 4;
            left -= width * 4;
            break;
        case rewards.apple === 0 && rewards.fish === 5:
            dx += width * 5;
            left -= width * 5;
            break;
        case rewards.apple === 5 && rewards.fish === 0:
            dx += width * 6;
            left -= width * 6;
            break;
        default:
            break;
    }
    return (
        <div
            style={{
                position: 'relative',
                width: width,
                height: height,
                overflow: 'hidden',
                borderRadius: width / 20,
                boxShadow: '-1px 2px 2px black',
                ...style
            }}
        >
            <div style={{ overflow: 'hidden', position: 'absolute', display: 'block', width: dx, height, left }}>
                <img src={reverse ? BackgroundImage : RewardImage} alt={'rewards'} style={{ width: width * 7 }} />
            </div>
        </div>
    );
};

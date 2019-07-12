import React from 'react';

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

    const AppleGem = () => (
        <div style={{ width: size, height: size, borderRadius: '50%', backgroundColor: '#ff5722' }} />
    );
    const FishGem = () => (
        <div style={{ width: size, height: size, borderRadius: '50%', backgroundColor: '#3076ff' }} />
    );

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

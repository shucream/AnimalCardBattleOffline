import React from 'react';
import { RewardCard, Rewards } from './RewardCard';

interface Props {
    deckSize: number;
    deckTop?: Rewards | null;
    size: number;
    style?: any;
}
export const Deck: React.FC<Props> = props => {
    const { deckSize, deckTop, size, style } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', ...style }}>
            {deckSize ? (
                <RewardCard
                    rewards={{ apple: 3, fish: 3 }}
                    reverse
                    size={size}
                    style={{
                        boxShadow:
                            '-1px 3px rgba(76, 132, 108),-2px 5px rgba(56, 102, 78),-3px 7px rgba(76, 132, 108) ',
                        marginBottom: 7,
                        marginRight: 7
                    }}
                />
            ) : null}
            {deckTop ? (
                <RewardCard rewards={deckTop} size={size} />
            ) : (
                <RewardCard rewards={{ apple: 3, fish: 3 }} size={size} reverse />
            )}
        </div>
    );
};

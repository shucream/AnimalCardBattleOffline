import React from 'react';
import { PlayerState } from '../screens/GameScreen';
import { AnimalCard, AnimalNames } from './AnimalCard';
import PlayerHands from './PlayerHands';
import { RewardBox } from './RewardBox';

interface HandlingProps {
    onChoice: (value: { animal: AnimalNames }) => void;
    width: number;
    size: number;
    style?: any;
}

type Props = HandlingProps & PlayerState;

interface State {}

export class Player extends React.Component<Props, State> {
    public render() {
        const disables: AnimalNames[] = [];
        this.props.handFix && disables.push(this.props.hand);
        this.props.useChicken && disables.push('chicken');
        this.props.useKamome && disables.push('kamome');
        const size = 13;
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    width: this.props.width,
                    ...this.props.style
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                    }}
                >
                    <p style={{ color: '#fff', margin: 0, width: size * 4, paddingLeft: 10 }}>You</p>
                    <AnimalCard name={this.props.handFix ? this.props.hand : null} size={this.props.size} />
                    <RewardBox rewards={this.props.rewards} size={this.props.size / 6} style={{ marginRight: 10 }} />
                </div>
                <PlayerHands onChoiceCard={this.props.onChoice} width={this.props.size} disables={disables} />
            </div>
        );
    }
}

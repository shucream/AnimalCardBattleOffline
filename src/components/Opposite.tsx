import React from 'react';
import { PlayerState } from '../screens/GameScreen';
import { AnimalCard } from './AnimalCard';
import { RewardBox } from './RewardBox';

interface OuterProps {
    open: boolean;
    id: number;
    cardHeight: number;
    soundEffect: (sound: any) => void;
    style?: any;
}

type Props = PlayerState & OuterProps;

interface State {}

export default class Opposite extends React.Component<Props, State> {
    public render() {
        return (
            <div style={{ ...this.props.style }}>
                <p style={{ margin: 0 }}>Com {this.props.id.toString()}</p>
                <AnimalCard
                    name={this.props.handFix ? this.props.hand : null}
                    state={this.props.cardState}
                    reverse={!this.props.open}
                    size={this.props.cardHeight}
                    style={{ marginBottom: 5 }}
                />
                <RewardBox rewards={this.props.rewards} size={this.props.cardHeight / 6} soundEffect={this.props.soundEffect}/>
            </div>
        );
    }
}

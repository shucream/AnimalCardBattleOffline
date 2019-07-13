import React from 'react';
import {PlayerState} from '../screens/GameScreen';
import {AnimalCard, AnimalNames} from './AnimalCard';
import PlayerHands from './PlayerHands';
import {RewardBox} from './RewardBox';
import {PlayerResultState} from "../lib/GameRule";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

interface HandlingProps {
    onChoice: (value: { animal: AnimalNames }) => void;
    width: number;
    size: number;
    soundEffect: (sound: any) => void;
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
                    <div>
                        <Button component={Link} variant={'contained'} size={'small'} to={"/home"} style={{marginBottom: 10, marginLeft: 10}} >
                            やめる
                        </Button>
                        <p style={{ color: '#000', margin: 0, width: size * 4, paddingLeft: 10 }}>You</p>
                    </div>
                    <AnimalCard name={this.props.handFix ? this.props.hand : null} size={this.props.size} state={this.props.cardState}/>
                    <RewardBox rewards={this.props.rewards} size={this.props.size / 6} style={{ marginRight: 10 }} soundEffect={this.props.soundEffect}/>
                </div>
                <PlayerHands onChoiceCard={this.props.onChoice} width={this.props.size} disables={disables} soundEffect={this.props.soundEffect}/>
            </div>
        );
    }
}

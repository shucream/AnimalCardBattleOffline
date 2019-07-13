import React, {ReactNode} from 'react';
import {AnimalCard, AnimalNames} from './AnimalCard';
import {PlayerResultState} from "../lib/GameRule";

type State = { [P in AnimalNames]: boolean };

interface Props {
    onChoiceCard: (value: { animal: AnimalNames }) => void;
    width: number;
    disables: AnimalNames[];
    style?: any;
}

interface PureComponentPorps {
    children?: ReactNode;
    style?: any;
}

const defaultState: State = {
    chicken: false,
    sheep: false,
    lion: false,
    owl: false,
    kamome: false,
    penguin: false,
    whale: false,
    turtle: false
};

export default class PlayerHands extends React.Component<Props, State> {
    public state = Object.assign({}, defaultState);

    public render() {
        const cardWidth = this.props.width;
        const handWidth = cardWidth * 8;
        return (
            <HandArea style={{ width: this.props.width, ...this.props.style }}>
                <CardList style={{ width: handWidth }}>
                    {(Object.keys(this.state)).map(animal => (
                        <AnimalCard
                            name={animal as AnimalNames}
                            size={cardWidth}
                            onClick={() => this.onFocus(animal as AnimalNames)}
                            disable={this.props.disables.includes(animal as AnimalNames)}
                            style={this.state[animal as keyof State] ? { paddingBottom: 10 } : { marginTop: 10 }}
                            key={animal}
                        />
                    ))}
                </CardList>
            </HandArea>
        );
    }

    private resetFoucsCard() {
        this.setState(defaultState);
    }

    private onFocus(animal: AnimalNames) {
        if (this.state[animal.toString() as keyof State] && !this.props.disables.includes(animal)) {
            this.props.onChoiceCard({ animal: animal });
        } else {
            this.resetFoucsCard();
            let newState = Object.assign({}, defaultState);
            newState[animal as keyof State] = true;
            this.setState(newState);
        }
    }
}

const HandArea: React.FC<PureComponentPorps> = ({ children, style }) => (
    <div
        children={children}
        style={{
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            ...{ style }
        }}
    />
);

const CardList: React.FC<PureComponentPorps> = ({ children, style }) => (
    <div
        children={children}
        style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            ...{ style }
        }}
    />
);

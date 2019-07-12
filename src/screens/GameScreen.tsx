import * as React from 'react';
import {AnimalNames, getCardWidth, JpAnimalName} from '../components/AnimalCard';
import { Deck } from '../components/Deck';
import Opposite from '../components/Opposite';
import { Player } from '../components/Player';
import { Rewards, RewardSet } from '../components/RewardCard';
import WrapperAnimations from '../components/WrapperAnimations';
import { Computer, PublicPlayerParams } from '../lib/Computer';
import * as GameRule from '../lib/GameRule';
import { defaultDeck } from '../lib/GameConfig';
import styled from 'styled-components';

export interface PlayerState {
    handFix: boolean;
    hand: AnimalNames;
    rewards: RewardSet;
    useChicken: boolean;
    useKamome: boolean;
}

const defaultPlayerState: PlayerState = {
    handFix: false,
    hand: 'lion',
    rewards: { apple: 0, fish: 0 },
    useChicken: false,
    useKamome: false
};

interface State {
    gameState: 'start' | 'choice' | 'morning' | 'day' | 'night' | 'end';
    deck: Rewards[];
    deckTop?: Rewards;
    rewards: RewardSet;
    day: number;
    animationWrapper: boolean;
    animationMessage: string;
    players: PlayerState[];
    open: boolean;
}

interface OuterProps {
    match: {
        params: {
            id: string;
        };
    };
}

type Props = OuterProps;

class GameScreen extends React.Component<Props, State> {
    private readonly refAnimationWrapper: any;
    public state: State = {
        gameState: 'start',
        deck: [],
        day: 0,
        rewards: { apple: 0, fish: 0 },
        animationWrapper: false,
        animationMessage: `${this.props.match.params.id}人でスタート`,
        players: Array(Number.parseInt(this.props.match.params.id)).fill(defaultPlayerState),
        open: false
    };
    public playerNumber = Number.parseInt(this.props.match.params.id);
    constructor(props: Props) {
        super(props);
        this.refAnimationWrapper = React.createRef();
        this.setStateAsync = this.setStateAsync.bind(this);
    }

    public async componentDidMount() {
        this.initDeck();
        await this.createAnimationWrapper(`${this.props.match.params.id}人でスタート`);
        this.startGame().catch(winners => this.showWinner.bind(this)(winners));
    }

    public render() {
        const cardHeight = window.innerHeight / 6;
        const handWidth = 8*getCardWidth(cardHeight);
        return (
            <Container>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    {this.state.players.slice(1, this.playerNumber).map((oppositeState, key) => (
                        <Opposite
                            {...oppositeState}
                            key={key}
                            open={this.state.open}
                            id={key + 1}
                            cardHeight={cardHeight}
                        />
                    ))}
                </div>
                <Deck deckSize={this.state.deck.length} deckTop={this.state.deckTop} size={cardHeight} />
                <Player
                    onChoice={this.handleUserChoiceAnimal.bind(this)}
                    {...this.state.players[0]}
                    size={cardHeight}
                    width={handWidth}
                />
                {this.state.animationWrapper && (
                    <WrapperAnimations
                        ref={this.refAnimationWrapper}
                        message={this.state.animationMessage}
                        type={this.state.gameState === 'end' ? 'stay' : undefined}
                    />
                )}
            </Container>
        );
    }

    private async startGame() {
        await this.newDay();
        await this.playersChoice();
        await
        await this.morning();
        await this.checkWinner();
        await this.daytime();
        await this.checkWinner();
        await this.night();
        await this.checkWinner();
        await this.startGame();
    }

    private async setStateAsync(state: object) {
        return new Promise(resolve => {
            this.setState(state, resolve);
        });
    }

    private async newDay() {
        await this.setStateAsync({ open: false });
        await this.setStateAsync({ day: this.state.day + 1 });
        await this.drawCard();
    }

    private async drawCard() {
        await this.setStateAsync({ deckTop: this.state.deck[0] });
        await this.setStateAsync({ deck: this.state.deck.slice(1) });
    }

    private async playersChoice() {
        await this.setStateAsync(this.state.players.map(playerState => (playerState.handFix = false)));
        const playersChoicePromises: Promise<void>[] = [];
        playersChoicePromises.push(this.userChoice());
        this.state.players.map((_v, id) => {
            id !== 0 && playersChoicePromises.push(this.comChoice(id));
        });
        await Promise.all(playersChoicePromises);
        await this.setStateAsync({ open: true });
    }

    private async userChoice() {
        const { animal } = await this.onUserChoice();
        const statedAnimal: AnimalNames | false = await this.playerChoseAnimal(animal, 0);
        if (statedAnimal) {
            await this.createAnimationWrapper(`${JpAnimalName[animal]}で勝負！`);
        } else {
            await this.userChoice();
        }
    }

    private async createAnimationWrapper(message: string) {
        await this.setStateAsync({ animationWrapper: true, animationMessage: message });
        await this.refAnimationWrapper.current.startAnimation();
        await this.setStateAsync({ animationWrapper: false });
    }

    private async playerChoseAnimal(animal: AnimalNames, id: number) {
        const nextUserStateArray = this.state.players.slice();
        // TODO エラーの時にもう一回入力を受ける
        if (
            this.state.players[id].handFix ||
            (this.state.players[id].useChicken && animal === 'chicken') ||
            (this.state.players[id].useKamome && animal === 'kamome')
        ) {
            return false;
        }
        nextUserStateArray[id] = {
            rewards: this.state.players[id].rewards,
            hand: animal,
            handFix: true,
            useKamome: animal === 'kamome' ? true : this.state.players[id].useKamome,
            useChicken: animal === 'chicken' ? true : this.state.players[id].useChicken
        };
        await this.setStateAsync({ players: nextUserStateArray });
        return this.state.players[id].hand;
    }

    private async onUserChoice() {
        return new Promise<{ animal: AnimalNames }>(resolve => {
            this.handleUserChoiceAnimal = resolve;
        });
    }

    private handleUserChoiceAnimal({ animal }: { animal: AnimalNames }) {}

    private async comChoice(comId: number) {
        await new Promise(resolve => this.state.deckTop && resolve());
        const otherPlayerParams: PublicPlayerParams[] = [];
        this.state.players
            .filter((_v, id: number) => id !== comId)
            .map(playerState => {
                otherPlayerParams.push({
                    rewards: playerState.rewards,
                    useKamome: playerState.useKamome,
                    useChicken: playerState.useChicken
                });
            });

        const publicParams: {
            otherPlayersState: PublicPlayerParams[];
            useChicken: boolean;
            deckRewards: Rewards | undefined;
            currentRewards: RewardSet;
            useKamome: boolean;
        } = {
            deckRewards: this.state.deckTop,
            currentRewards: this.state.players[comId].rewards,
            otherPlayersState: otherPlayerParams,
            useKamome: this.state.players[comId].useKamome,
            useChicken: this.state.players[comId].useChicken
        };
        const animal = Computer(publicParams);

        const statedAnimal = await this.playerChoseAnimal(animal, comId);
        if (!statedAnimal) {
            await this.comChoice(comId);
        }
    }

    private async morning() {
        await this.createAnimationWrapper('朝の時間');
        const players = this.state.players.map((player, id) => ({ id: id, animal: player.hand }));
        const { result, nextRewards } = GameRule.calcMorning({
            players: players,
            rewards: this.state.deckTop as RewardSet
        });
        const nextPlayersState = this.state.players.slice();
        result.map(player => {
            nextPlayersState[player.playerId] = Object.assign({}, nextPlayersState[player.playerId]);
            nextPlayersState[player.playerId].rewards = Object.assign({}, nextPlayersState[player.playerId].rewards);
            nextPlayersState[player.playerId].rewards.apple += player.addRewards.apple;
            nextPlayersState[player.playerId].rewards.fish += player.addRewards.fish;
        });
        await this.setStateAsync({ rewards: nextRewards });
        await this.setStateAsync({ players: nextPlayersState });
    }

    private async daytime() {
        await this.createAnimationWrapper('昼の時間');
        const players = this.state.players.map((player, id) => ({ id: id, animal: player.hand }));
        const { result, nextRewards } = GameRule.calcDayTime({
            players: players,
            rewards: this.state.rewards as RewardSet
        });
        const nextPlayersState = this.state.players.slice();
        result.map(player => {
            nextPlayersState[player.playerId] = Object.assign({}, nextPlayersState[player.playerId]);
            nextPlayersState[player.playerId].rewards = Object.assign({}, nextPlayersState[player.playerId].rewards);
            nextPlayersState[player.playerId].rewards.apple += player.addRewards.apple;
            nextPlayersState[player.playerId].rewards.fish += player.addRewards.fish;
        });
        await this.setStateAsync({ rewards: nextRewards });
        await this.setStateAsync({ players: nextPlayersState });
    }

    private async night() {
        await this.createAnimationWrapper('夜の時間');
        const players = this.state.players.map((player, id) => ({ id: id, animal: player.hand }));
        const { result, nextRewards } = GameRule.calcNight({
            players: players,
            rewards: this.state.rewards as RewardSet
        });
        const nextPlayersState = this.state.players.slice();
        result.map(player => {
            nextPlayersState[player.playerId] = Object.assign({}, nextPlayersState[player.playerId]);
            nextPlayersState[player.playerId].rewards = Object.assign({}, nextPlayersState[player.playerId].rewards);
            nextPlayersState[player.playerId].rewards.apple += player.addRewards.apple;
            nextPlayersState[player.playerId].rewards.fish += player.addRewards.fish;
        });
        await this.setStateAsync({ rewards: nextRewards });
        await this.setStateAsync({ players: nextPlayersState });
    }

    private async checkWinner() {
        const winners: number[] = [];
        this.state.players.map((player, id) => {
            if (player.rewards.apple >= 5 && player.rewards.fish >= 5) {
                winners.push(id);
            }
            if (player.rewards.apple >= 10 || player.rewards.fish >= 10) {
                winners.push(id);
            }
        });
        if (winners.length > 0) {
            throw winners;
        }
    }

    private async showWinner(winners: number[]) {
        const winnerNameArray = winners.map(id => {
            if (id === 0) {
                return 'You';
            } else {
                return `Computer${id}`;
            }
        });
        let message = '';
        winnerNameArray.forEach(name => (message += name));
        await this.setStateAsync({ gameState: 'end' });
        await this.setStateAsync({ animationWrapper: true, animationMessage: `${message}の勝ち！` });
        await this.refAnimationWrapper.current.startAnimation();
    }

    private initDeck() {
        let array = defaultDeck;
        for (let i = array.length - 1; i >= 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [array[i], array[rand]] = [array[rand], array[i]];
        }
        this.setState({ deck: array });
    }
}

export default GameScreen;

const Container = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: -5px, 0, 5px, rgba(255, 255, 255, 0.8);
`;

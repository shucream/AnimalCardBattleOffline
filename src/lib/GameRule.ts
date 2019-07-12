import { AnimalNames } from '../components/AnimalCard';
import { RewardSet } from '../components/RewardCard';

interface Player {
    id: number;
    animal: AnimalNames;
}

export interface CalcProps {
    players: Player[];
    rewards: RewardSet;
}

interface Result {
    playerId: number;
    addRewards: RewardSet;
}

interface RewardDto {
    result: Result[];
    nextRewards: RewardSet;
}

export function calcMorning(props: CalcProps): RewardDto {
    const { players, rewards } = props;
    const result: Result[] = [];
    const nextRewards = Object.assign({}, rewards);
    const chickenPlayers = players.filter(player => player.animal === 'chicken');
    const kamomePlayers = players.filter(player => player.animal === 'kamome');
    if (chickenPlayers.length === 1) {
        const targetPlayer = chickenPlayers[0];
        const addRewards = { apple: 0, fish: 0 };
        addRewards.apple += rewards.apple < 2 ? rewards.apple : 2;
        nextRewards.apple -= addRewards.apple;
        console.log(targetPlayer);
        result.push({ playerId: targetPlayer.id, addRewards: addRewards });
    }
    if (kamomePlayers.length === 1) {
        const targetPlayer = kamomePlayers[0];
        const addRewards = { apple: 0, fish: 0 };
        addRewards.fish += rewards.fish < 2 ? rewards.fish : 2;
        nextRewards.fish -= addRewards.fish;
        console.log(targetPlayer);
        result.push({ playerId: targetPlayer.id, addRewards: addRewards });
    }
    return { result: result, nextRewards: nextRewards };
}

export function calcDayTime(props: CalcProps): RewardDto {
    const { players, rewards } = props;
    const result: Result[] = [];
    const nextRewards = Object.assign({}, rewards);
    const lionPlayers = players.filter(player => player.animal === 'lion');
    const sheepPlayers = players.filter(player => player.animal === 'sheep');
    const whalePlayers = players.filter(player => player.animal === 'whale');
    const penguinPlayers = players.filter(player => player.animal === 'penguin');
    if (sheepPlayers.length !== 0) {
        if (lionPlayers.length === 0) {
            const applesPerPlayer = Math.floor(rewards.apple / sheepPlayers.length);
            sheepPlayers.map(player => {
                const addRewards = { apple: 0, fish: 0 };
                addRewards.apple += applesPerPlayer < 3 ? applesPerPlayer : 3;
                nextRewards.apple -= addRewards.apple;
                result.push({ playerId: player.id, addRewards: addRewards });
            });
        } else {
            const applesPerPlayer = Math.floor(rewards.apple / lionPlayers.length);
            lionPlayers.map(player => {
                const addRewards = { apple: 0, fish: 0 };
                addRewards.apple += applesPerPlayer < 5 ? applesPerPlayer : 5;
                nextRewards.apple -= addRewards.apple;
                result.push({ playerId: player.id, addRewards: addRewards });
            });
        }
    }
    if (penguinPlayers.length !== 0) {
        if (whalePlayers.length === 0) {
            const fishPerPlayer = Math.floor(rewards.fish / penguinPlayers.length);
            penguinPlayers.map(player => {
                const addRewards = { apple: 0, fish: 0 };
                addRewards.fish += fishPerPlayer < 3 ? fishPerPlayer : 3;
                nextRewards.fish -= addRewards.fish;
                result.push({ playerId: player.id, addRewards: addRewards });
            });
        } else {
            const fishPerPlayer = Math.floor(rewards.fish / whalePlayers.length);
            whalePlayers.map(player => {
                const addRewards = { apple: 0, fish: 0 };
                addRewards.fish += fishPerPlayer < 5 ? fishPerPlayer : 5;
                nextRewards.fish -= addRewards.fish;
                result.push({ playerId: player.id, addRewards: addRewards });
            });
        }
    }
    return { result: result, nextRewards: nextRewards };
}

export function calcNight(props: CalcProps): RewardDto {
    const { players, rewards } = props;
    const result: Result[] = [];
    const nextRewards = Object.assign({}, rewards);
    const turtlePlayers = players.filter(player => player.animal === 'turtle');
    const owlPlayers = players.filter(player => player.animal === 'owl');

    const applePerPlayer = Math.floor(rewards.apple / owlPlayers.length);
    owlPlayers.map(player => {
        const addRewards = { apple: 0, fish: 0 };
        addRewards.apple += applePerPlayer < 2 ? applePerPlayer : 2;
        nextRewards.apple -= addRewards.apple;
        result.push({ playerId: player.id, addRewards: addRewards });
    });
    const fishPerPlayer = Math.floor(rewards.fish / turtlePlayers.length);
    turtlePlayers.map(player => {
        const addRewards = { apple: 0, fish: 0 };
        addRewards.fish += fishPerPlayer < 2 ? fishPerPlayer : 2;
        nextRewards.fish -= addRewards.fish;
        result.push({ playerId: player.id, addRewards: addRewards });
    });
    return { result: result, nextRewards: nextRewards };
}

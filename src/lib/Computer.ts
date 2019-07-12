import { AnimalNames } from '../components/AnimalCard';
import { Rewards, RewardSet } from '../components/RewardCard';

export interface PublicPlayerParams {
    rewards: RewardSet;
    useKamome: boolean;
    useChicken: boolean;
}

export interface PublicParams {
    deckRewards: Rewards;
    currentRewards: RewardSet;
    otherPlayersState: PublicPlayerParams[];
    useKamome: boolean;
    useChicken: boolean;
}

interface AnimalPoints {
    kamome: number;
    penguin: number;
    whale: number;
    turtle: number;
    chicken: number;
    sheep: number;
    lion: number;
    owl: number;
}

export const Computer = (props: {
    otherPlayersState: PublicPlayerParams[];
    useChicken: boolean;
    deckRewards: Rewards | undefined;
    currentRewards: RewardSet;
    useKamome: boolean;
}): AnimalNames => {
    const animalPoints: AnimalPoints = {
        kamome: Math.random(),
        penguin: Math.random(),
        whale: Math.random(),
        turtle: Math.random(),
        chicken: Math.random(),
        sheep: Math.random(),
        lion: Math.random(),
        owl: Math.random()
    };

    if (!props.deckRewards || props.deckRewards.apple === 5) {
        animalPoints.chicken += 5 + Math.random();
        animalPoints.sheep += 5 + Math.random();
        animalPoints.lion += 5 + Math.random();
        animalPoints.owl += 5 + Math.random();
    }
    if (!props.deckRewards || props.deckRewards.fish === 5) {
        animalPoints.kamome += 5 + Math.random();
        animalPoints.penguin += 5 + Math.random();
        animalPoints.whale += 5 + Math.random();
        animalPoints.turtle += 5 + Math.random();
    }
    const currentRewards = [props.currentRewards.apple, props.currentRewards.fish];
    switch (currentRewards.toString()) {
        case [0, 5].toString():
        case [0, 6].toString():
            animalPoints.lion += Math.random();
            animalPoints.whale += Math.random();
            break;
        case [0, 7].toString():
            animalPoints.lion += Math.random();
            animalPoints.penguin += Math.random();
            break;
        case [0, 8].toString():
        case [0, 9].toString():
            animalPoints.lion += Math.random();
            animalPoints.kamome += Math.random();
            animalPoints.turtle += Math.random();
            break;
        case [5, 0].toString():
        case [6, 0].toString():
            animalPoints.lion += Math.random();
            animalPoints.whale += Math.random();
            break;
        case [7, 0].toString():
            animalPoints.whale += Math.random();
            animalPoints.sheep += Math.random();
            break;
        case [8, 0].toString():
        case [9, 0].toString():
            animalPoints.whale += Math.random();
            animalPoints.chicken += Math.random();
            animalPoints.owl += Math.random();
            break;
    }

    const topAnimalKey = Object.keys(animalPoints).reduce((previousKey, currentKey) =>
        animalPoints[previousKey as keyof AnimalPoints] > animalPoints[currentKey as keyof AnimalPoints] ? previousKey : currentKey
    );
    delete animalPoints[topAnimalKey as keyof AnimalPoints];
    const secondAnimalKey = Object.keys(animalPoints).reduce((previousKey, currentKey) =>
        animalPoints[previousKey as keyof AnimalPoints] > animalPoints[currentKey as keyof AnimalPoints] ? previousKey : currentKey
    );
    delete animalPoints[secondAnimalKey as keyof AnimalPoints];
    const thirdAnimalKey = Object.keys(animalPoints).reduce((previousKey, currentKey) =>
        animalPoints[previousKey as keyof AnimalPoints] > animalPoints[currentKey as keyof AnimalPoints] ? previousKey : currentKey
    );
    console.log([topAnimalKey, secondAnimalKey, thirdAnimalKey]);
    const answer = [topAnimalKey, secondAnimalKey, thirdAnimalKey][Math.floor(Math.random() * 3)];
    return answer as AnimalNames;
};

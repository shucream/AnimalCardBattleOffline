import  React from 'react';
import AnimalImage from '../assets/animal.jpg';
import BackgroundImage from '../assets/background.jpg';

export type AnimalNames = 'penguin' | 'kamome' | 'lion' | 'owl' | 'sheep' | 'whale' | 'turtle' | 'chicken';

export enum JpAnimalName {
    penguin = 'ペンギン',
    kamome = 'かもめ',
    lion = 'ライオン',
    owl = 'ふくろう',
    sheep = 'ひつじ',
    whale = 'クジラ',
    turtle = 'カメ',
    chicken = 'にわとり'
}

interface Props {
    name: AnimalNames | null;
    size?: number;
    onClick?: () => void;
    reverse?: boolean;
    disable?: boolean;
    style?: any;
}

export const AnimalCard: React.FC<Props> = props => {
    const { name, onClick, size = 100, reverse, disable, style } = props;
    const dx = (size * 697) / 1014;
    const dy = size;
    let width = dx;
    let height = dy;
    let top = 0;
    let left = 0;
    switch (!reverse && name) {
        case 'lion':
            break;

        case 'penguin':
            height += dy;
            top -= dy;
            break;

        case 'whale':
            height += 2 * dy;
            top -= 2 * dy;
            break;
        case 'owl':
            width += dx;
            left -= dx;
            break;
        case 'sheep':
            width += dx;
            left -= dx;
            height += dy;
            top -= dy;
            break;
        case 'turtle':
            width += dx;
            left -= dx;
            height += 2 * dy;
            top -= 2 * dy;
            break;
        case 'chicken':
            width += 2 * dx;
            left -= 2 * dx;
            height += dy;
            top -= dy;
            break;
        case 'kamome':
            width += 2 * dx;
            left -= 2 * dx;
            height += 2 * dy;
            top -= 2 * dy;
            break;

        default:
            width += dx;
            left -= dx;
            height += dy;
            top -= dy;
            break;
    }
    if (!name) {
        return (
            <div
                style={{
                    position: 'relative',
                    width: dx,
                    height: dy,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: '#000',
                    borderRadius: dx / 20,
                    ...style
                }}
            />
        );
    }
    return (
        <div
            style={{
                position: 'relative',
                width: dx,
                height: dy,
                overflow: 'hidden',
                borderRadius: dx / 20,
                boxShadow: '-1px 2px 2px rgba(0,0,0,0.5)',
                ...style
            }}
            onClick={onClick}
        >
            <div style={{ overflow: 'hidden', display: 'block', position: 'absolute', width, height, top, left }}>
                <img src={reverse ? BackgroundImage : AnimalImage} alt={'a'} style={{ width: dx * 3 }} />
                {disable && (
                    <div
                        style={{
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: '#000',
                            opacity: 0.7
                        }}
                    />
                )}
            </div>
        </div>
    );
};

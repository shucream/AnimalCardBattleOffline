import React, {ReactNode} from 'react';
//@ts-ignore
import animationSound from '../assets/se/animationwrapper.mp3';
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";

const wait = (duration = 0) => {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration);
        });
    };
};

interface Props {
    message: string | ReactNode;
    soundEffect: (sound: any) => void;
    type?: 'stay';
    style?: any;
}

interface State {
    opacity: number;
    height: number;
    fontSize: number;
}

export default class WrapperAnimations extends React.Component<Props, State> {
    public state = {
        opacity: 0,
        height: 0,
        fontSize: 0,
    };

    public render() {
        return (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    transitionDuration: '500ms',
                    transitionProperty: 'all',
                    transitionTimingFunction: 'ease',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: this.state.opacity,
                    flexDirection: 'column',
                    ...this.props.style
                }}
            >
                <div
                    style={{
                        width: '100%',
                        backgroundColor: '#3f9',
                        justifyContent: 'center',
                        height: this.state.height,
                        transitionDuration: '500ms',
                        transitionProperty: 'all',
                        transitionTimingFunction: 'ease',
                        alignItems: 'center'
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            transitionDuration: '500ms',
                            transitionProperty: 'all',
                            transitionTimingFunction: 'ease',
                            textAlign: 'center',
                            fontSize: this.state.fontSize,
                            opacity: this.state.opacity,
                        }}
                    >
                        {this.props.message}
                    </p>
                </div>
                {this.props.type==='stay' && (
                    <Button component={Link} variant={'contained'} size={'large'} to={"/home"} style={{ marginTop: 20 }}>
                        トップに戻る
                    </Button>
                )}
            </div>
        );
    }

    public async startAnimation() {
        if (this.props.type === 'stay') {
            return Promise.resolve()
                .then(wait(300))
                .then(() => this.props.soundEffect(animationSound))
                .then(() => this.setState({ opacity: 1, height: 100, fontSize: 60 }));
        } else {
            return Promise.resolve()
                .then(wait(300))
                .then(() => this.props.soundEffect(animationSound))
                .then(() => this.setState({ opacity: 1, height: 100, fontSize: 60 }))
                .then(wait(2000))
                .then(() => this.setState({ opacity: 0, height: 0, fontSize: 0 }))
                .then(wait(300));
        }
    }
}

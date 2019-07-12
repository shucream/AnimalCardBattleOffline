import React from 'react';

const wait = (duration = 0) => {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration);
        });
    };
};

interface Props {
    message: string;
    type?: 'stay';
    style?: any;
}

interface State {
    opacity: number;
    textTranslate: string;
}

export default class WrapperAnimations extends React.Component<Props, State> {
    public state = {
        opacity: 0,
        textTranslate: 'translateX(-100%)'
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
                    ...this.props.style
                }}
            >
                <div
                    style={{
                        height: 100,
                        width: '100%',
                        backgroundColor: '#3f9',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <h1
                        style={{
                            transitionDuration: '500ms',
                            transitionProperty: 'all',
                            transitionTimingFunction: 'ease',
                            textAlign: 'center',
                            transform: this.state.textTranslate
                        }}
                    >
                        {this.props.message}
                    </h1>
                </div>
            </div>
        );
    }

    public async startAnimation() {
        if (this.props.type === 'stay') {
            return Promise.resolve()
                .then(wait(500))
                .then(() => this.setState({ opacity: 1, textTranslate: 'translateX(0%)' }));
        } else {
            return Promise.resolve()
                .then(wait(500))
                .then(() => this.setState({ opacity: 1, textTranslate: 'translateX(0%)' }))
                .then(wait(2000))
                .then(() => this.setState({ opacity: 0, textTranslate: 'translateX(100%)' }))
                .then(wait(500));
        }
    }
}

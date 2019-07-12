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
            </div>
        );
    }

    public async startAnimation() {
        if (this.props.type === 'stay') {
            return Promise.resolve()
                .then(wait(300))
                .then(() => this.setState({ opacity: 1, height: 0 }));
        } else {
            return Promise.resolve()
                .then(wait(300))
                .then(() => this.setState({ opacity: 1, height: 100, fontSize: 60 }))
                .then(wait(2000))
                .then(() => this.setState({ opacity: 0, height: 0, fontSize: 0 }))
                .then(wait(300));
        }
    }
}

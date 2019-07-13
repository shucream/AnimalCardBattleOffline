import React from "react";
import {findDOMNode} from "react-dom";

interface Props {
    size: number;
}

interface State {
    x: number;
    y: number;
    opacity: number;
}

const wait = (duration = 0) => {
    return () => {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration);
        });
    };
};

export class AppleGem extends React.Component<Props, State> {
    public state: State = {
        x: 0,
        y: 0,
        opacity: 0,
    };

    public async componentDidMount() {
        const dom = findDOMNode(this) as Element;
        const rect = dom.getBoundingClientRect();
        Promise.resolve()
            .then(() => this.setState({x: -rect.left+(window.innerWidth/2), y: -rect.top+(window.innerHeight/2)}))
            .then(wait(500))
            .then(() => this.setState( {opacity: 1}))
            .then(wait(400+100*Math.random()))
            .then(() => this.setState({x: 0, y: 0}))
    }

    public render() {
        const { size } = this.props;
        return (
            <div style={{
                width: size,
                height: size,
                opacity: this.state.opacity,
                borderRadius: '50%',
                backgroundColor: '#ff5722',
                transform: 'translate('+this.state.x.toString()+'px,'+this.state.y.toString()+'px )',
                transitionDuration: '500ms',
                transitionProperty: 'all',
                transitionTimingFunction: 'ease',
            }} />
        )
    }
}

import React, {createRef} from 'react';
import styled from 'styled-components';
import Background from './assets/title-s.jpg';
// @ts-ignore
import BGM from './assets/bgm.mp3';
import {BrowserRouter, Route} from "react-router-dom";
import TopScreen from "./screens/TopScreen";
import HowToPlayScreen from "./screens/HowToPlayScreen";
import ReactPlayer from "react-player";
import SettingScreen from "./screens/SettingScreen";
import GameScreen from "./screens/GameScreen";
import AskScreen from "./screens/AskScreen";

interface Props {}

interface State {
    bgmStart: boolean;
    bgmVolume: number;
    effectStart: boolean;
    effectVolume: number;
    effect: any;
}

export default class App extends React.Component<Props, State> {
    public state: State = {
        bgmStart: false,
        bgmVolume: 100,
        effectStart: false,
        effectVolume: 100,
        effect: '',
    };

    public handleBgmVolume = (event: any, newValue: any) => {
        this.setState({ bgmVolume: newValue });
        this.startBgm();
    };

    public startBgm = () => {
        this.setState({ bgmStart: true });
    };

    private handleEffectVolume = (event: any, newValue: any) => {
        this.setState({ effectVolume: newValue });
        this.startBgm();
    };

    public soundEffect = (sound: any) => {
        this.startBgm();
        Promise.resolve()
            .then(() => (this.setState(() => ({ effectStart: false, effect: sound }))))
            .then(() => (this.setState(() => ({ effectStart: true, effect: sound }))))
    };

    public render() {
        return (
            <BackgroundImage>
                <BrowserRouter>
                    <Route exact path={'/'} render={() => (<AskScreen onClick={this.startBgm}/>)}/>
                    <Route exact path={'/home'} component={TopScreen}/>
                    <Route path={'/game/:id'} render={(props) => (<GameScreen match={props.match} soundEffect={this.soundEffect}/>)} />
                    <Route exact path={'/howto'} component={HowToPlayScreen}/>
                    <Route exact path={'/setting'} render={() => (
                        <SettingScreen
                            bgmVolume={this.state.bgmVolume}
                            effectVolume={this.state.effectVolume}
                            handleBgmVolume={this.handleBgmVolume.bind(this)}
                            handleEffectVolume={this.handleEffectVolume.bind(this)}
                        />
                    )}/>
                </BrowserRouter>
                <ReactPlayer
                    url={BGM}
                    volume={this.state.bgmVolume / 100}
                    width={0}
                    height={0}
                    style={{ opacity: 0 }}
                    loop
                    playing={this.state.bgmStart}
                />
                <ReactPlayer
                    url={this.state.effect}
                    volume={this.state.effectVolume / 100}
                    playing={this.state.effectStart}
                    width={0}
                    height={0}
                    style={{ opacity: 0 }}
                />
            </BackgroundImage>
        );
    }



};

const BackgroundImage = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${Background});
    background-size: cover;
    background-position: center;
    align-items: center;
    flex-direction: column;
    display: flex;
`;

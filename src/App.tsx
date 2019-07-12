import React from 'react';
import styled from 'styled-components';
import Background from './assets/title-s.jpg';
import {BrowserRouter, Route} from "react-router-dom";
import TopScreen from "./screens/TopScreen";
import HowToPlayScreen from "./screens/HowToPlayScreen";

const App: React.FC = () => {
  return (
      <BackgroundImage>
        <BrowserRouter>
            <Route exact path={'/'} component={TopScreen}/>
            <Route exact path={'/howto'} component={HowToPlayScreen}/>
        </BrowserRouter>
      </BackgroundImage>
  );
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

export default App;

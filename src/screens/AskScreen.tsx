import React from "react";
import AnimalRule from '../assets/rule_animal.png';
import DayRule from '../assets/rule_day.png';
import styled from "styled-components";
import {Button, Paper} from "@material-ui/core";
import {Link} from "react-router-dom";

interface Props {
    onClick: () => void;
}

const AskScreen: React.FC<Props> = props => {
    return (
        <Container>
            <StyledPaper>
                このゲームは音声が流れます。
                <Button component={Link} variant={'contained'} size={'large'} to={"/home"} onClick={props.onClick}>
                    進む
                </Button>
            </StyledPaper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    max-width: 768px;
    padding: 10px;
`;

const StyledPaper = styled(Paper)`
    display: flex;
    padding: 30px;
    background-color: white;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export default AskScreen;

import React from "react";
import AnimalRule from '../assets/rule_animal.png';
import DayRule from '../assets/rule_day.png';
import styled from "styled-components";
import {Button, Paper} from "@material-ui/core";
import {Link} from "react-router-dom";

interface Props {}

const pages = [
    {
        uri: AnimalRule
    },
    {
        uri: DayRule
    }
];

const HowToPlayScreen: React.FC<Props> = props => {
    return (
        <Container>
            <StyledPaper>
                {pages.map(image => (
                    <img src={image.uri} style={{ marginBottom: 20, width: '100%' }}  alt={'b'}/>
                ))}
                <Button component={Link} variant={'contained'} size={'large'} to={"/"}>
                    戻る
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
    padding: 10px;
    max-width: 768px;
`;

const StyledPaper = styled(Paper)`
    display: flex;
    padding: 30px;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export default HowToPlayScreen;

import React from 'react';
import styled from 'styled-components';
import {Button, ButtonGroup, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

interface Props {
}

const TopScreen: React.FC<Props> = props => {

    let titleSize:
        | 'button'
        | 'caption'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'inherit'
        | 'overline'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'srOnly'
        | undefined;
    let buttonSize: any;
    if (window.innerWidth < 340) {
        titleSize = 'h6';
        buttonSize = 'small';
    } else if (window.innerWidth < 768) {
        titleSize = 'h5';
        buttonSize = 'medium';
    } else {
        titleSize = 'h3';
        buttonSize = 'large';
    }
    return (
        <Container>
            <StyledPaper>
                <Typography variant={titleSize} component={'h1'} style={{ marginBottom: 20 }}>
                    「どうぶつカードバトル」
                </Typography>
                <ButtonGroup
                    variant="contained"
                    color="primary"
                    size={buttonSize}
                    aria-label="Outlined primary button group"
                    style={{ marginBottom: 20 }}
                >
                    <Button component={Link} to="/game/3" >3人プレイ</Button>
                    <Button component={Link} to="/game/4" >4人プレイ</Button>
                    <Button component={Link} to="/game/5" >5人プレイ</Button>
                </ButtonGroup>
                <ButtonGroup variant="contained" size={buttonSize} >
                    <Button component={Link} to="/howto" >
                        あそびかた
                    </Button>
                    <Button component={Link} to="/setting" >
                        設定
                    </Button>
                </ButtonGroup>
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
`;

const StyledPaper = styled(Paper)`
    display: flex;
    padding: 30px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export default TopScreen;

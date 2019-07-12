import React from "react";
import styled from "styled-components";
import {Button, Grid, Paper, Slider, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {VolumeDown, VolumeUp} from "@material-ui/icons";

interface Props {
    bgmVolume: number;
    effectVolume: number;
    handleBgmVolume: (event: any, newValue: any) => void;
    handleEffectVolume: (event: any, newValue: any) => void;
}

const SettingScreen: React.FC<Props> = props => {
    return (
        <Container>
            <StyledPaper>
                <Typography gutterBottom>
                    BGM Volume
                </Typography>
                <Grid container spacing={2} style={{width: 250}}>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider value={props.bgmVolume} onChange={props.handleBgmVolume} />
                    </Grid>
                    <Grid item>
                        <VolumeUp />
                    </Grid>
                </Grid>
                <Typography gutterBottom>
                    Effect Volume
                </Typography>
                <Grid container spacing={2} style={{width: 250}}>
                    <Grid item>
                        <VolumeDown />
                    </Grid>
                    <Grid item xs>
                        <Slider value={props.effectVolume} onChange={props.handleEffectVolume}/>
                    </Grid>
                    <Grid item>
                        <VolumeUp />
                    </Grid>
                </Grid>
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

export default SettingScreen;

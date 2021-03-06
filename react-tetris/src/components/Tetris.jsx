import React, { useState } from 'react';

import { createStage } from "../gameHelpers";

// styles
import {StyledTetrisWrapper} from "./styles/StyledTetrisWrapper";
import {StyledTetris} from "./styles/StyledTetris";

// components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

// custom Hooks
import {useStage} from "../hooks/useStage";
import {usePlayer} from "../hooks/usePlayer";

const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);

    console.log('re-render');

    const movePlayer = dir => {
        updatePlayerPos({ x: dir, y: 0 })
    }

    const startGame = () => {
        // Reset Everything
        setStage(createStage())
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({ x:0, y: 1, collided: false });
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver){

            // left arrow
            if (keyCode === 37) {
                movePlayer(-1);
            }
            // right arrow
            else if (keyCode === 39) {
                movePlayer(1);
            }
            // down arrow
            else if (keyCode === 40) {
                dropPlayer();
            }
        }
    }

    return (
        // setting role to button otherwise it won't response to key presses.
        <StyledTetrisWrapper role={"button"} tabIndex={"0"} onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text={"Game Over"} />
                    ) : (
                        <div>
                            <Display text={"Score"} />
                            <Display text={"Rows"} />
                            <Display text={"Level"} />
                        </div>
                    )}
                    <StartButton callback={startGame}/>
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
}

export default Tetris;
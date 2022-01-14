import { useState, useEffect } from 'react';
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {


        const updateStage = prevStage => {

            // First flush of the stage`
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            );

            // Then, draw the tetronimo
            player.tetromino.forEach((row, y)  => {
                row.forEach((value, x) => {
                   if (value !== 0) {
                       newStage[y + player.pos.y][x + player.pos.x] = [
                           value,
                           `${player.collided ? 'merged' : 'clear'}`
                       ]
                   }
                });
            });

            // return new stage
            return newStage;
        };

        setStage(prev => updateStage(prev));

    }, [player.collided, player.pos.x, player.pos.y, player.tetromino]) // we specify all the things we're using inside the useEffect.

    return [stage, setStage];
};
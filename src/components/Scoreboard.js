import React from 'react';

const Scoreboard = ({ player1Score, player2Score, tieScore }) => {
    return (
        <div className="scoreboard">
            <div className="player-score">
                <span>Player 1 (X)</span>
                <span>{player1Score}</span>
            </div>
            <div className="player-score">
                <span>Tie</span>
                <span>{tieScore}</span>
            </div>
            <div className="player-score">
                <span>Player 2 (O)</span>
                <span>{player2Score}</span>
            </div>
        </div>
    );
};

export default Scoreboard;
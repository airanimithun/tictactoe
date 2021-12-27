import React from 'react';
import Square from './Square';

const stateObj = {
    square : [null,null,null,null,null,null,null,null,null],
    nextPlayer: 'X',
    matchOver: 'progress'
}
class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = stateObj;
        this.handleClick = this.handleClick.bind(this);
    }
    
    checkWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
            }
          }
          return null;
    }

    handleClick(sid) {
        if(this.state.square[sid] !== null) //Already Selected
            return;
        if(this.state.matchOver !== 'progress') //Already Over
            return;
        const sq = this.state.square.slice();        
        const newPlayer = this.state.nextPlayer === 'X' ? 'Y' : 'X';
        sq[sid] =  newPlayer === 'X' ? 'O' : 'X';
        this.setState((prevState) => ({...prevState,square: sq, nextPlayer: newPlayer}))
        if(this.checkWinner(sq)) {

            this.setState((pre) => ({...pre, matchOver: 'win'}))
        }            
        else if(sq.filter(e => e !== null).length === 9) {
            this.setState((pre) => ({...pre, matchOver: 'draw'}))
        }
    }

    render() {
        return (
            <>
                <h3>TIC TAC TOE</h3>                
                <div style={{display:'flex', justifyContent: 'center'}}>                
                    <Square sid={0} value={this.state.square[0]} handleClick={this.handleClick}/>
                    <Square sid={1} value={this.state.square[1]} handleClick={this.handleClick}/>
                    <Square sid={2} value={this.state.square[2]} handleClick={this.handleClick}/>                                 
                </div>
                <div style={{display:'flex', justifyContent: 'center'}}>                
                    <Square sid={3} value={this.state.square[3]} handleClick={this.handleClick}/>
                    <Square sid={4} value={this.state.square[4]} handleClick={this.handleClick}/>
                    <Square sid={5} value={this.state.square[5]} handleClick={this.handleClick}/>                                 
                </div>
                <div style={{display:'flex', justifyContent: 'center'}}>                
                    <Square sid={6} value={this.state.square[6]} handleClick={this.handleClick}/>
                    <Square sid={7} value={this.state.square[7]} handleClick={this.handleClick}/>
                    <Square sid={8} value={this.state.square[8]} handleClick={this.handleClick}/>                                 
                </div>

                <h5>Turn : {this.state.nextPlayer === 'X' ? 'Player 1' : 'Player 2'}</h5>
                <h2 style={{display: this.state.matchOver !== 'progress' ? 'block' : 'none'}}> { this.state.matchOver === 'win' ?  this.state.nextPlayer === 'X' ? 'Player 2 Wins' : 'Player 1 Wins' : 'Match Drawn'}</h2>
                <button style={{width:100, height:30, marginTop: 10}}onClick={() => this.setState(stateObj)}> Reset </button>

            </>
            
        )
    }
}

export default Board;
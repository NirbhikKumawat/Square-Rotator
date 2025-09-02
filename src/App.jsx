import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './board.css'
import './App.css'

export default function App(){
    return (
        <div className="app-container">
            <div className="app-heade">
                <h1>Square Rotator 3X3 </h1>
            </div>
                <main className="game-container">
                    <ImmutableSquareButtonsGrid/>
                </main>
            <footer className="app-footer">
                <Creator/>
                <ReactCredit />
            </footer>
        </div>
    )
}
function ReactCredit() {
    return (
        <div className="credit">
            <h3>Made with</h3>
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
                <img src={reactLogo} alt="React Logo" className="logo"/>
            </a>
        </div>
    );
}
function Creator(){
    return (
        <div className="credit">
            <h3>Made by Nirbhik Kumawat</h3>
            <a href="https://github.com/NirbhikKumawat" target="_blank">
                <img src="/github.svg" alt="GitHub Logo" height="54px" width="84px" className="logo"/>
            </a>
        </div>
    )
}
function Block({value}) {
    return (
        <button className="square-button" disabled>
            {value}
        </button>
    );
}
function ArrowButton({direction,clicked=null,disabled=false}) {
    const arrowSymbols = {
        up: '↑',
        down: '↓',
        left: '←',
        right: '→'
    };
    return (
        <button className="arrow-button" onClick={clicked} disabled={disabled} aria-label={`Rotate ${direction}`}>
            {arrowSymbols[direction]}
        </button>
    )
}
function ActionButton({clicked=null,children,variant='primary',disabled=false}) {
    return(
        <button className={`action-button ${variant}`} onClick={clicked} disabled={disabled}>
            {children}
        </button>
    )
}
function Counter({count=0}){
    return (
        <div className="counter">
            <h3>Moves: {count}</h3>
        </div>

    )
}
function ImmutableSquareButtonsGrid() {
    const [squares, setSquares] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const [game,setGame] = useState(0);
    const [counts, setCounts] = useState(0);
    function checker(){
        for (let i = 0; i < 9; i++) {
            if(squares[i]!==i+1){
                return false;
            }
        }
        return true;
    }
    function rotateLeftUp(i){
        if(game===2){
            return;
        }
        const nextSquares=squares.slice();
        let temp = nextSquares[i-1];
        nextSquares[i-1]=nextSquares[i+2];
        nextSquares[i+2]=nextSquares[i+5];
        nextSquares[i+5]=temp;
        setSquares(nextSquares);
        if(game===1){
            setCounts(counts+1);
        }
    }function rotateLeftDown(i){
        if(game===2){
            return;
        }
        const nextSquares=squares.slice();
        let temp = nextSquares[i-1];
        nextSquares[i-1]=nextSquares[i+5];
        nextSquares[i+5]=nextSquares[i+2];
        nextSquares[i+2]=temp;
        setSquares(nextSquares);
        if(game===1){
            setCounts(counts+1);
        }
    }
    function rotateUpLeft(i){
        if(game===2){
            return;
        }
        const nextSquares=squares.slice();
        let temp = nextSquares[i-1];
        nextSquares[i-1]=nextSquares[i];
        nextSquares[i]=nextSquares[i+1];
        nextSquares[i+1]=temp;
        setSquares(nextSquares);
        if(game===1){
            setCounts(counts+1);
        }
    }
    function rotateUpRight(i){
        if(game===2){
            return;
        }
        const nextSquares=squares.slice();
        let temp = nextSquares[i-1];
        nextSquares[i-1]=nextSquares[i+1];
        nextSquares[i+1]=nextSquares[i];
        nextSquares[i]=temp;
        setSquares(nextSquares);
        if(game===1){
            setCounts(counts+1);
        }
    }
    function start(){
        setGame(1);
    }
    function reset(){
        setGame(0);
        setSquares([1,2,3,4,5,6,7,8,9]);
        setCounts(0);
    }
    function shuffle(){
        if(game===1||game===2){
            return;
        }
        const random=Math.floor(Math.random()*12);
        if(random===0){
            rotateLeftUp(1);
        }
        else if(random===1){
            rotateLeftUp(2);
        }
        else if(random===2){
            rotateLeftUp(3);
        }
        else if(random===3){
            rotateLeftDown(1);
        }
        else if(random===4){
            rotateLeftDown(2);
        }
        else if(random===5){
            rotateLeftDown(3);
        }
        else if(random===6){
            rotateUpLeft(1);
        }
        else if(random===7){
            rotateUpLeft(4);
        }
        else if(random===8){
            rotateUpLeft(7);
        }
        else if(random===9){
            rotateUpRight(1);
        }
        else if(random===10){
            rotateUpRight(4);
        }
        else if(random===11){
            rotateUpRight(7);
        }

    }
    return (
        <>
            <ActionButton clicked={shuffle} disabled={game===1}>
                Shuffle
            </ActionButton>
            <ActionButton clicked={start} variant="success" disabled={game===1||checker()}>
                Start Game
            </ActionButton>
            <ActionButton clicked={reset} variant="secondary">
                Reset Game
            </ActionButton>
            <Counter count={counts} />
            <div className="arrows-grid">
                <ArrowButton clicked={()=>rotateLeftUp(1)} direction="up"/>
                <ArrowButton clicked={()=>rotateLeftUp(2)} direction="up"/>
                <ArrowButton clicked={()=>rotateLeftUp(3)} direction="up"/>
            </div>
            <div className="buttons-grid">
                <ArrowButton clicked={()=>rotateUpLeft(1)} direction="left"/>
                <Block value={squares[0]}/>
                <Block value={squares[1]}/>
                <Block value={squares[2]}/>
                <ArrowButton clicked={()=>rotateUpRight(1)} direction="right"/>
            </div>
            <div className="buttons-grid">
                <ArrowButton clicked={()=>rotateUpLeft(4)} direction="left"/>
                <Block value={squares[3]}/>
                <Block value={squares[4]}/>
                <Block value={squares[5]}/>
                <ArrowButton clicked={()=>rotateUpRight(4)} direction="right"/>
            </div>
            <div className="buttons-grid">
                <ArrowButton clicked={()=>rotateUpLeft(7)} direction="left"/>
                <Block value={squares[6]}/>
                <Block value={squares[7]}/>
                <Block value={squares[8]}/>
                <ArrowButton clicked={()=>rotateUpRight(7)}  direction="right"/>
            </div>
            <div className="arrows-grid">
                <ArrowButton clicked={()=>rotateLeftDown(1)} direction="down"/>
                <ArrowButton clicked={()=>rotateLeftDown(2)} direction="down"/>
                <ArrowButton clicked={()=>rotateLeftDown(3)} direction="down"/>
            </div>
        </>
    );
}

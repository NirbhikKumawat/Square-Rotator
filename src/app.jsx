import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './board.css'
import './App.css'

export default function App(){
    return (
        <>
            <h1>Square Rotator 3X3 </h1>
            <ImmutableSquareButtonsGrid/>
            <Creator/>
            <React />

        </>

    )
}
function React() {
    return (
        <>
            <h3>Made with</h3>
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
                <img src={reactLogo} alt="React Logo" />
            </a>
        </>
    );
}
function Creator(){
    return (
        <>
            <h3>Made by Nirbhik Kumawat</h3>
            <a href="https://github.com/NirbhikKumawat" target="_blank">
                <img src="/github.svg" alt="GitHub Logo" height="54px" width="54px" />
            </a>
        </>
    )
}
function Block({value}) {
    return (
        <button className="square-button" disabled>
            {value}
        </button>
    );
}
function ArrowButton({value,clicked=null}) {
    return (
        <button className="arrow-button" onClick={clicked}>
            {value}
        </button>
    )
}
function Shuffle({clicked=null}) {
    return (
        <button className="shuffle-button" onClick={clicked}>
            Shuffle
        </button>
    )
}
function Start({clicked=null}) {
    return (
        <button className="shuffle-button" onClick={clicked}>
            Start
        </button>
    )
}
function Counter({count=0}){
    return (
        <h3>Count: {count}</h3>
    )
}
function Reset({clicked=null}) {
    return (
        <button onClick={clicked}>Reset</button>
    )
}
function ArrowGrid(){

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
    function lu(i){
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
    }function ld(i){
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
    function ul(i){
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
    function ur(i){
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
            lu(1);
        }
        else if(random===1){
            lu(2);
        }
        else if(random===2){
            lu(3);
        }
        else if(random===3){
            ld(1);
        }
        else if(random===4){
            ld(2);
        }
        else if(random===5){
            ld(3);
        }
        else if(random===6){
            ul(1);
        }
        else if(random===7){
            ul(4);
        }
        else if(random===8){
            ul(7);
        }
        else if(random===9){
            ur(1);
        }
        else if(random===10){
            ur(4);
        }
        else if(random===11){
            ur(7);
        }

    }
    return (
        <>
            <Shuffle clicked={shuffle} />
            <Start clicked={start}/>
            <Reset clicked={reset}/>
            <Counter count={counts} />
            <div className="arrows-grid">
                <ArrowButton clicked={()=>lu(1)}/>
                <ArrowButton clicked={()=>lu(2)}/>
                <ArrowButton clicked={()=>lu(3)}/>
            </div>
            <div className="buttons-grid">
                <ArrowButton clicked={()=>ul(1)}/>
                <Block value={squares[0]}/>
                <Block value={squares[1]}/>
                <Block value={squares[2]}/>
                <ArrowButton clicked={()=>ur(1)}/>
            </div>
            <div className="buttons-grid">
                <ArrowButton clicked={()=>ul(4)}/>
                <Block value={squares[3]}/>
                <Block value={squares[4]}/>
                <Block value={squares[5]}/>
                <ArrowButton clicked={()=>ur(4)}/>
            </div>
            <div className="buttons-grid">
                <ArrowButton clicked={()=>ul(7)}/>
                <Block value={squares[6]}/>
                <Block value={squares[7]}/>
                <Block value={squares[8]}/>
                <ArrowButton clicked={()=>ur(7)}/>
            </div>
            <div className="arrows-grid">
                <ArrowButton clicked={()=>ld(1)}/>
                <ArrowButton clicked={()=>ld(2)}/>
                <ArrowButton clicked={()=>ld(3)}/>
            </div>
        </>
    );
}

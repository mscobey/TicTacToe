const gameBoard= (()=>{
    let board = new Array(9);
    let winningBoards = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [3,4,5],
        [6,7,8]
    ];
    
    const resetBoard = ()=>{
        board=new Array(9);
    }

    const move=(player,i)=>{
        board[i]=`${player}`;
    }

    const checkWin = (player)=>{
        let playerMoves = board.reduce((r,name,index)=>{
            name===player&&r.push(index);
            return r;
        },[]);
        console.log(playerMoves);
        let win=false;
        for(let i=0;i<winningBoards.length;i++){
            let target  = winningBoards[i];
            console.log(target,i);
            let check = target.every(elem => playerMoves.includes(elem));
            if(check==true){
                win=true;
            }
        }
        
        return win;
    }

    return{move,checkWin,resetBoard};

})();

const displayController= (()=>{
    let player1;
    let player2;

    document.getElementById('startBtn').addEventListener('click',()=>{
        let p1name=document.getElementById('name1').value;
        let p1xo=document.querySelector('input[name="player1"]:checked').value;
        let p2name=document.getElementById('name2').value;
        let p2xo = document.querySelector('input[name="player2"]:checked').value;

        document.getElementById('players').style.display='none';
        player1=player(p1name,p1xo);
        player2=player(p2name,p2xo);
        document.getElementById('header').innerHTML=`<h1 style='color:#${player1.color};'>${player1.name} (${player1.xo})</h1> vs. <h1 style='color:#${player2.color};'>${player2.name} (${player2.xo})</h1>`;   
        
        startGame(player1,player2);
    });
    let pTurn = 1;
    const turn = () =>{
        pTurn++;
    }

    const startGame = (p1,p2) =>{
        for(let i = 0;i<9;i++){
            let div =document.getElementById(`s${i}`);
            div.addEventListener('click',div.fn = ()=>{
                let won = false;
                if(pTurn%2 !=0){
                    div.innerHTML=`<h1 style='color:#${p1.color};'>${p1.xo}</h1>`;
                    gameBoard.move(p1.name,i);
                    if(gameBoard.checkWin(p1.name)){
                        playerWon(p1,p2);
                        won=true;
                    }
                }
                else{
                    div.innerHTML=`<h1 style='color:#${p2.color};'>${p2.xo}</h1>`;
                    gameBoard.move(p2.name,i);
                    gameBoard.checkWin(p2.name);
                    if(gameBoard.checkWin(p2.name)){
                        playerWon(p2,p1);
                        won=true;
                    }
                }
                turn();
                if(pTurn>9 && !won){
                    tieGame(p1,p2);
                }
            },{once:true});
            

        }
    }
    
    const playerWon = (winner,loser) =>{
        document.getElementById('header').innerHTML=`<h1 style='color:#${winner.color}'>${winner.name} won! ${loser.name} is a loser haha!</h1>`;
        gameOver();
    }

    const tieGame = (p1,p2)=>{
        document.getElementById('header').innerHTML=`<h1>Draw! Neither ${p1.name} or ${p2.name} could win :(</h1>`;
        gameOver();
    }

    const gameOver = ()=>{
        for(let i=0;i<9;i++){
            let div=document.getElementById(`s${i}`);
            div.removeEventListener('click',div.fn,{once:true});
        }
        document.getElementById('players').innerHTML='<button style="margin-top:7px;margin-left:105px"  id="resetBtn">Play Again!</button>';
        document.getElementById('resetBtn').addEventListener('click',()=>{
            window.location.reload();
        });
        document.getElementById('players').style.display='block';
    }

})();

const player = (name,xo)=>{
    const color = Math.floor(Math.random()*16777215).toString(16);
    return {name,xo,color};
};

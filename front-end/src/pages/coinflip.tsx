import { Brightness7 as Brightness7Icon, Brightness3 as Brightness3Icon, ComputerTwoTone as ComputerIcon, Person3TwoTone as PersonIcon } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { openNotification, sleep } from "../utils/components"
import { InfoCoinflip, InfoStaking } from "../utils/constants"
import { useProgram } from "../utils/useProgram"
import { useWallet } from "@suiet/wallet-kit"
import CROWN_IMG from "../assets/images/crown.svg"
import SUI_IMG from '../assets/images/SUI.png'
import { useDatabse } from "../utils/useDatabase"

// const recentGames = [
//     {coin: 'SHS', player: "0xa72c7b4a20f553c581cfcac3b9a06020d13448c27892c6109971a2fa7144c296", select:1, amount: InfoCoinflip[1].wager_amount[0], result: true},
//     {coin: 'SUI', player: "0xa72c7b4a20f553c581cfcac3b9a06020d13448c27892c6109971a2fa7144c296", select:1, amount: InfoCoinflip[0].wager_amount[1], result: false},
//     {coin: 'SUI', player: "0xa72c7b4a20f553c581cfcac3b9a06020d13448c27892c6109971a2fa7144c296", select:2, amount: InfoCoinflip[0].wager_amount[3], result: false},
//     {coin: 'SHS', player: "0xa72c7b4a20f553c581cfcac3b9a06020d13448c27892c6109971a2fa7144c296", select:2, amount: InfoCoinflip[1].wager_amount[0], result: true},
//     {coin: 'SHS', player: "0xa72c7b4a20f553c581cfcac3b9a06020d13448c27892c6109971a2fa7144c296", select:2, amount: InfoCoinflip[1].wager_amount[5], result: true},
//     {coin: 'SUI', player: "0xa72c7b4a20f553c581cfcac3b9a06020d13448c27892c6109971a2fa7144c296", select:1, amount: InfoCoinflip[0].wager_amount[1], result: true},
// ]

export default function Coinflip(){
    const wallet = useWallet()
    const {coinflip_flip, coinflip_claim, getUserCoinflipData, getShsOwned} = useProgram()
    const {getCoinflipRecentGame, putNewCoinflipGame} = useDatabse()

    const [gameStatus, setGameStatus] = useState(0)
    const [selectedCoin, setSelectedCoin] = useState(0)
    const [selectedSide, setSelectedSide] = useState(0)
    const [selectedAmount, setSelectedAmount] = useState(0)
    const [userData, setUserData] = useState<any>(null)
    const [tokenAmount, setTokenAmount] = useState(0)
    const [winNumber, setWinNumber] = useState(0)
    const [showNumber, setShowNumber] = useState(10)
    const [recentGames, setRecentGames] = useState<any[]>([])

    useEffect(()=>{
        const interval = setInterval(()=>{getRecentGame()}, 5000)
        return ()=> clearInterval(interval)
    },[])

    useEffect(()=>{
        getUserData()
        const interval = setInterval(()=>{getTokenAmount()}, 5000)
        return ()=>clearInterval(interval)
    },[wallet, selectedCoin])

    useEffect(()=>{
        if(userData==null) setGameStatus(0)
        if(userData!=null && userData.result===1) setGameStatus(2)
        if(userData!=null && userData.result===0) setGameStatus(3)
    },[userData])

    const getUserData = async() => {
        const ud = await getUserCoinflipData(selectedCoin)
        if(ud!=null && ud.result===1) setUserData(ud)
        else setUserData(null)
    }

    const getRecentGame = async() => {
        try{
            let games = await getCoinflipRecentGame()
            setRecentGames(games.map((item : any)=>{return {...item}}))
        }catch(err){

        }
    }

    const getTokenAmount = async() => {
        setTokenAmount(await getShsOwned(InfoCoinflip[selectedCoin].token_type))
    }

    return <div className="coinflip-dashboard">
        {/* <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} wind={-0.01} recycle={false}/> */}
        <div className="dashboard-header">
            <h2>COIN FLIP&nbsp;&nbsp;:&nbsp;&nbsp;<span style={{color: "#00ffff"}}>{Math.floor(tokenAmount/(10**InfoCoinflip[selectedCoin].token_decimals)*100)/100}</span> {InfoCoinflip[selectedCoin].name}</h2>
            <div className="">
                <button className={"btn-coin " + (selectedCoin ? "" : "active")} onClick={()=>{
                    setSelectedCoin(0)
                }}>SUI</button>
                <button className={"btn-coin " + (selectedCoin ? "active" : "")} onClick={()=>{
                    setSelectedCoin(1)
                }}>SHS</button>
            </div>
        </div>
        {
            gameStatus===0 ?
                <div className="coinflip-gameboard">
                    <div className="coin-select-panel">
                        <div className={"front-coin coin-select-button "+(selectedSide?"":"active")} onClick={()=>{setSelectedSide(0)}}>
                            <Brightness7Icon style={{fontSize:"80px"}}/>
                        </div>
                        <div className={"back-coin coin-select-button "+(selectedSide?"active":"")} onClick={()=>{setSelectedSide(1)}}>
                            <Brightness3Icon style={{fontSize:"80px"}}/>
                        </div>
                    </div>
                    <h3 className="coinflip-gameboard-h3">Choose your side</h3>
                    <div className="wager-select-panel">
                    {
                        InfoCoinflip[selectedCoin].wager_amount.map((item,idx)=>{
                            return <button key={idx} type="button" className={"btn-wager "+(selectedAmount===idx?"active":"")} onClick={()=>{setSelectedAmount(idx)}}>{item+" "+InfoCoinflip[selectedCoin].name}</button>
                        })
                    }
                    </div>
                    <h3 className="coinflip-gameboard-h3">Choose amount</h3>
                    <hr style={{width: "50%", color: "rgb(118, 139, 173)", margin: "10px auto", opacity: 0.25}}/>
                    <div className="btn-flip-wrapper">
                        <button className="btn-flip" onClick={async()=>{
                            try{
                                setGameStatus(1)
                                let coin = InfoCoinflip[selectedCoin].name
                                let amount = InfoCoinflip[selectedCoin].wager_amount[selectedAmount]
                                let res = await coinflip_flip(selectedCoin, selectedSide, InfoCoinflip[selectedCoin].wager_amount[selectedAmount])
                                if(res.events[0].parsedJson.result===1){
                                    setWinNumber(winNumber+1)
                                }else{
                                    setWinNumber(0)
                                }
                                let feedback = res.events[0].parsedJson;
                                try{
                                    putNewCoinflipGame({...feedback, amount: amount, result: feedback.result===1, coin: coin})
                                }catch(err){
                                    console.log(err)
                                }
                                setUserData(feedback)
                                // let i = (new Date()).getTime() % 5;
                                // if(i>=0) setWinNumber(winNumber+1)
                                // else setWinNumber(0)
                                // console.log(winNumber)
                                // await sleep(1000)
                                // setUserData({select: 1, result: i>=0?1:0, amount: COINFLIP_WAGER_AMOUNT[selectedAmount]})
                            }catch(err: any){
                                openNotification('error',err.message)
                                setGameStatus(0)
                            }
                        }}>Flip</button>
                    </div>
                </div>
            :
            gameStatus===1 ?
                <div className="coinflip-gameboard">
                    <div className="coin-flipping-panel">
                        <div className="coin-flipping-image animation-front-image front-coin">
                            <Brightness7Icon style={{fontSize:"160px"}}/>
                        </div>
                        <div className="coin-flipping-image animation-back-image back-coin">
                            <Brightness3Icon style={{fontSize:"160px"}}/>
                        </div>
                    </div>
                    <h3 className="coinflip-gameboard-h3">F l i p p i n g . . .</h3>
                </div>
            :
            gameStatus===2 ?
                <div className="coinflip-gameboard">
                    <div className="coin-select-panel">
                        <div className={"coin-result " + (userData.select===1 ? "front-coin" : "back-coin")}>
                        {
                            userData.select ?
                                <Brightness7Icon style={{fontSize:"160px"}}/>
                            :
                                <Brightness3Icon style={{fontSize:"160px"}}/>
                        }
                        </div>
                    </div>
                    <h3 className="coinflip-gameboard-h3">Bet amount : {userData.amount/(10**InfoCoinflip[selectedCoin].token_decimals)} {InfoCoinflip[selectedCoin].name}</h3>
                    <div className="btn-flip-wrapper">
                        <button className="btn-flip" onClick={async()=>{
                            try{
                                await coinflip_claim(selectedCoin)
                                setGameStatus(0)
                                await sleep(100)
                                setUserData(null)
                            }catch(err: any){
                                openNotification('error', err.message)
                            }
                        }}>Redeem Reward</button>
                    </div>
                </div>
            :
                <div className="coinflip-gameboard">
                    <div className="coin-select-panel">
                        <div className={"coin-result " + (userData.select===1 ? "back-coin" : "front-coin")}>
                        {
                            userData.select ?
                                <Brightness3Icon style={{fontSize:"160px"}}/>
                            :
                                <Brightness7Icon style={{fontSize:"160px"}}/>
                        }
                        </div>
                    </div>
                    <h3 className="coinflip-gameboard-h3">You lost {InfoCoinflip[selectedCoin].wager_amount[selectedAmount]} {InfoCoinflip[selectedCoin].name}</h3>
                    <div className="btn-flip-wrapper">
                        <button className="btn-flip" onClick={async()=>{
                            setGameStatus(0)
                            setUserData(null)
                        }}>Back and Retry</button>
                    </div>
                </div>
        }
        <div className="recent-game-header">
            Recent Games
        </div>
        <div className="recent-game-body">
        {
            recentGames.map((item, idx)=>{
                return <div className={"recent-game-item " + (((item.result && item.select===1) || (item.result===false && item.select===2)) ? "recent-game-blue-item " : "recent-game-red-item ") + (idx===0 ? "recent-game-top-item " : "") + (idx===(recentGames.length-1) ? "recent-game-bottom-item" : "")} key={idx}>
                    <div className={"recent-game-left-right recent-game-left " + (((item.result && item.select===1) || (item.result===false && item.select===2)) ? "win-panel" : "")}>
                        <div className="item">
                            <div className="logo left-logo">
                            {
                                item.select===1 ?
                                    <PersonIcon className="logo-icon"/>
                                :
                                    <ComputerIcon className="logo-icon"/>
                            }    
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-name">
                                {item.select===1 ? item.player.substr(0,8) : "(Flip Bot)"}
                            </div>
                        </div>
                        {
                            ((item.result && item.select===1) || (item.result===false && item.select===2)) &&
                            <div className="item item-flex">
                                <div className="bet-amount">
                                    {
                                        item.coin!=='SUI' ? 
                                            <div className="coin-image"/>
                                        :
                                            <img src={SUI_IMG} alt="SUI" width="16px"></img>
                                    }
                                    <div className="amount">{item.amount}</div>
                                </div>
                                <div className="bet-image">
                                    <img src={CROWN_IMG} width="14px" alt="crown"/>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="recent-game-center">
                    {
                        ((item.result && item.select===1) || (item.result===false && item.select===2)) ?
                            <div className="front-coin coin"><Brightness7Icon/></div>
                        :
                            <div className="back-coin coin"><Brightness3Icon/></div>
                    }
                    </div>
                    <div className={"recent-game-left-right recent-game-right " + (((item.result && item.select===1) || (item.result===false && item.select===2)) ? "" : "win-panel")}>
                        <div className="item">
                            <div className="logo right-logo">
                            {
                                item.select===1 ?
                                    <ComputerIcon className="logo-icon"/>
                                :
                                    <PersonIcon className="logo-icon"/>
                            }    
                            </div>
                        </div>
                        <div className="item">
                            <div className="item-name">
                                {item.select===2 ? item.player.substr(0,8) : "(Flip Bot)"}
                            </div>
                        </div>
                        {
                            ((item.result && item.select===2) || (item.result===false && item.select===1)) &&
                            <div className="item item-flex">
                                <div className="bet-amount">
                                    {
                                        item.coin!=='SUI' ? 
                                            <div className="coin-image"/>
                                        :
                                            <img src={SUI_IMG} alt="SUI" width="16px"></img>
                                    }
                                    <div className="amount">{item.amount}</div>
                                </div>
                                <div className="bet-image">
                                    <img src={CROWN_IMG} width="14px" alt="crown"/>
                                </div>
                            </div>
                        }
                    </div>   
                </div>
            })
        }
            {/* <div className="show-more">
                <button className="btn-more">SHOW MORE</button>
            </div> */}
        </div>
    </div>
}
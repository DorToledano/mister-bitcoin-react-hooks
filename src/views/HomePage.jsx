import { bitcoinService } from '../services/bitcoin.service'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { loadUser } from '../store/actions/user.actions'
import { MovesList } from '../cmps/MovesList'
import { useNavigate } from 'react-router-dom'

export function HomePage() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [rate, setRate] = useState(null)

  useEffect(() => {
    load()
    getRate()
  }, [])

  function load() {
    dispatch(loadUser())
    if (!user) navigate('/signup')
  }

  async function getRate() {
    try {
      const rate = await bitcoinService.getRate()
      setRate(rate)
    } catch (error) {
      console.log('error in rate:', error)
    }
  }

  const btc = 'bitcoin.png'
  const coins = 'coins.png'
  if (!user || !rate) return <h1> Loading...</h1>
  return (
    <section className="home-page">
      <h3>
        Hello, <span>{user.name}</span>!
      </h3>
      <p>
        <img src={require(`../img/${coins}`)} alt="coins" />
        Coins: {user.coins}
      </p>
      <p>
        <img src={require(`../img/${btc}`)} alt="btc" />
        BTC: {rate}
      </p>
      <MovesList
        title={'Your last 3 moves'}
        isHome={true}
        moves={user.moves.slice(0, 3)}
      />
    </section>
  )


  
}

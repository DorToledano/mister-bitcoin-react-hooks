import { contactService } from '../services/contact.service'
import { userService } from '../services/user.service'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { TransferFund } from '../cmps/TransferFund'
import { MovesList } from '../cmps/MovesList'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadContacts, removeContact } from '../store/actions/contact.actions'
import { updateUser, loadUser } from '../store/actions/user.actions'

export function ContactDetailsPage() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [contact, setContact] = useState(null)

  useEffect(() => {
    // dispatch(loadContacts())
    dispatch(loadUser())
    loadContact()
  }, [params.id])

  async function loadContact() {
    try {
      const contact = await contactService.getContactById(params.id)
      setContact(contact)
    } catch (error) {
      console.log('error:', error)
    }
  }

  function onBack() {
    navigate('/contact')
  }

  const onRemoveContact = useCallback(async (contactId) => {
    try {
      dispatch(removeContact(contactId))
      navigate('/contact')
    } catch (error) {
      console.log('error:', error)
    }
  }, [])

  function changeBalance(amount) {
    const move = {
      toId: contact._id,
      to: contact.name,
      at: Date.now(),
      amount,
    }
    const currUser = {
      ...user,
      coins: user.coins - amount,
      moves: [move, ...user.moves],
    }
    dispatch(updateUser(currUser))
  }

  const filterMoves = () => {
    const moves = user.moves
    return moves.filter((move) => move.toId === contact._id)
  }

  if (!contact || !user) return <div>Loading...</div>
  return (
    <section className="details-page-container">
      <section className="details-page">
        <section className="contact">
          <section className="actions">
            <button onClick={onBack}>
              <i className="fa-solid fa-circle-arrow-left"></i>
            </button>

            <button onClick={() => onRemoveContact(contact._id)}>
              <i className="fa-solid fa-trash"></i>
            </button>
            <Link to={`/contact/edit/${contact._id}`} className="a">
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
          </section>
          <img
            src={`https://robohash.org/set_set5/${contact._id}/size=100x100`}
          />
          <p>{contact.name}</p>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
        </section>
        <TransferFund
          contact={contact}
          changeBalance={changeBalance}
          maxCoins={user.coins}
        />
        <MovesList title={'Your moves'} isHome={false} moves={filterMoves()} />
      </section>
    </section>
  )
}

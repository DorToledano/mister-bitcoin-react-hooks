import { ContactList } from '../cmps/ContactList'
import { contactService } from '../services/contact.service'
import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setFilterBy,
  removeContact,
  loadContacts,
} from '../store/actions/contact.actions'

export function ContactPage() {

  const dispatch = useDispatch()
  // const [contacts, setContacts] = useState(null)
  const filterBy = useSelector(
    (storeState) => storeState.contactModule.filterBy
  )
  const contacts = useSelector(
    (storeState) => storeState.contactModule.contacts
  )

  useEffect(() => {
    dispatch(loadContacts())
  }, [])

  const onRemoveContact = useCallback(async (contactId) => {
    try {
      dispatch(removeContact(contactId))
    } catch (error) {
      console.log('error:', error)
    }
  }, [])

  function handleChange({ target }) {
    let value = target.value
    const filterBy = { term: value }
    dispatch(setFilterBy(filterBy))
    dispatch(loadContacts())
    // setFilterBy(
    //   ( filterBy ) => ({ filterBy: { ...filterBy, term: value } }),
    //   loadContacts
    // )
  }

  return (
    <section className="contact-page">
      <label htmlFor="name">
        <input
          type="search"
          name="name"
          id="name"
          placeholder="Search contact"
          onChange={handleChange}
        />
      </label>
      <div className='a-container'>
      <Link to="/contact/edit" title='Add contact' className='add'><i className="fa-solid fa-plus"></i></Link>
      </div>
      <ContactList contacts={contacts} onRemoveContact={onRemoveContact} />
    </section>
  )
}

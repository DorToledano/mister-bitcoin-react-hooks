import { contactService } from '../services/contact.service'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from '../customHooks/useForm'

export function ContactEditPage() {
  const [contact, handleChange, setContact] = useForm(contactService.getEmptyContact())
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    loadContact()
  }, [])

  async function loadContact() {
    const contactId = params.id
    if (contactId) {
      try {
        const contact = await contactService.getContactById(contactId)
        setContact(contact)
      } catch (error) {
        console.log('error:', error)
      }
    }
  }

  async function onSaveContact(ev) {
    ev.preventDefault()
    try {
      await contactService.saveContact({ ...contact })
      navigate('/contact')
    } catch (error) {
      console.log('error:', error)
    }
  }

  function onBack() {
    if (contact._id) navigate(`/contact/${contact._id}`)
    else navigate('/contact')
  }

  const { name, email, phone } = contact
  return (
    <section className="contact-edit">
      <button onClick={onBack}>Back</button>
      <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1>
      <form onSubmit={onSaveContact}>
        <label htmlFor="name">Name</label>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          id="name"
        />

        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={handleChange}
          type="email"
          name="email"
          id="email"
        />

        <label htmlFor="phone">Phone</label>
        <input
          value={phone}
          onChange={handleChange}
          type="phone"
          name="phone"
          id="phone"
        />

        <button>Save</button>
      </form>
    </section>
  )
}

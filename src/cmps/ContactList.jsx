import { ContactPreview } from "./ContactPreview";

export function ContactList({contacts,onRemoveContact}) { 
  if (!contacts) return <div> Loading...</div>
    return (
      <section className='contact-list'>
      <ul className="contact-list clean-list">
        {contacts.map(contact =>
                <ContactPreview key={contact._id} contact={contact}  />
            )}
      </ul>

      </section>
    )
  
}

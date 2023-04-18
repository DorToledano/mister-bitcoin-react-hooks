import React from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact }) {
    // const contactStyle = { backgroundImage: `url(https://robohash.org/${contact._id})` }
    return (
        <li  className='contact-preview info'>
            <Link to={`/contact/${contact._id}`}  >
                <img src={`https://robohash.org/set_set5/${contact._id}/size=100x100`} />
                <h2>{contact.name}</h2>
            </Link>
            
        </li>
    )
}

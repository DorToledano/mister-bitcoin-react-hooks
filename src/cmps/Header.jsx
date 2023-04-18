
import { NavLink} from "react-router-dom"

export function Header()  {
  return (
      <header className="app-header">
        <section className="container">
          <h1>Mister Bitcoin</h1>
          <nav>
          <NavLink exact to="/"> Home</NavLink>
          <NavLink to="/contact"> Contacts</NavLink>
          <NavLink to="/statistic"> Charts</NavLink>
          </nav>
        </section>
      </header>
    )
}


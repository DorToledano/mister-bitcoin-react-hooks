
import './styles/main.scss'
import { HomePage } from './views/HomePage.jsx'
import { ContactPage } from './views/ContactPage.jsx'
import { ContactEditPage } from './views/ContactEditPage.jsx'
import { ContactDetailsPage } from './views/ContactDetailsPage'
import { Header } from './cmps/Header.jsx'
import { StatisticPage } from './views/StatisticPage'
import { SignupPage } from './views/SignupPage'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'

 function App () {
    return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/contact/edit/:id?" element={<ContactEditPage />} />
            <Route path="/contact/:id" element={<ContactDetailsPage />} />
            <Route path="/statistic" element={<StatisticPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    )
  }

export default App






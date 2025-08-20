import { Outlet, NavLink } from 'react-router'
import './App.css'
import Navigation from './components/common/Navigate'
function App() {




  return (
    <>
    <div className="container">
       <h3>Task Tracker</h3>
       <Outlet ></Outlet>

      <Navigation></Navigation>
      </div>
    </>
  )
}

export default App

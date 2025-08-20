import { NavLink } from "react-router"
export default function Navigation(){
    return(

                <nav>
                  <ul style={{listStyleType:"none"}}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/zustand">Add Todo</NavLink></li>
          <li><NavLink to="/displayzustand">Display Todos</NavLink></li>
          <li><NavLink to="/async">Add & Display Async data</NavLink></li>

                  </ul>
                </nav>
              

    )
}
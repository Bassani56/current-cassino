import { useContext } from 'react'
import './header.css'
import { CurrentContext } from "../../context/themeContext"
export default function Header({children}){

    return(
        <header className="header" >
            <div className="menu">
                {children}
            </div>
            
        </header>
    )
}
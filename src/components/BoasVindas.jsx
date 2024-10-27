import './boasvindas.css'
import  logo from '../components/img/bolso-lula.jpg'
export default function BoasVindas({children}){

    return(
        <div className="bem-vindo" >
            {children}
        </div>
    )
}
import './box.css'

export default function Box({title, description, button, onButtonClick}){

    return(
        <div className="box-content">
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
            <button className="button" onClick={onButtonClick}>{button}</button>
        </div>
    )
}
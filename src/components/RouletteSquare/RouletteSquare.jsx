import './roulettesquare.css'

export default function RouletteSquare({number, size}){
    
    return(
        <div className='squarediv'
            style={{
                backgroundColor: number < 8 ? 'rgb(241, 44, 76)' :
                                number < 15 ? 'rgb(15, 25, 35)' :
                                'white',
                color: number === 15 ? 'black' : 'white',
                width: size,
                height: size
            }}
        >
            {number}
        </div>
    )
}
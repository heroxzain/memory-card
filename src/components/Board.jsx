import '../styles/board.css';
export default function Board({cards, handleClick}) {
  const divs = cards.map(card => {
    return <div 
      className='card'
      key={card.id}
      onClick={() => handleClick(card.id)}
    >
      {card.image && <img src={card.image} alt={card.name}/>}
      <p className="card-title">{card.name}</p>
    </div>
  })
  return (<div className='main'>{divs}</div>);
}

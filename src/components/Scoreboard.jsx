import '../styles/scoreboard.css';
export default function Scoreboard({
  score, 
  bestScore,
  cardCount,
  maxCards,
  onDifficultyChange,
}) {
  return (
<header className="scoreboard">
      <div className="title-group">
        <h1 className="title">CS Armory Memory</h1>
        <p className="subtitle">Click each weapon once—don&apos;t repeat!</p>
      </div>

      <div className="controls-group">
        <label className="difficulty-control">
          <span>Cards: <strong>{cardCount}</strong></span>
          <input
            type="range"
            min="2"
            max={Math.min(maxCards, 30)}
            value={cardCount}
            onChange={(e) => onDifficultyChange(Number(e.target.value))}
          />
        </label>

        <div className="stats">
          <div className="stat-pill">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score} / {cardCount}</span>
          </div>
          <div className="stat-pill best">
            <span className="stat-label">Best</span>
            <span className="stat-value">{bestScore}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

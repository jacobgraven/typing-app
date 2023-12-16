function StatsUI({ wpm, cpm, accuracy, onRestart }) {
    return (
      <div>
        <p>WPM: {Math.round(wpm)}</p>
        <p>CPM: {Math.floor(cpm)}</p>
        <p>Accuracy: {Math.round(accuracy)}%</p>
        <button onClick={onRestart}>RESTART</button>
      </div>
    );
  }

  export default StatsUI;
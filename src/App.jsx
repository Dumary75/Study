import Player from './components/Player.jsx';
import Challenge from './components/Challenge.jsx';

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
          <Challenge titel={'Easy'} timelimit={1}/>
          <Challenge titel={'Medium'} timelimit={5}/>
          <Challenge titel={'Pro'} timelimit={10}/>
          <Challenge titel={'Maximum'} timelimit={15}/>
      </div>
    </>
  );
}

export default App;

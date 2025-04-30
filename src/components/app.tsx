import MainPage from '../pages/main-page/main-page';

type AppScreenProps = {
  offersCount: number;
}

function App ({offersCount}: AppScreenProps) {
  return (
    <MainPage offersCount={offersCount}/>
  );
}

export default App;

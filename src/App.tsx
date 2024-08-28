import "./styles/App.scss";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Grid from "./components/grid";
import useTheme from "./hooks/theme/useTheme";

function App() {
  useTheme();

  return (
    <>
      <Header />
      <Sidebar />
      <Grid />
    </>
  );
}

export default App;

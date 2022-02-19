import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Terrain from './components/Terrain';
import Plateau from './domain/Plateau';
import Orientation from './domain/Orientation';
import Rover from './domain/Rover';

const DEFAULT_WIDTH = 5
const DEFAULT_HEIGHT = 5

const App = () => {
  let plateau = new Plateau(DEFAULT_WIDTH, DEFAULT_HEIGHT);

    // SAMPLE ONLY TO TEST TERRAIN ROVER INDICATOR
    const name = "Mars Rover";
    const landing = { position: {x: 0, y:0}, orientation: Orientation.N };
    const marsRover = new Rover(name, landing, []);
    marsRover.landOn(plateau);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
            >
              Mars Rover Operation
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Terrain plateau={plateau} />
    </>
  );
}

export default App;

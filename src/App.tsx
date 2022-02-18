import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Terrain from './components/Terrain';

const DEFAULT_WIDTH = 5
const DEFAULT_HEIGHT = 5

const App = () => {
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
      <Terrain width={DEFAULT_WIDTH} height={DEFAULT_HEIGHT} />
    </>
  );
}

export default App;

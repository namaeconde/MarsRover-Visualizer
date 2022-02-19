import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Terrain from './components/Terrain';
import Plateau from './domain/Plateau';
import Orientation from './domain/Orientation';
import Instruction from './domain/Instruction';
import Rover from './domain/Rover';
import Typography from '@mui/material/Typography';

const DEFAULT_WIDTH = 5
const DEFAULT_HEIGHT = 5

const App = () => {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [plateau, setPlateau] = useState(new Plateau(DEFAULT_WIDTH, DEFAULT_HEIGHT));

    // SAMPLE ONLY TO TEST TERRAIN ROVER INDICATOR
    const name = "Mars Rover";
    const { L, R, M } = Instruction;
    const landing = { position: {x: 0, y:0}, orientation: Orientation.N };
    const marsRover = new Rover(name, landing, [R, M, L, M, R, M]);
    marsRover.landOn(plateau);
    marsRover.navigateOn(plateau);

  const handleWidthChange = (event: Event, newValue: number | number[]) => {
    setWidth(newValue as number);
    setPlateau(new Plateau(newValue as number, height));
  };

  const handleHeightChange = (event: Event, newValue: number | number[]) => {
    setHeight(newValue as number);
    setPlateau(new Plateau(width, newValue as number));
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ alignContent: "center", textAlign: "center", justifyContent: "center" }}>
            Mars Rover Operation
          </Toolbar>
          <Typography variant="subtitle1">Plateau Properties</Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="overline">Width</Typography>
            <Slider
              sx={{ mx: 1 }}
              defaultValue={DEFAULT_WIDTH}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={20}
              value={width}
              onChange={handleWidthChange}
            />
            <Typography variant="overline" sx={{ ml: 1 }}>Height</Typography>
            <Slider
              sx={{ mx: 1 }}
              defaultValue={DEFAULT_HEIGHT}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={20}
              value={height}
              onChange={handleHeightChange}
            />
          </Box>
        </Container>
      </AppBar>
      <Terrain plateau={plateau} />
    </>
  );
}

export default App;

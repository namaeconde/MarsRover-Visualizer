import { ChangeEvent, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Terrain from './components/Terrain';
import Plateau from './domain/Plateau';
import Orientation from './domain/Orientation';
import Rover from './domain/Rover';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Point from './domain/Point';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const DEFAULT_WIDTH = 5
const DEFAULT_HEIGHT = 5
const { N, S, E, W } = Orientation;

const App = () => {
  // Plateau Properties
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [plateau, setPlateau] = useState(new Plateau(DEFAULT_WIDTH, DEFAULT_HEIGHT));

  const handleWidthChange = (event: Event, newValue: number | number[]) => {
    setWidth(newValue as number);
    setPlateau(new Plateau(newValue as number, height));
    clearRoverInputs();
  };

  const handleHeightChange = (event: Event, newValue: number | number[]) => {
    setHeight(newValue as number);
    setPlateau(new Plateau(width, newValue as number));
    clearRoverInputs();
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  // Rover Landing Properties
  const [name, setName] = useState<string>('');
  const [xCoord, setXCoord] = useState<number>(0);
  const [yCoord, setYCoord] = useState<number>(0);
  const [orientation, setOrientation] = useState<Orientation>(N);
  const [landingCoordinates, setLandingCoordinates] = useState<Point>({x:0, y:0});
  const [instructions, setInstructions] = useState<string>('');
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newName = event.target.value || '';
    setName(newName);
  };
  const handleLandingXChange = (event: SelectChangeEvent<typeof xCoord>) => {
    let newXCoord = Number(event.target.value) || 0;
    setXCoord(newXCoord);
    setLandingCoordinates({x: newXCoord, y: landingCoordinates.y } as Point);
  };
  const handleLandingYChange = (event: SelectChangeEvent<typeof yCoord>) => {
    let newYCoord = Number(event.target.value) || 0;
    setYCoord(newYCoord);
    setLandingCoordinates({x: landingCoordinates.x, y: newYCoord } as Point);
  };
  const handleOrientationChange = (event: SelectChangeEvent<typeof orientation>) => {
    let newOrientation = event.target.value
    setOrientation(newOrientation as Orientation);
  };
  const handleInstructionsChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newInstructions = event.target.value || '';
    setInstructions(newInstructions);
  };

  const [errorMessage, setErrorMessage] = useState<string>("");
  const deployRover = () => {
    try {
      const landing = { position: landingCoordinates, orientation: orientation };
      const rover = new Rover(name, landing, []);
      rover.landOn(plateau);
      handleDialogClose();
      clearRoverInputs();
    } catch(error) {
      console.log((error as Error).message);
      setErrorMessage((error as Error).message)
      setAlertOpen(true);
    }
  }

  const clearRoverInputs = () => {
    setName('');
    setXCoord(0);
    setYCoord(0);
    setLandingCoordinates({x: 0, y: 0} as Point);
    setOrientation(N);
    setErrorMessage('');
  }

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
      <Tooltip title="Deploy rover">
        <Fab color="primary" sx={{ position: 'fixed', bottom: 20, right: 20 }} onClick={handleDialogOpen}>
          <NavigationIcon />
        </Fab>
      </Tooltip>
      <Dialog disableEscapeKeyDown open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Rover Landing Properties</DialogTitle>
        <DialogContent>
          <Box sx={{ width: '100%' }}>
            <Collapse in={alertOpen}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlertOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {errorMessage}
              </Alert>
            </Collapse>
          </Box>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', alignItems:"center" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField
                  label="Name"
                  value={name}
                  onChange={handleNameChange}
                />
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Orientation</InputLabel>
                <Select
                  value={orientation}
                  onChange={handleOrientationChange}
                  input={<OutlinedInput label="Orientation"/>}
                >
                  <MenuItem value={N}>{N}</MenuItem>
                  <MenuItem value={S}>{S}</MenuItem>
                  <MenuItem value={E}>{E}</MenuItem>
                  <MenuItem value={W}>{W}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', alignItems:"center" }}>
            <Typography>Coordinates</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>X</InputLabel>
              <Select
                value={xCoord}
                onChange={handleLandingXChange}
                input={<OutlinedInput label="X"/>}
              >
                {
                  new Array(plateau.width).fill(null).map((_, index) => {
                    return <MenuItem key={index} value={index}>{index}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Y</InputLabel>
              <Select
                value={yCoord}
                onChange={handleLandingYChange}
                input={<OutlinedInput label="Y"/>}
              >
                {
                  new Array(plateau.height).fill(null).map((_, index) => {
                    return <MenuItem key={index} value={index}>{index}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Box>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', alignItems:"center" }}>
            <FormControl sx={{ m: 1}} fullWidth>
                <TextField
                  label="Navigation Instructions"
                  value={instructions}
                  onChange={handleInstructionsChange}
                />
              </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" color="success" onClick={deployRover}>Deploy</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;

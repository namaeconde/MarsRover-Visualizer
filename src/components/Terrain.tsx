import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import brown from '@mui/material/colors/brown';
import NavigationIcon from '@mui/icons-material/Navigation';
import Point from '../domain/Point';
import Orientation from '../domain/Orientation';


const { N, S, E, W } = Orientation;

const transformNavigationIcon = (orientation: Orientation) => {
  switch(orientation) {
    case S:
      return "rotate(180deg)";
    case E:
      return "rotate(90deg)";
    case W:
      return "rotate(-90deg)";
    default:
      return "";
  }
}

const Terrain = ({ plateau }: any) => {
  const Block = ({ coordinates }: any) => {
    const { x, y } = coordinates
    const rover = plateau.getRoverAt({x: x, y: y} as Point);

    return (
      <Paper 
        sx={{
          m: 0.2,
          width: 30,
          height: 30,
          backgroundColor: brown[300],
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        elevation={3}
        square
      >
        { rover && <NavigationIcon sx={{ transform: transformNavigationIcon(rover.orientation as Orientation) }} /> }
      </Paper>
    )
  }

  const Row = ({ y }: any) => {
    return (
      <Box display="flex" sx={{ flexDirection: "row" }}>
        {
          new Array(plateau.width).fill(null).map((_, index) => {
            return <Block key={index} coordinates={{x: index, y: y}}/>
          })
        }
      </Box>
    )
  }

  return (
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        <Grid item xs={3}>
          <Box>
            {
              new Array(plateau.height).fill(null).map((_, index) => {
                return <Row key={index} y={index} />
              })
            }
          </Box>
        </Grid>
    </Grid>
  );
}

export default Terrain
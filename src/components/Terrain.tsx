import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import brown from '@mui/material/colors/brown';
import Rover from './Rover';

const Terrain = ({ plateau, rover }: any) => {

  const Block = ({ roverOrientation }: any) => {

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
        { roverOrientation && <Rover roverOrientation={roverOrientation}/> }
      </Paper>
    )
  }

  const Row = ({ y }: any) => {
    return (
      <Box display="flex" sx={{ flexDirection: "row" }}>
        {
          new Array(plateau.width).fill(null).map((_, index) => {
            const hasRover = index === rover?.position?.x && y === rover?.position?.y
            return <Block key={index} 
                    roverOrientation={ hasRover ? rover.orientation : null }
                    />
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
                return <Row key={index} y={plateau.height - index -1} />
              })
            }
          </Box>
        </Grid>
    </Grid>
  );
}

export default Terrain
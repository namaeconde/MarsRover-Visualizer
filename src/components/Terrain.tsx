import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import brown from '@mui/material/colors/brown';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import Point from '../domain/Point';

const Terrain = ({ plateau }: any) => {
  const Block = ({ coordinates }: any) => {
    const { x, y } = coordinates

    return (
      <Paper 
        sx={{
          m: 0.2,
          width: 30,
          height: 30,
          backgroundColor: brown[500],
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        elevation={3}
        square
      >
        { plateau.hasRoverAt({x: x, y: y} as Point) && <ElectricCarIcon /> }
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
        style={{ minHeight: '85vh' }}
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
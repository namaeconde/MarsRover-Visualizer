import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import brown from '@mui/material/colors/brown';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import { Plateau } from '../domain/Plateau';

const Terrain = (plateau: Plateau) => {
  const Block = ({ hasRover }: any) => {
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
        {
          hasRover && <ElectricCarIcon />
        }  
      </Paper>
    )
  }

  const Row = () => {
    return (
      <Box display="flex" sx={{ flexDirection: "row" }}>
        {
          new Array(plateau.width).fill(null).map(() => {
            return <Block />
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
        style={{ minHeight: '90vh' }}
      >
        <Grid item xs={3}>
          <Box>
            {
              new Array(plateau.height).fill(null).map(() => {
                return <Row />
              })
            }
          </Box>
        </Grid>
    </Grid>
  );
}

export default Terrain
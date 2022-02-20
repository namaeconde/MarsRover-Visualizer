import { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import brown from '@mui/material/colors/brown';
import NavigationIcon from '@mui/icons-material/Navigation';
import Orientation from '../domain/Orientation';
import { Transition } from 'react-transition-group';

const { N, S, E, W } = Orientation;
const NAVICON_DEFAULT_ORIENTATION = "rotate(0deg)"

const transformNavigationIcon = (orientation: Orientation) => {
  switch(orientation) {
    case S:
      return "rotate(180deg)";
    case E:
      return "rotate(90deg)";
    case W:
      return "rotate(-90deg)";
    case N:
    default:
      return "rotate(0deg)";
  }
}

const Terrain = ({ plateau, rover }: any) => {

  const Block = ({ roverOrientation }: any) => {
    const nodeRef = useRef(null);

    const [animate, setAnimate] = useState(false);

    const duration = 2000;
    const navIconOrientation = transformNavigationIcon(roverOrientation)
    const defaultStyle = {
      transition: `transform ${duration}ms ease-in-out`,
      transform: NAVICON_DEFAULT_ORIENTATION,
    }

    const transitionStyles = {
      entering: { transform: navIconOrientation },
      entered:  { transform: navIconOrientation },
      exiting:  { transform: NAVICON_DEFAULT_ORIENTATION },
      exited:  { transform: NAVICON_DEFAULT_ORIENTATION },
      unmounted: { transform: NAVICON_DEFAULT_ORIENTATION },
    };

    useEffect(() => {
      if (roverOrientation) {
        setAnimate(true);
      }
    }, [roverOrientation])

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
        { roverOrientation && 
          <Transition
            in={animate} 
            timeout={duration}
            nodeRef={nodeRef}
           >
            {
              state => (
                <NavigationIcon 
                  sx={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}
                  ref={nodeRef}
                />
              )
            }
          </Transition>
        }
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
import { useState, useEffect, useRef } from 'react';
import Orientation from '../domain/Orientation';
import NavigationIcon from '@mui/icons-material/Navigation';
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

const Rover = ({ roverOrientation }: any) => {
  const [animate, setAnimate] = useState(false);
  const nodeRef = useRef(null);
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
  )
}

export default Rover;
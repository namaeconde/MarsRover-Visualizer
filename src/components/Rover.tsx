import { useState, useEffect, useRef } from 'react';
import Orientation from '../domain/Orientation';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Transition } from 'react-transition-group';

const { N, S, E, W } = Orientation;

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

const Rover = ({ rover }: any) => {
  const [animate, setAnimate] = useState(false);
  const nodeRef = useRef(null);
  const duration = 1000;
  const roverOrientation = rover.orientation;
  const prevNavIconOrientation = transformNavigationIcon(rover.status.previous.orientation);
  const navIconOrientation = transformNavigationIcon(roverOrientation);
  const defaultStyle = {
    transition: `transform ${duration}ms ease-in-out`,
    transform: navIconOrientation,
  }

  const transitionStyles = {
    entering: { transform: navIconOrientation },
    entered:  { transform: navIconOrientation },
    exiting:  { transform: prevNavIconOrientation },
    exited:  { transform: prevNavIconOrientation },
    unmounted: { transform: prevNavIconOrientation },
  };

  useEffect(() => {
    if (prevNavIconOrientation && navIconOrientation) {
      setAnimate(true);
    }
  }, [prevNavIconOrientation, navIconOrientation])

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
/**
 * Plateau on mars in a rectangular shape.
 */
 import Rover from "./Rover";
 import Point from "./Point";

 class Plateau {
     width: number;
     height: number;
     rovers: Rover[];
 
     constructor(width: number, height: number) {
         if (width <= 0 || height <= 0) {
             throw new Error('Plateau width and height are invalid');
         }
 
         this.width = width;
         this.height = height;
         this.rovers = [];
     }
 
     hasRoverAt(position: Point): boolean {
         return this.rovers.some((rover) => {
             let roverPosition = rover.position;
             return position.x === roverPosition.x &&
                 position.y === roverPosition.y
         })
     }

     getRoverAt(position: Point): Rover {
      for (let rover of this.rovers) {
        let roverPosition = rover.position;
        if (position.x === roverPosition.x &&
          position.y === roverPosition.y) {
          return rover;
        }
      }
      return null as any;
     }
 }

 export default Plateau;
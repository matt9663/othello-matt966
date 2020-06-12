import GameContext from "../../context/GameContext";

const GameLogic = {
  // Functions

  // returns a new instance of the gameboard with caputured spaces
  flipSquares(board, coordinates) {
    const newBoard = [...board];

    const [x, y] = coordinates;
    const currColor = board[x][y].claim;
    let flips = [];
    let paths = directions.map((dir) =>
      this.getTilesInDirection(coordinates, dir, board)
    );
    paths.forEach((path) => {
      let captures = this.calculateFlips(path);
      if (captures.length) {
        flips.push(...captures);
      }
    });
    flips.forEach((flip) => {
      let x = flip[0];
      let y = flip[1];
      newBoard[x][y].claim = currColor;
    });
    return newBoard;
  },
  //get array of all tiles in any given direction from a starting point
  getTilesInDirection(position, direction, board) {
    const tiles = [];
    let x = position[0];
    let y = position[1];
    switch (direction) {
      case "up":
        for (y; y >= 0; y--) {
          tiles.push(board[x][y]);
        }
        break;
      case "down":
        for (y; y < board.length; y++) {
          tiles.push(board[x][y]);
        }
        break;
      case "left":
        for (x; x >= 0; x--) {
          tiles.push(board[x][y]);
        }
        break;
      case "right":
        for (x; x < board.length; x++) {
          tiles.push(board[x][y]);
        }
        break;
      case "up-left":
        while (x >= 0 && y >= 0) {
          tiles.push(board[x][y]);
          x--;
          y--;
        }
        break;
      case "up-right":
        while (x < board.length && y >= 0) {
          tiles.push(board[x][y]);
          x++;
          y--;
        }
        break;
      case "down-left":
        while (x >= 0 && y < board.length) {
          tiles.push(board[x][y]);
          x--;
          y++;
        }
        break;
      case "down-right":
        while (x < board.length && y < board.length) {
          tiles.push(board[x][y]);
          x++;
          y++;
        }
        break;
      default:
        break;
    }
    return tiles;
  },
  //takes an array of tiles in one direction and returns coordinates for tiles
  // that should be flipped
  calculateFlips(tiles) {
    let flipCoordinates = [];
    let currColor = tiles[0].claim;
    if (tiles.length <= 1) return flipCoordinates;
    if (tiles[1].claim === null || tiles[1].claim === currColor)
      return flipCoordinates;
    for (let i = 1; i < tiles.length; i++) {
      if (tiles[i].claim === currColor) {
        break;
      }
      if (tiles[i].claim !== null && tiles[1].claim !== currColor) {
        flipCoordinates.push(tiles[i].coordinates);
      }
      if (tiles[i].claim === null) {
        flipCoordinates = [];
      }
    }
    return flipCoordinates;
  },
  checkPossibleMoves(board, color) {
    let possibleMoves = [];
    let shadowBoard = board.slice();
    let opposingSquares = shadowBoard
      .map((row) => row.filter((row) => row.claim && row.claim !== color))
      .flat();
    // get coordinates of all open squares adjacent to an opposing square
    let potentials = opposingSquares.map((sq) => {
      return directions
        .map(
          (dir) => this.getTilesInDirection(sq.coordinates, dir, shadowBoard)[1]
        )
        .filter((space) => space.claim === null)
        .map((space) => space.coordinates);
    });
    let dedupedPotentials = [...new Set(potentials.flat())];
    for (let i = 0; i < dedupedPotentials.length; i++) {
      let flips = [];
      const testBoard = board.slice();
      const [x, y] = dedupedPotentials[i];
      testBoard[x][y].claim = color;
      let paths = directions.map((dir) =>
        this.getTilesInDirection([x, y], dir, testBoard)
      );
      paths.forEach((path) => {
        let captures = this.calculateFlips(path);
        if (captures.length) {
          flips.push(...captures);
        }
      });
      if (flips.length) {
        possibleMoves.push([x, y]);
      }
      testBoard[x][y].claim = null;
    }
    return possibleMoves;
  },
  getScore(board, playerOne, playerTwo) {
    let playerOneScore = 0;
    let playerTwoScore = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j].claim === playerOne) playerOneScore++;
        if (board[i][j].claim === playerTwo) playerTwoScore++;
      }
    }
    return [playerOneScore, playerTwoScore];
  },
};

// Constants

const directions = [
  "left",
  "right",
  "up",
  "down",
  "up-left",
  "up-right",
  "down-left",
  "down-right",
];

export default GameLogic;


angular.module('ngSnake', [])

  .controller('snakeCtrl', function($scope, $timeout) { 
    var RED = 1, BLACK = 2, MOVES = 0,
        boardWidth = 7, boardHeight = 6,
        tokenIndex = 0, IN_DROP = false;

    $scope.player = RED;

    $scope.newGame = function() {
      MOVES = 0, tokenIndex = 0;
      $scope.player = RED;
      $scope.board = [];
      for (var i = 0; i < boardWidth; i++) {
        $scope.board[i] = [];
        for (var j = 0; j < boardHeight; j++) {
          $scope.board[i][j] = 0;
        }
      }
    }
    $scope.newGame();

    $scope.setStyling = function(value) {
      if (value === RED)
        return {"backgroundColor": "#FF0000"};
      else if (value === BLACK)
        return {"backgroundColor":"#000000"};
      return {"backgroundColor": "white"};
    }

    $scope.placeToken = function(column) {
      if (!IN_DROP && $scope.board[column][0] === 0) {
        MOVES++;
        tokenIndex = 0;
        $scope.board[column][tokenIndex] = $scope.player;
        IN_DROP = true;
        dropToken(column, $scope.player);
        $scope.player = $scope.player === RED ? BLACK : RED;
      }
    }

    function dropToken(column, player) {
      if ($scope.board[column][tokenIndex+1] === 0) {
        $timeout(function() {
          $scope.board[column][tokenIndex] = 0;
          $scope.board[column][++tokenIndex] = player;
          dropToken(column, player);
        },75);
      } else {
        checkForWin(column, player);
        IN_DROP = false;
      }
    }

    function checkForWin(column, player) {
      var i = tokenIndex, in_a_row = 1;

      // Check Column Win
      while(i < boardHeight) {
        if ($scope.board[column][++i] === player) {
          if (++in_a_row === 4)
            return $timeout(function() {
              gameOver(player);
            },1);
        } else {
          break;
        }
      }

      // Check Row Win
      var i = column, j = column,
          in_a_row = 1;
      while (--i >= 0) {
        if ($scope.board[i][tokenIndex] === player) {
          in_a_row++;
        } else {
          break;
        }
        if (in_a_row >= 4) {
          return $timeout(function() {
            gameOver(player);
          },1);
        }
      }

      while (++j < boardWidth) {
        if ($scope.board[j][tokenIndex] === player) {
          in_a_row++;
        } else {
          break;
        }
        if (in_a_row >= 4) {
          return $timeout(function() {
            gameOver(player);
          },1);
        }
      }

      // Check Diaganol 1
      var i = column, j = column,
          ii = tokenIndex, jj = tokenIndex,
          in_a_row = 1;
      while (--i >= 0 && --ii >= 0) {
        if ($scope.board[i][ii] === player) {
          in_a_row++;
        } else {
          break;
        }
        if (in_a_row >= 4) {
          return $timeout(function() {
            gameOver(player);
          },1);
        }
      }
      while (++j < boardWidth && ++jj < boardHeight) {
        if ($scope.board[j][jj] === player) {
          in_a_row++;
        } else {
          break;
        }
        if (in_a_row >= 4) {
          return $timeout(function() {
            gameOver(player);
          },1);
        }
      }

      // Check Diaganol 2
      var checkI = true, checkJ = true,
          i = column, j = column,
          ii = tokenIndex, jj = tokenIndex,
          in_a_row = 1;
      while (--i >= 0 && ++ii < boardHeight) {
        if ($scope.board[i][ii] === player) {
          in_a_row++;
        } else {
          break;
        }
        if (in_a_row >= 4) {
          return $timeout(function() {
            gameOver(player);
          },1);
        }
      }
      while (++j < boardWidth && --jj >= 0) {
        if ($scope.board[j][jj] === player) {
          in_a_row++;
        } else {
          break;
        }
        if (in_a_row >= 4) {
          return $timeout(function() {
            gameOver(player);
          },1);
        }
      }

      if (MOVES === boardWidth * boardHeight)
        gameOver();
    }

    function gameOver(player) {
      if (player) {
        winner = player === RED ? "Red" : "Black";
        alert(winner + " wins!");
      } else {
        alert("Stalemate");
      }
    }

  });
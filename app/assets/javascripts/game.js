$(function() {

  function Board(size) {
    var $canvas = $('#game');
    var ctx = $canvas[0].getContext('2d');
    var width = $canvas.width();
    console.log("Width: ", width);
    var paWidth = width * 0.8;
    console.log("paWidth: ", paWidth);
    var paOrigin = width * 0.1;
    console.log("paOrigin: ", paOrigin);
    var rankOffset = paWidth / (size - 1);
    console.log("rankOffset: ", rankOffset);

    var kaya = new Image();
    kaya.src = '/assets/kaya.jpg';

    var player = 0;
    var playerToColor = {0 : 'black', 1 : 'white'};

    function endTurn() {
      player = (player + 1) % 2;
    }

    function onMouseMove(e) {
      //TODO:Add code for ghosting here.
      //console.log(boardToCoord(e.offsetX));
    }

    function onMouseClick(e) {
      var x = boardToCoord(e.offsetX);
      var y = boardToCoord(e.offsetY);
      if(x >= 0 && x < size && y >= 0 && y < size) {
        placeStone(x, y);
      } else {
        console.log('Tried placing stone out of bounds');
      }
    }

    function placeStone(x, y) {
      ctx.beginPath();
      ctx.fillStyle = playerToColor[player];
      ctx.strokeStyle = playerToColor[player];
      ctx.arc(coordToBoard(x), coordToBoard(y), 20, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();

      endTurn();
    }

    $canvas.mousemove(onMouseMove);
    $canvas.click(onMouseClick);

    this.draw = function() {
      console.log("Drawing board");
      var $kaya = $(kaya);

      if(!$kaya.prop('complete')) {
        console.log("not loaded yet");
        $kaya.load(this.draw);
        return;
      }

      console.log("Loaded. Time to draw the board");

      ctx.drawImage(kaya, 0, 0, width, width);

      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';

      for(var i = 0; i < size; i++) {
        ctx.moveTo(coordToBoard(0), coordToBoard(i));
        ctx.lineTo(coordToBoard(size - 1), coordToBoard(i));
      }

      for(var i = 0; i < size; i++) {
        ctx.moveTo(coordToBoard(i), coordToBoard(0));
        ctx.lineTo(coordToBoard(i), coordToBoard(size -1));
      }

      if(size == 9) { 
        drawStarPoint(2,2);
        drawStarPoint(2,6);
        drawStarPoint(6,2);
        drawStarPoint(6,6);
        drawStarPoint(4,4);
      }

      ctx.stroke();
    };

    function drawStarPoint(x, y) {
        ctx.moveTo(coordToBoard(x), coordToBoard(y));
        ctx.arc(coordToBoard(x), coordToBoard(y), 4, 0, 2 * Math.PI, false);
    }

    function coordToBoard(coord) {
      return coord * rankOffset + paOrigin;
    };

    function boardToCoord(board) {
      return Math.floor( ((board - paOrigin) / rankOffset) + 0.5 );
    }
  }

  
  window.board = new Board(9);
  window.board.draw();
});

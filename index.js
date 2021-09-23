const canvas = document.getElementById("canvas")
const  context = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasWidth = canvas.width
let canvasHeight = canvas.height
let mouse = { x:0, y:0}
let draw = false
let coords = {
  x:[],
  y:[]
}

const resizeCanvas = () => {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas, false)

const findMin = (array) => {
  let min = array[0]
  let index = 0
  for(let i=1;i<array.length;i++)
    if (array[i]<min){
      min = array[i]
      index = i
    }
  return [min, index]
}

const findMax = (array) => {
  let max = array[0]
  let index = 0
  for(let i=1;i<array.length;i++)
    if (array[i]>max){
      max = array[i]
      index = i
    }
  return [max, index]
}

const drawPoints = (coords) => {
  const arrayX = coords.x
  const arrayY = coords.y
  const [minX,minXIndex] = findMin(arrayX)
  const minXObj = {
    x:minX,
    y:arrayY[minXIndex]
  }
  const [minY,minYIndex] = findMin(arrayY)
  const minYObj = {
    x:arrayX[minYIndex],
    y:minY
  }
  const [maxX,maxXindex] = findMax(arrayX)
  const maxXObj = {
    x:maxX,
    y:arrayY[maxXindex]
  }
  const [maxY,maxYindex] = findMax(arrayY)
  const maxYObj = {
    x:arrayX[maxYindex],
    y:maxY
  }
  const xCenter = (maxXObj.x + minXObj.x) / 2
  const yCenter = (maxYObj.y + minYObj.y) / 2
  const diffXMin = Math.abs(xCenter - minXObj.x)
  const diffXMax = Math.abs(xCenter - maxXObj.x)
  const diffYMin = Math.abs(yCenter - minYObj.y)
  const diffYMax = Math.abs(yCenter - maxYObj.y)
  const xRadius = diffXMin > diffXMax ? diffXMin : diffXMax
  const yRadius = diffYMin > diffYMax ? diffYMin : diffYMax
  context.beginPath();
  context.ellipse(xCenter, yCenter, xRadius, yRadius, 0, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();
}

canvas.addEventListener("mousedown", function(e){
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    draw = true;
    context.beginPath();
    context.moveTo(mouse.x, mouse.y);
});

canvas.addEventListener("mousemove", function(e){
    if(draw==true){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        context.lineTo(mouse.x, mouse.y);
        context.stroke();
        const obj = {
          x:mouse.x,
          y:mouse.y
        }
        coords.x.push(mouse.x)
        coords.y.push(mouse.y)
    }
});

canvas.addEventListener("mouseup", function(e){
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    context.lineTo(mouse.x, mouse.y);
    context.stroke();
    context.closePath();
    draw = false;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    drawPoints(coords)
    coords = {
      x:[],
      y:[]
    }
});

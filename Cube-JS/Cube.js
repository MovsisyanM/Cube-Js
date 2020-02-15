let posOfCube = [500, 500];

// account for position of cube
const formXYtoPixels = (x, y) => 
{
    return [x + posOfCube[0], -y + posOfCube[1]];
}

const Cube = (Size, airResistance, color, context) => {
    const cube = {
        Qx: Math.PI/4,
        Qy: Math.PI/3,
        Qz: Math.PI/4,
        dx: 0, // delta x
        dy: 0, // delta y
        dz: 0, // delta z
        color: color,
        airResistance: airResistance,
        Size: Size,
        vertices: 
        [
            [Size, Size, Size],
            [Size, Size, -1 * Size],
            [Size, -1 * Size, -1 * Size],
            [Size, -1 * Size, Size],
            [-1 * Size, -1 * Size, Size],
            [-1 * Size, -1 * Size, -1 * Size],
            [-1 * Size, Size, -1 * Size],
            [-1 * Size, Size, Size]
        ],
        SetSize:(size) => {
            cube.vertices = 
            [
                [size, size, size],
                [size, size, -1 * size],
                [size, -1 * size, -1 * size],
                [size, -1 * size, size],
                [-1 * size, -1 * size, size],
                [-1 * size, -1 * size, -1 * size],
                [-1 * size, size, -1 * size],
                [-1 * size, size, size]
            ];
            cube.Size = size;
        },
        SetColor: (color) => 
        {
            cube.color = color;
        },
        project: (x, y, z) => 
        {
            // x rotation
            let xRotQz = x * Math.cos(cube.Qz) + y * Math.sin(cube.Qz);

            // y rotation
            let yRotQz = y * Math.cos(cube.Qz) - x * Math.sin(cube.Qz);

            // z rotation
            let zRotQz = z;

            // x 
            let xRotQzQx = xRotQz;

            // y
            let yRotQzQx = yRotQz * Math.cos(cube.Qx) + zRotQz * Math.sin(cube.Qx);

            // z
            let zRotQzQx = zRotQz * Math.cos(cube.Qx) - yRotQz * Math.sin(cube.Qx);

            //x
            let xRotQzQxQy = xRotQzQx * Math.cos(cube.Qy) + zRotQzQx * Math.sin(cube.Qy);

            //y
            let yRotQzQxQy = yRotQzQx;

            return [xRotQzQxQy, yRotQzQxQy];
        },
        draw: () => 
        {
            cube.context.fillStyle = cube.color;
            cube.context.strokeStyle = cube.color;
            var verticesPixLoc = [];
            for(let i = 0; i < cube.vertices.length; i++)
            {
                // locations
                let xyLoc = cube.project(cube.vertices[i][0], cube.vertices[i][1], cube.vertices[i][2]);
                let pixLoc = formXYtoPixels(xyLoc[0], xyLoc[1]);
                verticesPixLoc.push(pixLoc);
                cube.context.beginPath();
                cube.context.arc(pixLoc[0], pixLoc[1], 5, 0, 2 * Math.PI, false);
                cube.context.fill();
                cube.context.stroke();
            }


            // #region Edges

            cube.context.strokeStyle = cube.color;
            // 0 to 1
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[0][0], verticesPixLoc[0][1]);
            cube.context.lineTo(verticesPixLoc[1][0], verticesPixLoc[1][1]);
            cube.context.stroke();
            cube.context.fill()

            // 0 to 3
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[0][0], verticesPixLoc[0][1]);
            cube.context.lineTo(verticesPixLoc[3][0], verticesPixLoc[3][1]);
            cube.context.stroke();

            // 0 to 7
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[0][0], verticesPixLoc[0][1]);
            cube.context.lineTo(verticesPixLoc[7][0], verticesPixLoc[7][1]);
            cube.context.stroke();

            // 1 to 2
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[1][0], verticesPixLoc[1][1]);
            cube.context.lineTo(verticesPixLoc[2][0], verticesPixLoc[2][1]);
            cube.context.stroke();

            // 1 to 6
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[1][0], verticesPixLoc[1][1]);
            cube.context.lineTo(verticesPixLoc[6][0], verticesPixLoc[6][1]);
            cube.context.stroke();

            // 2 to 3
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[2][0], verticesPixLoc[2][1]);
            cube.context.lineTo(verticesPixLoc[3][0], verticesPixLoc[3][1]);
            cube.context.stroke();

            // 2 to 5
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[2][0], verticesPixLoc[2][1]);
            cube.context.lineTo(verticesPixLoc[5][0], verticesPixLoc[5][1]);
            cube.context.stroke();

            // 3 to 4
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[3][0], verticesPixLoc[3][1]);
            cube.context.lineTo(verticesPixLoc[4][0], verticesPixLoc[4][1]);
            cube.context.stroke();

            // 4 to 7
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[4][0], verticesPixLoc[4][1]);
            cube.context.lineTo(verticesPixLoc[7][0], verticesPixLoc[7][1]);
            cube.context.stroke();

            // 4 to 5
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[4][0], verticesPixLoc[4][1]);
            cube.context.lineTo(verticesPixLoc[5][0], verticesPixLoc[5][1]);
            cube.context.stroke();

            // 6 to 7
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[6][0], verticesPixLoc[6][1]);
            cube.context.lineTo(verticesPixLoc[7][0], verticesPixLoc[7][1]);
            cube.context.stroke();

            // 6 to 5
            cube.context.beginPath();
            cube.context.moveTo(verticesPixLoc[6][0], verticesPixLoc[6][1]);
            cube.context.lineTo(verticesPixLoc[5][0], verticesPixLoc[5][1]);
            cube.context.stroke();

            //#endregion Edges
        },
        update: () => {
            cube.dx = t = cube.airResistance * cube.dx;
            cube.Qx += cube.dx;
            cube.dy = cube.airResistance * cube.dy;
            cube.Qy += cube.dy;
            cube.dz = cube.airResistance * cube.dz;
            cube.Qz += cube.dz;
            cube.draw();
        }
    }

    return cube;
}
const fs = require('fs');

const rs = fs.createReadStream('./lorem.txt', {encodeing: 'utf8'});

const ws = fs.createWriteStream('./new-lorem.txt');

rs.pipe(ws);

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// })
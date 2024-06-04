import fs from 'fs';
import path from 'path';
// import {fileURLToPath} from 'url'

const getVideoDetail = async (req, res) => {
  // const getHowManyVideos = path.join('D:/Download/react_chai')
  const read = await fs.readdirSync('D:/Download/react_chai');
  res.status(200).json(read)
}

const privateControl = (req, res) => {
    let file = req.params
    // console.log(file.videoName)

  // res.status(200).json(req.params)
    const videoPath  = path.join('D:/Download/react_chai', file.videoName);
    // const __dirname = path.dirname(__filename);

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    // console.log("File Size: ", fileSize)
    const range = req.headers.range;
    if(range){
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        // console.log("chunk Size: ", start-end/fileSize)

        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
        
    }
    else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
    }
}


export {privateControl, getVideoDetail}



export default function handler(req, res) {
    const shaFull = require('child_process').execSync(`git rev-parse HEAD`).toString().trim();
   
    switch (req.method) {
      case "GET":{
        res.send(shaFull);
    }
        return;
      default:
        return res.status(405).end(`Method ${req.method} Not allowed`);
    }
}
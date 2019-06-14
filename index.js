const AWS = require('aws-sdk');
const fs = require('fs');
const config = require('./config');

AWS.config.update(config);
const rekognition = new AWS.Rekognition();
for (let i = 1; i < 5; i++) {
  const sourceData = fs.readFileSync('./img/source.jpg');
  const source = new Buffer.from(sourceData, 'base64');
  
  const targetData = fs.readFileSync(`./img/target${i}.jpg`);
  const target = new Buffer.from(targetData, 'base64');
  
  const params = {
    SimilarityThreshold: 90,
    SourceImage: {
      Bytes: source
    },
    TargetImage: {
      Bytes: target
    }
  };
  rekognition.compareFaces(params, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      if (res.FaceMatches.length > 0) {
        if (res.FaceMatches[0].Similarity >= 92) {
          console.log("target", i, "matched!!");
        }
      }
    }
  });
}
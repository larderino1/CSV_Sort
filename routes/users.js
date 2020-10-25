let express = require('express');
let router = express.Router();
let fs = require('fs');
let arr,marks = [];

/* GET users listing. */
router.get('/', function(req, res, next) {

  let tmp = [];

  let stringData = reafFile();

  arr = stringData.split('\n');
  let headers = arr[0].split(';');

  marks = getSudensMarks(arr, headers, tmp);

  res.render('partial/users', {
    marks:marks
  });
});

router.get('/asc', function(req, res, next) {
  marks.sort((a, b) => {return b.average - a.average});
  res.render('partial/users', {
    marks:marks
  });
});

router.get('/desc', function(req, res, next) {
  marks.sort((a,b) => {return a.average - b.average});
  res.render('partial/users', {
    marks:marks
  });
});

function reafFile(){
  let data = fs.readFileSync('students.csv');
  return data.toString();
}

function getSudensMarks(arr1, arr2, obj){
  for(let i = 1; i < arr1.length; i++){
    let data = arr1[i].split(';');
    let tmp = {};
    tmp[arr2[0]] = data[0];

    let average = 0;

    for(let j = 1; j < data.length; j++){
      tmp[arr2[j]] = data[j];
      average += parseFloat(data[j]);
    }
    tmp['average'] = (average/(data.length-1)).toFixed(2);
    obj.push(tmp);
  }
  return obj;
}

module.exports = router;

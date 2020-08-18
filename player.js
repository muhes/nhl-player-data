const main = require('./nhl')

const queryActivePlayersByPoints = (objectData, points, goals) => {
    Object.keys(objectData).forEach(function(key) {
        var val = objectData[key];
        if (val['career_high'] > points && val['career_high_goals'] > goals && val['2018'] != undefined) {
            console.log(val)
        }
      });
}

const querySeason = (objectData,season, points) =>{
    Object.keys(objectData).forEach(function(key) {
        var val = objectData[key];
        if (val[season] != undefined && val[season]['points'] > points) {
            console.log(val)
        }
      });
}

main()
.then((playerData)=>{
console.log("success")
//console.log(playerData)
//queryActivePlayersByPoints(playerData,90,50)
querySeason(playerData, '2018', 80)
})
.catch(()=>{
    console.log(error)
})


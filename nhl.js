const fs = require('fs');
//csvconst xml2js = require('xml2js');
const csv = require('csv-parser');
var count = 0
var playerData = {};
async function readCSV(){
  var done = false
 const file = fs.createReadStream(fileName)
    const csvFile = file.pipe(csv())
    .on('data', (row) => {
        var playerName  = row['Player']
        var pid = row[""]
        var thisSeason = row['Season']
        //console.log(pid)
        try{
            var goals = +row['G']
            var points = +row['PTS']
            var assists = +row['A']
            var age = +row['Age']
            var gp = +row['GP']
            const sATOI = row['ATOI']
            const split = sATOI.split(':')
            
            const min = parseInt(split[0])
            
            const sec = parseFloat(split[1])
            const str = '' + min +'.' +  sec
            
            const num = parseFloat(str)
            //console.log(num)
            var atoi = num
            //console.log(split[0],split[1], sATOI, atoi)
           
        }
        catch(error){
            console.log(error)
        }
      if (count < 10000 && playerName !== 'Sebastian Aho') {
        let player = {goals:goals, points:points, assists: assists, age:age, gp:gp, atoi:atoi, name: playerName,
        season:thisSeason}
        addPlayerData(player, playerData)
      }
      
    })
    var end = new Promise(function(resolve, reject) {
      csvFile.on('end',resolve);
      file.on('error', reject);
});
    /*
    .on('end', () => {
        console.log('CSV file successfully processed');
        //console.log(playerData['Nazem Kadri'])
        //console.log(playerData['Nazem Kadri']['2010']['points'], typeof(playerData['Nazem Kadri']['2010']['points']))
        const jsonString = JSON.stringify(playerData)
        var done = true
        fs.writeFile('player.json', jsonString, err => {
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
  })
        
      })
      */
    
     //(async function() {
      let sha1sum = await end;
      return playerData
  //}());
}

var addPlayerData = (player, playerData) => {
  let season = {}
  season = {
    points:player.points, goals:player.goals, assists: player.assists, age: player.age, atoi: player.atoi,gp: player.gp 
  }
  //console.log(([playerData][playerName]))
    if ((playerData[player.name]) === undefined ){
    playerData[player.name] ={
      name:player.name,[player['season']] :season, career_high: player.points, career_high_goals: player.goals
      , career_points:player.points, career_goals: player.goals
    };
    //playerData[playerName][season] = {[row['Season']] : season}
    
    } 
    else {
      //console.log(playerData[playerName])
      if (player.points > playerData[player.name]['career_high']){ playerData[player.name]['career_high'] = player.points}
      if (player.goals > playerData[player.name]['career_high_goals']){ playerData[player.name]['career_high_goals'] = player.goals}
      if (!Number.isNaN(player.points)){playerData[player.name]['career_points'] += player.points}
      if (!Number.isNaN(player.goals)){playerData[player.name]['career_goals'] += player.goals}
      let nextSeason = {[player['season']]: {
        points:player.points, goals:player.goals, assists: player.assists, age: player.age, atoi: player.atoi, gp: player.gp
      }}
      const ret = Object.assign(playerData[player.name], nextSeason)
    //[playerData][playerData]['new'] = {points:row['PTS'], goals:row['G'], assists: row['A'] }
    }
};


fileName ='skater_stats.csv'
async function main() {
const s = await readCSV(fileName)
/*
.then((pd) => {
  console.log(pd)
  console.log(pd['Nazem Kadri'])
})
.catch(error => console.log(error))
}
*/
console.log(playerData['Nazem Kadri'])
}
  
main()
const fs = require('fs');
const xml2js = require('xml2js');
const csv = require('csv-parser');
var count = 0
var playerData = {};
async function readCSV(){
 fs.createReadStream(fileName)
    .pipe(csv())
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
        addPlayerData(player)
        /*
      var season = {}
      season = {points:points, goals:goals, assists: assists, age: age, atoi: atoi,gp: gp }
      //console.log(([playerData][playerName]))
        if ((playerData[playerName]) === undefined ){
        playerData[playerName] ={
          name:playerName,[row['Season']] :season, career_high: points, career_high_goals: goals, career_points:points,
          career_goals: goals
        };
        //playerData[playerName][season] = {[row['Season']] : season}
        
        } 
        else {
          //console.log(playerData[playerName])
          if (points > playerData[playerName]['career_high']){ playerData[playerName]['career_high'] = points}
          if (goals > playerData[playerName]['career_high_goals']){ playerData[playerName]['career_high_goals'] = goals}
          if (!Number.isNaN(points)){playerData[playerName]['career_points'] += points}
          if (!Number.isNaN(goals)){playerData[playerName]['career_goals'] += goals}
          let S = {[row['Season']]: {
            points:points, goals:goals, assists: assists, age: age, atoi: atoi, gp: gp
          }}
          const ret = Object.assign(playerData[playerName], S)
        //[playerData][playerData]['new'] = {points:row['PTS'], goals:row['G'], assists: row['A'] }
        }
     // console.log(playerData[playerName])
      count ++
      */
      //console.log(count)
      }
      
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      console.log(playerData['Nazem Kadri'])
      console.log(playerData['Nazem Kadri']['2010']['points'], typeof(playerData['Nazem Kadri']['2010']['points']))
      return playerData
    });
}

var addPlayerData = (player) => {
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
const pd = await readCSV(fileName)
console.log(pd)
console.log(playerData['Nazem Kadri'])
}
  
main()
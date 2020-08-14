const Papa =  require('papaparse');
file = 'skater_stats.csv'
Papa.parse(file, {
    complete: function(results) {
        const data = results.data
        
        //console.log(results.data[1]);
        console.log("Finished:", results);
    }
})
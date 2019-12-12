const TeemoJS = require('teemojs');
const tiers = require('./tiers.json');
const leagues = require('./leagues.json');

let api = TeemoJS('RGAPI-ed002082-d8eb-47a9-8621-e4f4c2f30e19', {
    "maxConcurrent": 20
});

let getSummonerLeagues = (message, type = 'normal') => {
    return new Promise((resolve, reject) => {
    summoner = [...message];
    summoner.shift()
    summoner = summoner.join('');
    api.get('tr1', 'summoner.getBySummonerName', summoner)
        .then(({
            id
        }) => {
            api.get('tr1', type == 'tft' ? 'tftLeague.getLeagueEntriesForSummoner' : 'league.getLeagueEntriesForSummoner', id)
                .then(leagueData => {
                    console.log(leagueData);
                    if (leagueData.length > 0) {
                        resolve(leagueData.map((league, i) => {
                            //Lig: ALTIN II Lig Puanı: 63 Zafer Sayısı: 139 Bozgun Sayısı: 114
                            let {
                                queueType,
                                wins,
                                losses,
                                leaguePoints,
                                tier,
                                rank
                            } = league;

                            return (`${type != 'tft' ? leagues[queueType] : ''} 
    Lig: ${tiers[tier]} ${rank} Lig Puanı: ${leaguePoints} Zafer Sayısı: ${wins} Bozgun Sayısı: ${losses}`)
                        }).join("\r\n"))
                    } else {
                        resolve("bronzu bırak demir bile değil");
                    }
                })
        })
    })
}

module.exports = {
    getSummonerLeagues
};
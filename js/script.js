      var inputIn = document.querySelector('.input-in');
      let search = document.querySelector('.search');
      search.onclick = function (){
          getPlayer();
          id = 'none';
      }

      document.addEventListener( 'keyup', event => {
      if( event.code === 'Enter' ) 
        getPlayer();
      });






    function getPlayer() {
    var url = 'https://api.vimeworld.ru/user/name/' + inputIn.value;
    fetch(url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
//          GiveID2(json[0].id)
          GiveID(json[0].id)
          GiveMore(json[0].username, json[0].level, json[0].levelPercentage, json[0].rank)
          GiveGuild(json[0].guild, json[0].guild.name, json[0].guild.id, json[0].guild.avatar_url)
        });
      }
    });
  }


    function GiveID(id) {
    document.querySelector('#id').innerHTML = id;
    var playerid = id;
    console.log(playerid);
    var url = 'https://api.vimeworld.ru/user/' + playerid + '/stats';
    fetch(url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
          BW(json.stats.BW.global.kills, json.stats.BW.global.deaths, json.stats.BW.global.games, json.stats.BW.global.wins, json.stats.BW.global.bedBreaked, json.stats.BW.season.monthly.kills, json.stats.BW.season.monthly.deaths, json.stats.BW.season.monthly.games, json.stats.BW.season.monthly.wins, json.stats.BW.season.monthly.bedBreaked)
          SW(json.stats.SW.global.kills, json.stats.SW.global.deaths, json.stats.SW.global.games, json.stats.SW.global.wins, json.stats.SW.global.winStreak, json.stats.SW.season.monthly.kills, json.stats.SW.season.monthly.deaths, json.stats.SW.season.monthly.games, json.stats.SW.season.monthly.wins, json.stats.SW.season.monthly.winStreak)
          CP(json.stats.CP.global.kills, json.stats.CP.global.deaths, json.stats.CP.global.games, json.stats.CP.global.wins, json.stats.CP.global.resourcePointsBreaked)
          Bridge(json.stats.BRIDGE.global.games, json.stats.BRIDGE.global.wins, json.stats.BRIDGE.global.kills, json.stats.BRIDGE.global.deaths, json.stats.BRIDGE.global.points)
        });
      }
    });
    }
    
    function GiveMore(username, level, levelPercentage, rank) {
      document.querySelector('#nick').innerHTML = username;
      document.querySelector('#lvl').innerHTML = level;
      document.querySelector('#rank').innerHTML = rank;
      var colorR = document.querySelector('#rank');
      if (rank == 'PLAYER') {colorR.style.color = '#1266F1';}
      if (rank == 'VIP') {colorR.style.color = '#00B74A';}
      if (rank == 'PREMIUM') {colorR.style.color = '#39C0ED';}
      if (rank == 'HOLY') {colorR.style.color = '##FFA900';}
      if (rank == 'IMMORTAL') {colorR.style.color = '#B23CFD';}
      if (rank == 'BUILDER' || rank == 'SRBUILDER' || rank == 'MAPLEAD') {colorR.style.color = '#00B74A';}
      if (rank == 'YOUTUBE') {colorR.style.color = '#D32F2F';}
      if (rank == 'DEV' || rank == 'ORGANIZER' || rank == 'ADMIN') {colorR.style.color = '#00BCD4';}
      if (rank == 'MODER' || rank == 'WARDEN' || rank == 'CHIEF') {colorR.style.color = '#304FFE';}
      var elementg = document.querySelector('.guild');
        elementg.style.visibility = 'hidden';
      var barr = (levelPercentage*100) + '%';
      var pbar = document.querySelector('.progress-bar');
      pbar.style.width = barr;
      var progressLvl = levelPercentage*100;
      progressLvl_str=progressLvl.toFixed(1);
      document.querySelector('#progress').innerHTML = progressLvl_str + '%';
      Skin(username);
    }

   function GiveGuild(guild, name, id, avatar_url) {
      var elementg = document.querySelector('.guild');
      if(guild == "null") {
      }
      else {
        elementg.style.visibility = 'visible';
      }
      document.querySelector('#name').innerHTML = name;
      var gavatar = document.querySelector('#avatar_url');
      gavatar.setAttribute("src", avatar_url);
      gavatar.style.width = '32px';
      gavatar.style.height = '32px';
   }



    function Skin(username){
          var skk = document.querySelector('#skin');
          skk.setAttribute("src", 'http://skin.vimeworld.ru/helm/' + username + '/64.png');
          var skkkkk = 'url(https://skin.vimeworld.ru/raw/skin/' + username + '.png)';
            for (var i = 0; i < 71; i++) {
                var skin3d = document.querySelectorAll('.st3d')[i];

                skin3d.style.backgroundImage = skkkkk;
            }

//          var cppppp = 'url(https://skin.vimeworld.ru/raw/cape/' + username + '.png)';
//              for (var i = 0; i < 7; i++) {
//               var cape3d = document.querySelectorAll('.ct3d')[i];
//               cape3d.style.backgroundImage = cppppp;
//           }
          var skindw = document.querySelector('#skindownload');
          skindw.setAttribute("href", 'https://skin.vimeworld.ru/raw/skin/' + username + '.png');
          var capedw = document.querySelector('#capedownload');
          capedw.setAttribute("href", 'https://skin.vimeworld.ru/raw/cape/' + username + '.png');
    }

    function BW(kills, deaths, games, wins, bedBreaked, mkills, mdeaths, mgames, mwins, mbedBreaked) {
      var bwclassg = ['#bwkillsglobal', '#bwdeathsglobal', '#bwgamesglobal', '#bwwinsglobal', '#bwbedBreakedglobal', '#bwkdglobal', '#bwgwglobal', '#bwkgglobal', '#bwdgglobal', '#bwbgglobal'];
      var bwg =  MatchG(kills, deaths, games, wins, bedBreaked);
      for (var i = 0; i < 10; i++) {
        if (bwg[i] == 'NaN') {bwg[i] = 0}
        if (bwg[i] == 'Infinity') {bwg[i] = '-'}
        document.querySelector(bwclassg[i]).innerHTML = bwg[i];
      }
      var bwclassm = ['#bwkillsmonthly', '#bwdeathsmonthly', '#bwgamesmonthly', '#bwwinsmonthly', '#bwbedBreakedmonthly', '#bwkdmonthly', '#bwgwmonthly', '#bwkgmonthly', '#bwdgmonthly', '#bwbgmonthly'];
      var bwm =  MatchM(mkills, mdeaths, mgames, mwins, mbedBreaked);
      for (var i = 0; i < 10; i++) {
        if (bwm[i] == 'NaN') {bwm[i] = 0}
        if (bwm[i] == 'Infinity') {bwm[i] = '-'}
        document.querySelector(bwclassm[i]).innerHTML = bwm[i];
      }

      var bwtab = ['#tabbwkd', '#tabbwgw', '#tabbwgm', '#tabbwdg', '#tabbwbg'];
      var arr = [];
      var tabbw = MatchTab(arr.concat(bwg, bwm));
      for (var i = 0; i < 5; i++) {
          document.querySelector(bwtab[i]).innerHTML = tabbw[i];
      }
    }

    function SW(kills, deaths, games, wins, winStreak, mkills, mdeaths, mgames, mwins, mwinStreak) {
      var swclass = ['#swkillsglobal', '#swdeathsglobal', '#swgamesglobal', '#swwinsglobal', '#swwinStreakglobal', '#swkdglobal', '#swgwglobal', '#swkgglobal', '#swdgglobal'];
      var swg = MatchG(kills, deaths, games, wins, winStreak);
      for (var i = 0; i < 9; i++) {
        if (swg[i] == 'NaN') {swg[i] = 0}
        if (swg[i] == 'Infinity') {swg[i] = '-'}
        document.querySelector(swclass[i]).innerHTML = swg[i];
      }
      var swclassm = ['#swkillsmonthly', '#swdeathsmonthly', '#swgamesmonthly', '#swwinsmonthly', '#swwinStreakmonthly', '#swkdmonthly', '#swgwmonthly', '#swkgmonthly', '#swdgmonthly'];
      var swm = MatchM(mkills, mdeaths, mgames, mwins, mwinStreak);
      for (var i = 0; i < 9; i++) {
        if (swm[i] == 'NaN') {swm[i] = 0}
        if (swm[i] == 'Infinity') {swm[i] = '-'}

        document.querySelector(swclassm[i]).innerHTML = swm[i];
      }
      var swtab = ['#tabswkd', '#tabswgw', '#tabswgm', '#tabswdg', '#tabswbg'];
      var arr = [];
      var tabsw = MatchTab(arr.concat(swg, swm));
      for (var i = 0; i < 4; i++) {
          document.querySelector(swtab[i]).innerHTML = tabsw[i];
      }
    }

    function CP(kills, deaths, games, wins, resourcePointsBreaked) {
      var cpclass = ['#cpkillsglobal', '#cpdeathsglobal', '#cpgamesglobal', '#cpwinsglobal', '#cpresourcePointsBreakedglobal', '#cpkdglobal', '#cpgwglobal', '#cpkgglobal', '#cpdgglobal', '#cppgglobal'];
      var cp = MatchG(kills, deaths, games, wins, resourcePointsBreaked);
      for (var i = 0; i < 10; i++) {
        if (cp[i] == 'NaN') {cp[i] = 0}
        if (cp[i] == 'Infinity') {cp[i] = '-'}
        document.querySelector(cpclass[i]).innerHTML = cp[i];
      }
    }
    function Bridge (games, wins, kills, deaths, points){
      var brclass = ['#brkills', '#brdeaths', '#brgames', '#brwins', '#brpoints', '#brkd', '#brgw', '#brkg', '#brdg', '#brpg'];
      var br = MatchG(kills, deaths, games, wins, points);
      for (var i = 0; i < 10; i++) {
        if (br[i] == 'NaN') {br[i] = 0}
        if (br[i] == 'Infinity') {br[i] = '-'}
        document.querySelector(brclass[i]).innerHTML = br[i];
      }
    }
    function MatchG(kills, deaths, games, wins, points, resourcePointsBreaked, winStreak, bedBreaked){
//      var draws = (games - wins) - deaths; // Ничьи
      var kd = (kills / deaths).toFixed(2);  // Убийсва\Смерти
      var gw = (wins / (games - wins)).toFixed(2); // Победы\Поражения
      var kg = (kills / games).toFixed(2);  // Среднее количество убийств за игру
      var dg = (deaths / games).toFixed(2); // Среднее количество смертей за игру
      var bg = (bedBreaked / games).toFixed(2); // Среднее количество сломаных кроватей за игру
      var pg = (resourcePointsBreaked / games).toFixed(2); // Среднее количество сломаных точек за игру
      var pg2 = (points / games).toFixed(2); // Среднее количество точек за игру
      if (bedBreaked != "NaN") {
        var matr = [kills, deaths, games, wins, bedBreaked, kd, gw, kg, dg, bg];
      }
      if (winStreak != "NaN") {
        var matr = [kills, deaths, games, wins, winStreak, kd, gw, kg, dg];
      }
      if (resourcePointsBreaked != "NaN") {
        var matr = [kills, deaths, games, wins, resourcePointsBreaked, kd, gw, kg, dg, pg];
      }
      if (points != "NaN") {
        var matr = [kills, deaths, games, wins, points, kd, gw, kg, dg, pg2];
      }      return matr;
    }
    function MatchM(mkills, mdeaths, mgames, mwins, mpoints, mresourcePointsBreaked, mwinStreak, mbedBreaked){
//      var draws = (games - wins) - deaths; // Ничьи
      var mkd = (mkills / mdeaths).toFixed(2);  // Убийсва\Смерти
      var mgw = (mwins / (mgames - mwins)).toFixed(2); // Победы\Поражения
      var mkg = (mkills / mgames).toFixed(2);  // Среднее количество убийств за игру
      var mdg = (mdeaths / mgames).toFixed(2); // Среднее количество смертей за игру
      var mbg = (mbedBreaked / mgames).toFixed(2); // Среднее количество сломаных кроватей за игру
      var mpg = (mresourcePointsBreaked / mgames).toFixed(2); // Среднее количество сломаных точек за игру
      var mpg2 = (mpoints / mgames).toFixed(2); // Среднее количество точек за игру
      if (mbedBreaked != "NaN") {
        var matr = [mkills, mdeaths, mgames, mwins, mbedBreaked, mkd, mgw, mkg, mdg, mbg];
      }
      if (mwinStreak != "NaN") {
        var matr = [mkills, mdeaths, mgames, mwins, mwinStreak, mkd, mgw, mkg, mdg];
      }
      if (mresourcePointsBreaked != "NaN") {
        var matr = [mkills, mdeaths, mgames, mwins, mresourcePointsBreaked, mkd, mgw, mkg, mdg, mpg];
      }
      if (mpoints != "NaN") {
        var matr = [mkills, mdeaths, mgames, mwins, mpoints, mkd, mgw, mkg, mdg, mpg2];
      }      return matr;
    }
    function MatchTab(tab2){
      var tab5 = [];
      for (var i = 0; i < 5; i++) {
        tab4 = ((tab2[i+15]-tab2[i+5])/tab2[i+5]*100).toFixed(1);
        if (tab4 < 0) { tab4 = '<span>' + tab4 + '% </span><span class="badge bg-danger rounded-pill"><i class="bi bi-caret-down-fill"></i></span>'; }
        if (tab4 > 0) { tab4 = '<span>' + tab4 + '% </span><span class="badge bg-success rounded-pill"><i class="bi bi-caret-up-fill"></i></span>'; }
        if (tab4 == 0) { tab4 = '<span>' + tab4 + '% </span><span class="badge bg-warning rounded-pill"><i class="bi bi-caret-right-fill"></i></span>'; }
        tab5[i] = tab4;
      }
      return tab5;
    }
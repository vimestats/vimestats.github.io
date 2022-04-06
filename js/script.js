      var inputIn = document.querySelector('.input-in');
      var search = document.querySelector('.search');

      var nbs0 = document.querySelector('.nick_bs0');
      var nbs1 = document.querySelector('.nick_bs1');
      var nbs2 = document.querySelector('.nick_bs2');
      var nbs3 = document.querySelector('.nick_bs3');
      var nbs4 = document.querySelector('.nick_bs4');
      var b = ['.nick_bs0', '.nick_bs1', '.nick_bs2', '.nick_bs3', '.nick_bs4'];
      var c = [localStorage.nick0, localStorage.nick1, localStorage.nick2, localStorage.nick3, localStorage.nick4];
      document.querySelector('.bm0').onclick = function (){
        localStorage.nick0 = inputIn.value; document.querySelector('.nick_bs0').innerHTML = localStorage.nick0; if (inputIn.value == 'undefined') { inputIn.value = ''; } Info();
      }
      document.querySelector('.bm1').onclick = function (){
        localStorage.nick1 = inputIn.value; document.querySelector('.nick_bs1').innerHTML = localStorage.nick1; Info();
      }
      document.querySelector('.bm2').onclick = function (){
        localStorage.nick2 = inputIn.value; document.querySelector('.nick_bs2').innerHTML = localStorage.nick2; Info();
      }
      document.querySelector('.bm3').onclick = function (){
        localStorage.nick3 = inputIn.value; document.querySelector('.nick_bs3').innerHTML = localStorage.nick3; Info();
      }
      document.querySelector('.bm4').onclick = function (){
        localStorage.nick4 = inputIn.value; document.querySelector('.nick_bs4').innerHTML = localStorage.nick4; Info();
      }
        for(var i = 0; i < 5; i++){
          console.log(c[i]);
          if( c[i] == null) { c[i] = 'Пусто'; }
          if( c[i] == undefined) { c[i] = 'Пусто'; }
          document.querySelector(b[i]).innerHTML = c[i];
        }
      nbs0.onclick = function (){ inputIn.value = localStorage.nick0; if (inputIn.value == 'undefined') { inputIn.value = ''; } getPlayer(); }
      nbs1.onclick = function (){ inputIn.value = localStorage.nick1; if (inputIn.value == 'undefined') { inputIn.value = ''; } getPlayer(); }
      nbs2.onclick = function (){ inputIn.value = localStorage.nick2; if (inputIn.value == 'undefined') { inputIn.value = ''; } getPlayer(); }
      nbs3.onclick = function (){ inputIn.value = localStorage.nick3; if (inputIn.value == 'undefined') { inputIn.value = ''; } getPlayer(); }
      nbs4.onclick = function (){ inputIn.value = localStorage.nick4; if (inputIn.value == 'undefined') { inputIn.value = ''; } getPlayer(); }

      function Info(){
          $.toast({
            heading: 'Готово',
            text: 'Ник сохранён',
            loader: false,
            position: 'bottom-right',
            class: 'bg-success text-white border-10',
            hideAfter: 2000,
            allowToastClose: true,
          });
      }

      search.onclick = function (){ getPlayer(); }
      document.addEventListener( 'keyup', event => { if( event.code === 'Enter' ) getPlayer(); });
      getOnline();
  function getPlayer() {
    var url = 'https://api.vimeworld.ru/user/name/' + inputIn.value;
    fetch(url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
          try { GiveID(json[0].id) }
          catch(err) {
          $.toast({
            heading: 'Ошибка',
            text: 'Неверный никнейм',
            loader: false,
            position: 'bottom-right',
            class: 'bg-danger text-white border-10',
            hideAfter: 2000,
            allowToastClose: true,
          });
          }
          try { GiveGuild(json[0].guild, json[0].guild.name, json[0].guild.id, json[0].guild.avatar_url) }
          catch(err) {}
          try { GiveMore(json[0].username, json[0].level, json[0].levelPercentage, json[0].rank) }
          catch(err) {}
        });
      }
    });
  }
  function getOnline() {
    var url = 'https://api.vimeworld.ru/online';
    fetch(url).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
          GiveOnline(json.total)
        });
      }
    });
  }

  setInterval(getOnline, 10000);

  function GiveOnline(online){
    document.querySelector('#online').innerHTML = online;
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
          BW(json.stats.BW.global, json.stats.BW.season.monthly)
          SW(json.stats.SW.global, json.stats.SW.season.monthly)
          CP(json.stats.CP.global, json.stats.CP.season.monthly)
          Bridge(json.stats.BRIDGE.global.games, json.stats.BRIDGE.global.wins, json.stats.BRIDGE.global.kills, json.stats.BRIDGE.global.deaths, json.stats.BRIDGE.global.points)
        });
      }
    });
    var url2 = 'https://api.vimeworld.ru/user/' + playerid + '/session';
    fetch(url2).then(function(response) {
      var contentType = response.headers.get("content-type");
      if(contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
          GiveSession(json.online.value)
        });
      }
    });
  }

  function GiveSession(online){
    var onl = document.querySelector('#session');
    if(online == true){
      document.querySelector('#session').innerHTML = 'Онлайн';
      onl.setAttribute("class", 'badge bg-success');
    }
    if(online == false){
      document.querySelector('#session').innerHTML = 'Оффлайн';
      onl.setAttribute("class", 'badge bg-danger');
    }
  }
    
    function GiveMore(username, level, levelPercentage, rank) {
      document.querySelector('#nick').innerHTML = username;
      document.querySelector('#lvl').innerHTML = level;
      document.querySelector('#rank').innerHTML = rank;
      var colorR = document.querySelector('#rank');
      if (rank == 'PLAYER') {colorR.style.color = '#1266F1';}
      if (rank == 'VIP') {colorR.style.color = '#00be00';}
      if (rank == 'PREMIUM') {colorR.style.color = '#00dada';}
      if (rank == 'HOLY') {colorR.style.color = '#ffba2d';}
      if (rank == 'IMMORTAL') {colorR.style.color = '#e800d5';}
      if (rank == 'BUILDER' || rank == 'SRBUILDER' || rank == 'MAPLEAD') {colorR.style.color = '#009c00';}
      if (rank == 'YOUTUBE') {colorR.style.color = '#fe3f3f';}
      if (rank == 'DEV' || rank == 'ORGANIZER' || rank == 'ADMIN') {colorR.style.color = '#00bebe';}
      if (rank == 'MODER' || rank == 'WARDEN' || rank == 'CHIEF') {colorR.style.color = '#1b00ff';}
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
      var guildd = new Image();
      guildd.src = avatar_url;
      guildd.onerror = function(){
        gavatar.setAttribute("src", 'https://vimeworld.ru/images/guild.png');
        gavatar.style.width = '32px';
        gavatar.style.height = '32px';
      }
      guildd.onload = function(){
        gavatar.setAttribute("src", avatar_url);
        gavatar.style.width = '32px';
        gavatar.style.height = '32px';
      }
   }
    function Skin(username){
          var skk = document.querySelector('#skin');
          var skk2 = document.querySelector('#skin-viewer');
          var skkkkk = 'https://skin.vimeworld.ru/raw/skin/' + username + '.png';
          var steve = 'https://raw.githubusercontent.com/MIUNO/vimestat/main/img/Steve.png';
          var helm = 'https://skin.vimeworld.ru/helm/' + username + '/64.png';
          skk.setAttribute("src", helm);
            var skin = new Image();
            skin.src = 'https://skin.vimeworld.ru/raw/skin/' + username + '.png';
                skin.onerror = function(){
                  var skinn = 'url(' + steve + ')';
                  var skin = steve;
                  SkinColor(skin);
                  SkinSet(skinn);
                }
                skin.onload = function(){
                  var skinn = 'url(' + skkkkk + ')';
                  var skin = skkkkk;
                  SkinColor(skin);
                  SkinSet(skinn);
                }
            var cppppp = 'url(https://skin.vimeworld.ru/raw/cape/' + username + '.png)';     
              var cape = new Image();     
              cape.src = 'https://skin.vimeworld.ru/raw/cape/' + username + '.png'; 
                cape.onload = function() {      
                var width = this.width;
                var hight = this.height;
                if (width == 64 && hight == 32){
                  skk2.setAttribute("class", 'mc-skin-viewer-9x legacy cape spin');
                }
                else {
                  skk2.setAttribute("class", 'mc-skin-viewer-9x legacy legacy-cape spin');
                }
              }        
              for (var i = 0; i < 7; i++) {
               var cape3d = document.querySelectorAll('.ct3d')[i];
               cape3d.style.backgroundImage = cppppp;
           }
          var skindw = document.querySelector('#skindownload');
          skindw.setAttribute("href", 'https://skin.vimeworld.ru/raw/skin/' + username + '.png');
          var capedw = document.querySelector('#capedownload');
          capedw.setAttribute("href", 'https://skin.vimeworld.ru/raw/cape/' + username + '.png');

            function SkinSet(skinn){
                for (var i = 0; i < 71; i++) {
                  var skin3d = document.querySelectorAll('.st3d')[i];
                  skin3d.style.backgroundImage = skinn;
                }
            }

            function SkinColor(skin){
            var imggg = document.createElement('img');
            imggg.setAttribute('src', skin)
            imggg.crossOrigin = "Anonymous";
            imggg.addEventListener('load', function() {
                var vibrant = new Vibrant(imggg, 2);
                var swatches = vibrant.swatches()
                var vvv = Object.values(swatches);
                var aaa = [];
                for (var i = 0; i < 6; i++) {
                    try {
                      aaa[i] = vvv[i].rgb;
                    }
                    catch(err){
                      if (vvv[i] == undefined) { delete aaa[i]; }
                    }
                }
                var nnn = Object.values(aaa);
                var color1 = nnn[0];
                var skincontainer = document.querySelector('.skin-container');
                skincontainer.style.backgroundColor =  'rgba(' + color1[0] + ', ' + color1[1] + ', ' + color1[2] + ', 0.5)';
            });
         }
    }

    function BW(Info1, Info2) {
      var bwclassg = ['#bwkillsglobal', '#bwdeathsglobal', '#bwgamesglobal', '#bwwinsglobal', '#bwbedBreakedglobal', '#bwkdglobal', '#bwgwglobal', '#bwkgglobal', '#bwdgglobal', '#bwbgglobal'];
      var bwg =  Match(Object.values(Info1));
      for (var i = 0; i < 10; i++) {
        if (bwg[i] == 'NaN') {bwg[i] = 0}
        if (bwg[i] == 'Infinity') {bwg[i] = '-'}
        document.querySelector(bwclassg[i]).innerHTML = bwg[i];
      }
      var bwclassm = ['#bwkillsmonthly', '#bwdeathsmonthly', '#bwgamesmonthly', '#bwwinsmonthly', '#bwbedBreakedmonthly', '#bwkdmonthly', '#bwgwmonthly', '#bwkgmonthly', '#bwdgmonthly', '#bwbgmonthly'];
      var bwm =  Match(Object.values(Info2));
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

    function SW(Info1, Info2) {
      var swclassg = ['#swkillsglobal', '#swdeathsglobal', '#swgamesglobal', '#swwinsglobal', '#swwinStreakglobal', '#swkdglobal', '#swgwglobal', '#swkgglobal', '#swdgglobal'];
      var sgg = Object.values(Info1);
      var swg = Match([sgg[2],sgg[3],sgg[1],sgg[0],sgg[8]]);
      for (var i = 0; i < 9; i++) {
        if (swg[i] == 'NaN') {swg[i] = 0}
        if (swg[i] == 'Infinity') {swg[i] = '-'}
        document.querySelector(swclassg[i]).innerHTML = swg[i];
      }
      var swclassm = ['#swkillsmonthly', '#swdeathsmonthly', '#swgamesmonthly', '#swwinsmonthly', '#swwinStreakmonthly', '#swkdmonthly', '#swgwmonthly', '#swkgmonthly', '#swdgmonthly'];
      var smm = Object.values(Info2);
      var swm = Match([smm[2],smm[3],smm[1],smm[0],smm[8]]);
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

    function CP(Info1, Info2) {
      var cpclassg = ['#cpkillsglobal', '#cpdeathsglobal', '#cpgamesglobal', '#cpwinsglobal', '#cpresourcePointsBreakedglobal', '#cpkdglobal', '#cpgwglobal', '#cpkgglobal', '#cpdgglobal', '#cpbgglobal']; 
      var cpg = Match(Object.values(Info1));
      for (var i = 0; i < 10; i++) {
        if (cpg[i] == 'NaN') {cpg[i] = 0}
        if (cpg[i] == 'Infinity') {cpg[i] = '-'}
        document.querySelector(cpclassg[i]).innerHTML = cpg[i];
      }
      var cpclassm = ['#cpkillsmonthly', '#cpdeathsmonthly', '#cpgamesmonthly', '#cpwinsmonthly', '#cpresourcePointsBreakedmonthly', '#cpkdmonthly', '#cpgwmonthly', '#cpkgmonthly', '#cpdgmonthly', '#cpbgmonthly']; 
      var cpm = Match(Object.values(Info2));
      for (var i = 0; i < 10; i++) {
        if (cpm[i] == 'NaN') {cpm[i] = 0}
        if (cpm[i] == 'Infinity') {cpm[i] = '-'}
        document.querySelector(cpclassm[i]).innerHTML = cpm[i];
      }
      var cptab = ['#tabcpkd', '#tabcpgw', '#tabcpgm', '#tabcpdg', '#tabcpbg'];
      var arr = [];
      var tabcp = MatchTab(arr.concat(cpg, cpm));
      for (var i = 0; i < 5; i++) {
          document.querySelector(cptab[i]).innerHTML = tabcp[i];
      }
    }
    function Bridge (games, wins, kills, deaths, points){
      var brclass = ['#brkills', '#brdeaths', '#brgames', '#brwins', '#brpoints', '#brkd', '#brgw', '#brkg', '#brdg', '#brpg'];
      var br = Match([kills, deaths, games, wins, points]);
      for (var i = 0; i < 10; i++) {
        if (br[i] == 'NaN') {br[i] = 0}
        if (br[i] == 'Infinity') {br[i] = '-'}
        document.querySelector(brclass[i]).innerHTML = br[i];
      }
    }
    function Match(matchmas){
      //kills - matchmas[0] deaths - matchmas[1] games - matchmas[2] wins - matchmas[3] points, resourcePointsBreaked, winStreak, bedBreaked - matchmas[4]
      var kd = (matchmas[0] / matchmas[1]).toFixed(2);  // Убийсва\Смерти
      var gw = (matchmas[3] / (matchmas[2] - matchmas[3])).toFixed(2); // Победы\Поражения
      var kg = (matchmas[0] / matchmas[2]).toFixed(2);  // Среднее количество убийств за игру
      var dg = (matchmas[1] / matchmas[2]).toFixed(2); // Среднее количество смертей за игру
      var bg = (matchmas[4] / matchmas[2]).toFixed(2); // Среднее количество сломаных кроватей за игру
      var arr = [];
      var matr = [kd, gw, kg, dg, bg];
      var tab = arr.concat(matchmas, matr);
      return tab;
    }
    function MatchTab(tab2){
      var tab5 = [];
      for (var i = 0; i < 5; i++) {
        tab4 = ((tab2[i+15]-tab2[i+5])/tab2[i+5]*100).toFixed(1);
        if (tab4 < 0) { tab4 = '<span>' + tab4 + '% </span><span class="badge bg-danger rounded-pill"><i class="bi bi-caret-down-fill"></i></span>'; }
        if (tab4 > 0) { tab4 = '<span>' + tab4 + '% </span><span class="badge bg-success rounded-pill"><i class="bi bi-caret-up-fill"></i></span>'; }
        if (tab4 == 0) { tab4 = '<span>' + tab4 + '% </span><span class="badge bg-warning rounded-pill"><i class="bi bi-caret-right-fill"></i></span>'; }
        if (tab4 == 'NaN') { tab4 = '<span>0% </span><span class="badge bg-warning rounded-pill"><i class="bi bi-caret-right-fill"></i></span>'; }
        if (tab4 == 'Infinity') { tab4 = '<span>-% </span><span class="badge bg-warning rounded-pill"><i class="bi bi-caret-right-fill"></i></span>'; }
        tab5[i] = tab4;
      }
      return tab5;
    }

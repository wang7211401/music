var APP_ID = 'i19UWtaghVE36y85Oo4Uscyx-gzGzoHsz';
var APP_KEY = 'J2ge2uYbUiOX1pOAYBILAGon';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var id = getParameterByName('id');
var query = new AV.Query('Topsong');
query.get(id).then(function(results){
    let url= results.attributes.url;
    let images = results.attributes.images;
    let name = results.attributes.name;
    let singer = results.attributes.singer.split('-')[0];
    let lyric =results.attributes.lyric;
    let title = `<title>${name}</title>`;
    $('head').append(title);
    $('.page').css("background-image", `url(${images})`);
    let img = `<img src="${images}" alt="">`;
    $('.top-img').append(img);
    let h3 =`<h3>${name} - <span>${singer}</span></h3>`;
    $('.song-content').prepend(h3);
    ininPlayer(url);
    parseLyric(lyric);
});
function parseLyric(lyric){
    let array = lyric.split('\n');
    let regex = /^\[(.+)\](.*)$/;
    array = array.map(function(string, index){
        let matches = string.match(regex);
        if(matches){
            return {time: matches[1], words: matches[2]}
        }
    });
    let $lyriclines = $('.lines');
    array.map(function(object){
        if(!object){return}
        let $p = $('<p/>');
        $p.attr('data-time', object.time).text(object.words);
        $lyriclines.append($p)
    })
}
function ininPlayer(url){
    var audio = document.createElement('audio');
    audio.src= url;
    document.body.appendChild(audio);
    audio.play();
    $('.top-disc-turn').addClass('active');
    $('.top-disc').addClass('active');
    $('.icon-play').on('click',function(){
        audio.play();
        $('.top-disc').addClass('active');
        $('.top-disc-turn').addClass('active');
        $('.top-wrap').removeClass('active')
    });
    $('.icon-pause').on('click',function(){
        audio.pause();
        $('.top-disc').removeClass('active');
        $('.top-disc-turn').removeClass('active');
        $('.top-wrap').addClass('active')
    });
    audio.onended =function(){
        $('.top-disc').removeClass('active');
        $('.top-disc-turn').removeClass('active');
        $('.top-wrap').addClass('active')
    };
    setInterval(function(){
        let seconds = audio.currentTime;
        let munites = ~~(seconds / 60);
        let left = seconds - munites * 60;
        let time = `${pad(munites)}:${pad(left)}`;
        let $lines = $('.lines >p');
        let $whichLine;
        for(let i=0;i<$lines.length;i++){
            let currentLineTime = $lines.eq(i).attr('data-time');
            let nextLineTime = $lines.eq(i+1).attr('data-time');
            if($lines.eq(i+1).length !==0 && currentLineTime < time && nextLineTime > time){
                $whichLine = $lines.eq(i)
            }
        }
        if($whichLine){
            $whichLine.addClass('active').prev().removeClass('active');
            let top = $whichLine.offset().top;
            let linesTop = $('.lines').offset().top;
            let delta = top - linesTop - $('.song-lyric').height()/3;
            $('.lines').css('transform',`translateY(-${delta}px)`)
        }
    },300);
}
function pad(number){
    return number >=10 ? number + '' : '0' + number
}
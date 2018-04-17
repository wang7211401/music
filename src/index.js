$('.tabs').on('click','li',function(e){
    var $li = $(e.currentTarget);
    var index = $li.index();
    $li.addClass('active').siblings().removeClass('active');
    $('.tab-content').children().eq(index).addClass('active').siblings().removeClass('active')
});
var APP_ID = 'i19UWtaghVE36y85Oo4Uscyx-gzGzoHsz';
var APP_KEY = 'J2ge2uYbUiOX1pOAYBILAGon';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
let $ulsongs = $('ul.songs');
var query = new AV.Query('Song');
query.find().then(function(results){
    $('.loading-img').addClass('active');
    for(var i=0;i<results.length;i++){
        let song = results[i].attributes;
        let li =`<li>
                    <a href="./playlist.html?id=${results[i].id}">
                        <div class="songs-img">
                            <img src="${song.url}" alt="">
                            <span class="subscribe">
                                <svg>
                                    <use xlink:href="#icon-ep"></use>
                                </svg>
                                ${song.subscribe}
                            </span>
                        </div>
                        <p>${song.text}</p>
                    </a>
                </li>`;
        $ulsongs.append(li)
    }
});
let $playlists =$('div.playlists-data');
var playlist = new AV.Query('Topsong');
playlist.find().then(function(results){
    $('.loading-img').addClass('active');
    for(var i=0;i<10;i++){
        let songs = results[i].attributes;
        let songsId = results[i].id;
        let $li = `<div class="playlists-left">
                            <a href="./songs.html?id=${songsId}">
                                <div class="playlists-content">
                                    <p>${songs.name}<small>${songs.subtitle}</small></p>
                                    <p>
                                        <i class="icon-sq"></i>
                                        ${songs.singer}
                                    </p>
                                </div>
                                <div class="player">
                                    <svg class="icon play">
                                        <use xlink:href="#icon-cplay1"></use>
                                    </svg>
                                </div>
                            </a>
                        </div>`;
        $playlists.append($li)
    }
});
let $topselling = $('div.top-selling');
var topsong = new AV.Query('Topsong');
topsong.find().then(function(results){
    $('.loading-img').addClass('active');
    for(var i=0;i<results.length;i++){
        var number =((i+1)<10) ? ('0'+ (i+1)) : (i+1);
        let topsongs = results[i].attributes;
        let topsongsId = results[i].id;
        let toplist =`<a href="./songs.html?id=${topsongsId}">
                                <div class="groups">${number}</div>
                                <div class="top-selling-line">
                                    <div class="top-selling-content">
                                        <p>${topsongs.name}<small>${topsongs.subtitle}</small></p>
                                        <p>
                                            <i class="icon-sq"></i>
                                            ${topsongs.singer}
                                        </p>
                                    </div>
                                    <div class="top-selling-player">
                                        <svg class="icon play">
                                            <use xlink:href="#icon-cplay1"></use>
                                        </svg>
                                    </div>
                                </div>
                            </a>`;
        $topselling.append(toplist)
    }
});
let $hot = $('ul.search-hot');
var hotsearch = new AV.Query('Hotsearch');
hotsearch.find().then(function(results){
    $('.loading-img').addClass('active');
    for(var i=0;i<results.length;i++){
        let search = results[i].attributes;
        let li =`<li><a href="#">${search.name}</a></li>`;
        $hot.append(li)
    }
});

let timer = null;
$('.search-input').on('input',input);
function input(){
    if(timer){
        clearTimeout(timer)
    }
    let value = $('.search-input').val().trim();
    searchChange(value);
    timer =setTimeout(function(){
        timer =null;
        let value = $('.search-input').val().trim();
        var querys = new AV.Query('Topsong');
        querys.contains('singer',value);
        var querys1 = new AV.Query('Topsong');
        querys1.contains('name',value);
        var queryObjects =AV.Query.or(querys, querys1);
        queryObjects.find().then(function(results){
            for(var i=0;i<results.length;i++){
                let searchSong = results[i].attributes;
                let singer =searchSong.singer.split('-')[0];
                let searchLi = `<li>
                                    <svg class="icon-search">
                                        <use xlink:href="#icon-sousuo"></use>
                                    </svg>
                                    <span data-id="${results[i].id}">
                                        ${searchSong.name}-${singer}
                                    </span>
                                </li>`;
                $('#searchResult >ul').append(searchLi);
            }
        })
    },500);
}
function searchChange(value) {
    $('.search-box').addClass('active'); // 隐藏label 显示删除按钮
    $('.search-hotlists').addClass('active'); // 隐藏热门搜索
    $('.search-history').removeClass('active');
    $('#searchResult').addClass('active');
    $('#searchResult >h3').text(`搜索“${value}”`);
    $('#searchResult >ul').empty(); // 清空搜索ul
    $('.search-songs').empty(); // 清空搜索结果
    if(value === ''){
        $('.search-box').removeClass('active');
        $('.search-hotlists').removeClass('active');
        $('#searchResult').removeClass('active');
        $('#searchResult >ul').empty();
        $('#searchResult >h3').empty();
        $('.search-songs').empty();
        $('.noResult').removeClass('active');
        $('.search-history').addClass('active');
        return
    }
}
$('.search-input').on('keydown',function(e){
    if(e.keyCode === 13){
        $('.search-input').blur();
        show()
    }
});

function show() {
    let value = $('.search-input').val().trim();
    let hishoryLi = `<li>
                        <svg class="history-timeIcon">
                            <use xlink:href="#icon-timecolck"></use>
                        </svg>
                        <div class="history-name">
                            <span>${value}</span>
                            <svg class="history-deleteIcon">
                                <use xlink:href="#icon-delete"></use>
                            </svg>
                        </div>
                    </li>`;
    $('.search-history').removeClass('active');
    $('.search-history ul').prepend(hishoryLi);
    var querys = new AV.Query('Topsong');
    querys.contains('singer',value);
    var querys1 = new AV.Query('Topsong');
    querys1.contains('name',value);
    var queryObjects =AV.Query.or(querys, querys1);
    queryObjects.find().then(function(results){
        if(results.length === 0){
            $('#searchResult').removeClass('active');
            $('#searchResult>h3').empty();
            $('#searchResult>ul').empty();
            $('.noResult').addClass('active');
        }
        for(var i=0;i<results.length;i++){
            let searchSongs = results[i].attributes;
            let searchSongsId = results[i].id;
            let songs= `<a href="./songs.html?id=${searchSongsId}">
                            <div class="search-songs-content">
                                <p>${searchSongs.name}<small>${searchSongs.subtitle}</small></p>
                                <p>
                                    <i class="icon-sq"></i>
                                    ${searchSongs.singer}
                                </p>
                            </div>
                            <div class="search-songs-player">
                                <svg class="icon-play">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cplay1"></use>
                                </svg>
                            </div>
                        </a>`;
            $('#searchResult').removeClass('active');
            $('#searchResult>h3').empty();
            $('#searchResult>ul').empty();
            $('.search-songs').append(songs);
        }
    })
}
$('.search-hot').on('click','li',function(e){
    let $lilist = $(e.currentTarget);
    let text = $lilist.text();
    $('.search-input')[0].value = text;
    input();
    show()
});
$('.search-close').on('click',function(){
    $('.search-input')[0].value = '';
    if($('.search-input').val() === ''){
        $('.search-box').removeClass('active');
        $('.search-hotlists').removeClass('active');
        $('#searchResult >h3').empty();
        $('#searchResult >ul').empty();
        $('.search-history').addClass('active');
        $('.search-songs').empty();
        $('.noResult').removeClass('active');
    }
});
$('.search-history ul').on('click','span',function(e){
    let event = $(e.currentTarget);
    let text = event.text();
    $('.search-input')[0].value = text;
    input();
    show()
});
$('.search-history ul').on('click','.history-deleteIcon',function(e){
    let event = $(e.currentTarget);
    event.parent().parent().remove()
});

$('#searchResult ul').on('click','span',function(e){
    let searchLi = $(e.currentTarget);
    let text = searchLi.text().trim();
    let spanText =text.split('-')[0];
    $('.search-input')[0].value = spanText;
    input();
    show()
})

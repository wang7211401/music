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
var $pageTop =$('.page-top');
var query = new AV.Query('Song');
query.get(id).then(function(results){
    $('.loading-img').addClass('active');
    var url= results.attributes.url;
    var subscribe = results.attributes.subscribe;
    var text = results.attributes.text;
    var author = results.attributes.author;
    let divContainer = `<div class="top-container">
                                <div class="top-bg"></div>
                                <div class="top-left">
                                    <div class="top-img">
                                        <img src="${url}" alt="">
                                        <span class="top-icon">
                                            <svg class="icon-ep">
                                                <use xlink:href="#icon-ep"></use>
                                            </svg>
                                        ${subscribe}
                                        </span>
                                        <span class="top-songlist">歌单</span>
                                    </div>
                                </div>
                                <div class="top-right">
                                    <h3>${text}</h3>
                                    <div class="top-avatar">
                                        <img src="${url}" alt="">
                                        <p>${author}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="label-container">
                                <div class="content">
                                    <p class="content-fashion">
                                        标签：<span>华语</span> <span>流行</span> <span>90后</span>
                                    </p>
                                    <div class="content-about">
                                        <p class="content-explanation content-third">
                                            <span>简介：七夕快到了，单身狗我有话要说</span><br><br>
                                            <span>一年到底有多少情人节？</span><br><br>
                                            <span>过完2月14现在又七夕，有没有想过单身狗的感受</span><br><br>
                                            <span>来人，把鹊桥给我烧了，秀恩爱的请好自为之</span><br><br>
                                            <span>最后，点一首《祝天下所有的情侣都是失散多年的兄妹》送给你们</span><br>
                                        </p>
                                        <span class="content-down"></span>
                                        <span class="content-up"></span>
                                    </div>
                                </div>
                            </div>`;
    $pageTop.append(divContainer);
});
var $songList =$('.songlist');
var query1 = new AV.Query('Topsong');
query1.find().then(function(results){
    for(var i=0;i<10;i++){
        var pagesong = results[i].attributes;
        var songsId = results[i].id;
        let divSongList = `<div class="songlist-content">
                                    <a href="/music/songs.html?id=${songsId}">
                                        <div class="number">${i+1}</div>
                                        <div class="songlist-line">
                                            <div class="selling-content">
                                                <p>${pagesong.name}</p>
                                                <p>
                                                    ${pagesong.singer}
                                                </p>
                                            </div>
                                            <div class="selling-player">
                                                <svg class="icon-play">
                                                    <use  xlink:href="#icon-cplay1"></use>
                                                </svg>
                                            </div>
                                        </div>
                                    </a>
                                </div>`;
        $songList.append(divSongList);
    }
    $songList.addClass('active');
    $('.collecting').addClass('active')
});
var whether = true;
$('.page-top').on('click','.content-about',function(){
    if(whether){
        whether =false;
        $('.content-explanation').removeClass('content-third');
        $('.content-about').addClass('active')
    }else{
        whether =true;
        $('.content-explanation').addClass('content-third');
        $('.content-about').removeClass('active')
    }
})
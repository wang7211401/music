"use strict";function input(){timer&&clearTimeout(timer),searchChange($(".search-input").val().trim()),timer=setTimeout(function(){timer=null;var s=$(".search-input").val().trim(),e=new AV.Query("Topsong");e.contains("singer",s);var n=new AV.Query("Topsong");n.contains("name",s),AV.Query.or(e,n).find().then(function(s){for(var e=0;e<s.length;e++){var n=s[e].attributes,a=n.singer.split("-")[0],i='<li>\n                                    <svg class="icon-search">\n                                        <use xlink:href="#icon-sousuo"></use>\n                                    </svg>\n                                    <span data-id="'+s[e].id+'">\n                                        '+n.name+"-"+a+"\n                                    </span>\n                                </li>";$("#searchResult >ul").append(i)}})},500)}function searchChange(s){if($(".search-box").addClass("active"),$(".search-hotlists").addClass("active"),$(".search-history").removeClass("active"),$("#searchResult").addClass("active"),$("#searchResult >h3").text("搜索“"+s+"”"),$("#searchResult >ul").empty(),$(".search-songs").empty(),""===s)return $(".search-box").removeClass("active"),$(".search-hotlists").removeClass("active"),$("#searchResult").removeClass("active"),$("#searchResult >ul").empty(),$("#searchResult >h3").empty(),$(".search-songs").empty(),$(".noResult").removeClass("active"),void $(".search-history").addClass("active")}function show(){var s=$(".search-input").val().trim(),e='<li>\n                        <svg class="history-timeIcon">\n                            <use xlink:href="#icon-timecolck"></use>\n                        </svg>\n                        <div class="history-name">\n                            <span>'+s+'</span>\n                            <svg class="history-deleteIcon">\n                                <use xlink:href="#icon-delete"></use>\n                            </svg>\n                        </div>\n                    </li>';$(".search-history").removeClass("active"),$(".search-history ul").prepend(e);var n=new AV.Query("Topsong");n.contains("singer",s);var a=new AV.Query("Topsong");a.contains("name",s),AV.Query.or(n,a).find().then(function(s){0===s.length&&($("#searchResult").removeClass("active"),$("#searchResult>h3").empty(),$("#searchResult>ul").empty(),$(".noResult").addClass("active"));for(var e=0;e<s.length;e++){var n=s[e].attributes,a='<a href="/music/songs.html?id='+s[e].id+'">\n                            <div class="search-songs-content">\n                                <p>'+n.name+"<small>"+n.subtitle+'</small></p>\n                                <p>\n                                    <i class="icon-sq"></i>\n                                    '+n.singer+'\n                                </p>\n                            </div>\n                            <div class="search-songs-player">\n                                <svg class="icon-play">\n                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cplay1"></use>\n                                </svg>\n                            </div>\n                        </a>';$("#searchResult").removeClass("active"),$("#searchResult>h3").empty(),$("#searchResult>ul").empty(),$(".search-songs").append(a)}})}$(".tabs").on("click","li",function(s){var e=$(s.currentTarget),n=e.index();e.addClass("active").siblings().removeClass("active"),$(".tab-content").children().eq(n).addClass("active").siblings().removeClass("active")});var APP_ID="i19UWtaghVE36y85Oo4Uscyx-gzGzoHsz",APP_KEY="J2ge2uYbUiOX1pOAYBILAGon";AV.init({appId:APP_ID,appKey:APP_KEY});var $ulsongs=$("ul.songs"),query=new AV.Query("Song");query.find().then(function(s){$(".loading-img").addClass("active");for(var e=0;e<s.length;e++){var n=s[e].attributes,a='<li>\n                            <a href="/music/playlist.html?id='+s[e].id+'">\n                                <div class="songs-img">\n                                    <img src="'+n.url+'" alt="">\n                                    <span class="subscribe">\n                                        <svg>\n                                            <use xlink:href="#icon-ep"></use>\n                                        </svg>\n                                        '+n.subscribe+"\n                                    </span>\n                                </div>\n                                <p>"+n.text+"</p>\n                            </a>\n                        </li>";$ulsongs.append(a)}});var $playlists=$("div.playlists-data"),playlist=new AV.Query("Topsong");playlist.find().then(function(s){$(".loading-img").addClass("active");for(var e=0;e<10;e++){var n=s[e].attributes,a='<div class="playlists-left">\n                            <a href="/music/songs.html?id='+s[e].id+'">\n                                <div class="playlists-content">\n                                    <p>'+n.name+"<small>"+n.subtitle+'</small></p>\n                                    <p>\n                                        <i class="icon-sq"></i>\n                                        '+n.singer+'\n                                    </p>\n                                </div>\n                                <div class="player">\n                                    <svg class="icon play">\n                                        <use xlink:href="#icon-cplay1"></use>\n                                    </svg>\n                                </div>\n                            </a>\n                        </div>';$playlists.append(a)}});var $topselling=$("div.top-selling"),topsong=new AV.Query("Topsong");topsong.find().then(function(s){$(".loading-img").addClass("active");for(var e=0;e<s.length;e++){var n=e+1<10?"0"+(e+1):e+1,a=s[e].attributes,i='<a href="/music/songs.html?id='+s[e].id+'">\n                                <div class="groups">'+n+'</div>\n                                <div class="top-selling-line">\n                                    <div class="top-selling-content">\n                                        <p>'+a.name+"<small>"+a.subtitle+'</small></p>\n                                        <p>\n                                            <i class="icon-sq"></i>\n                                            '+a.singer+'\n                                        </p>\n                                    </div>\n                                    <div class="top-selling-player">\n                                        <svg class="icon play">\n                                            <use xlink:href="#icon-cplay1"></use>\n                                        </svg>\n                                    </div>\n                                </div>\n                            </a>';$topselling.append(i)}});var $hot=$("ul.search-hot"),hotsearch=new AV.Query("Hotsearch");hotsearch.find().then(function(s){$(".loading-img").addClass("active");for(var e=0;e<s.length;e++){var n='<li><a href="#">'+s[e].attributes.name+"</a></li>";$hot.append(n)}});var timer=null;$(".search-input").on("input",input),$(".search-input").on("keydown",function(s){13===s.keyCode&&($(".search-input").blur(),show())}),$(".search-hot").on("click","li",function(s){var e=$(s.currentTarget).text();$(".search-input")[0].value=e,input(),show()}),$(".search-close").on("click",function(){$(".search-input")[0].value="",""===$(".search-input").val()&&($(".search-box").removeClass("active"),$(".search-hotlists").removeClass("active"),$("#searchResult >h3").empty(),$("#searchResult >ul").empty(),$(".search-history").addClass("active"),$(".search-songs").empty(),$(".noResult").removeClass("active"))}),$(".search-history ul").on("click","span",function(s){var e=$(s.currentTarget).text();$(".search-input")[0].value=e,input(),show()}),$(".search-history ul").on("click",".history-deleteIcon",function(s){$(s.currentTarget).parent().parent().remove()}),$("#searchResult ul").on("click","span",function(s){var e=$(s.currentTarget).text().trim().split("-")[0];$(".search-input")[0].value=e,input(),show()});
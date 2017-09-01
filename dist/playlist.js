"use strict";function getParameterByName(n,s){s||(s=window.location.href),n=n.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+n+"(=([^&#]*)|&|#|$)").exec(s);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null}var APP_ID="i19UWtaghVE36y85Oo4Uscyx-gzGzoHsz",APP_KEY="J2ge2uYbUiOX1pOAYBILAGon";AV.init({appId:APP_ID,appKey:APP_KEY});var id=getParameterByName("id"),$pageTop=$(".page-top"),query=new AV.Query("Song");query.get(id).then(function(n){$(".loading-img").addClass("active");var s=n.attributes.url,a='<div class="top-container">\n                                <div class="top-bg"></div>\n                                <div class="top-left">\n                                    <div class="top-img">\n                                        <img src="'+s+'" alt="">\n                                        <span class="top-icon">\n                                            <svg class="icon-ep">\n                                                <use xlink:href="#icon-ep"></use>\n                                            </svg>\n                                        '+n.attributes.subscribe+'\n                                        </span>\n                                        <span class="top-songlist">歌单</span>\n                                    </div>\n                                </div>\n                                <div class="top-right">\n                                    <h3>'+n.attributes.text+'</h3>\n                                    <div class="top-avatar">\n                                        <img src="'+s+'" alt="">\n                                        <p>'+n.attributes.author+'</p>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class="label-container">\n                                <div class="content">\n                                    <p class="content-fashion">\n                                        标签：<span>华语</span> <span>流行</span> <span>90后</span>\n                                    </p>\n                                    <div class="content-about">\n                                        <p class="content-explanation content-third">\n                                            <span>简介：七夕快到了，单身狗我有话要说</span><br><br>\n                                            <span>一年到底有多少情人节？</span><br><br>\n                                            <span>过完2月14现在又七夕，有没有想过单身狗的感受</span><br><br>\n                                            <span>来人，把鹊桥给我烧了，秀恩爱的请好自为之</span><br><br>\n                                            <span>最后，点一首《祝天下所有的情侣都是失散多年的兄妹》送给你们</span><br>\n                                        </p>\n                                        <span class="content-down"></span>\n                                        <span class="content-up"></span>\n                                    </div>\n                                </div>\n                            </div>';$pageTop.append(a)});var $songList=$(".songlist"),query1=new AV.Query("Topsong");query1.find().then(function(n){for(var s=0;s<10;s++){var a=n[s].attributes,t='<div class="songlist-content">\n                                    <a href="/songs.html?id='+n[s].id+'">\n                                        <div class="number">'+(s+1)+'</div>\n                                        <div class="songlist-line">\n                                            <div class="selling-content">\n                                                <p>'+a.name+"</p>\n                                                <p>\n                                                    "+a.singer+'\n                                                </p>\n                                            </div>\n                                            <div class="selling-player">\n                                                <svg class="icon-play">\n                                                    <use  xlink:href="#icon-cplay1"></use>\n                                                </svg>\n                                            </div>\n                                        </div>\n                                    </a>\n                                </div>';$songList.append(t)}$songList.addClass("active"),$(".blank").addClass("active"),$(".collecting").addClass("active")});var whether=!0;$(".page-top").on("click",".content-about",function(){whether?(whether=!1,$(".content-explanation").removeClass("content-third"),$(".content-about").addClass("active")):(whether=!0,$(".content-explanation").addClass("content-third"),$(".content-about").removeClass("active"))});
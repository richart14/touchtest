var VideoPreview = function() {
  "use strict";
  var m, p = 0, u = null;
  function h(e, a, t) {
      return e.style.opacity = a,
      e.style.width = t,
      e
  }
  return {
      getTarget: function() {
          if (function() {
              var e = document.createElement("video")
                , a = !1;
              try {
                  (a = !!e.canPlayType) && ((a = new Boolean(a)).mp4Format = e.canPlayType("video/mp4; codecs=avc1.42E01E,mp4a.40.2").replace(/^no$/, ""),
                  a = "maybe" == a.mp4Format || "probably" == a.mp4Format)
              } catch (e) {
                  console.log(e)
              }
              page_params.isMp4 = a
          }(),
          function() {
              var e = document.createElement("video")
                , a = !1;
              try {
                  (a = !!e.canPlayType) && ((a = new Boolean(a)).webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""),
                  a = "maybe" == a.webm || "probably" == a.webm)
              } catch (e) {
                  console.log(e)
              }
              page_params.isWebm = a
          }(),
          document.createElement("video").play || page_params.isMp4 || page_params.isWebm)
              return function(e) {
                  document.querySelectorAll("." + e).length;
                  var d = document.querySelector("body");
                  MG_Utils.addEventHandler(d, "mouseover", function(e) {
                      var r;
                      if (!u) {
                          var a, t = e.target.closest(".video_thumb_title_wrap");
                          if (t && d.contains(t))
                              if (r = (u = t).querySelector(".js-videoPreview")) {
                                  var n = r.getAttribute("data-mediabook");
                                  if (!(-1 != (a = n).indexOf(".mp4") && page_params.isMp4 || -1 != a.indexOf(".webm") && page_params.isWebm))
                                      return void MG_Utils.removeClass(r, "js-videoPreview");
                                  MG_Utils.removeClass(r, "js-videoThumbFlip");
                                  var i = r.parentNode
                                    , o = MG_Utils.closest(r, ".video_block_wrapper")
                                    , s = o.querySelector(".preloadLine")
                                    , l = function() {
                                      var e, a = document.createElement("div"), t = {
                                          transition: "transitionend",
                                          OTransition: "oTransitionEnd",
                                          MozTransition: "transitionend",
                                          WebkitTransition: "webkitTransitionEnd"
                                      };
                                      for (e in t)
                                          if (void 0 !== a.style[e])
                                              return t[e]
                                  }()
                                    , c = MG_Utils.hasClass(r, "js-menuSwap") ? r.getAttribute("data-image") : r.getAttribute("data-thumb_url");
                                  h(s, 1, "100%"),
                                  m = setTimeout(function() {
                                      var e, a, t;
                                      MG_Utils.addClass(r, "activeVideo"),
                                      i.appendChild((e = r.getAttribute("data-mediabook"),
                                      a = c,
                                      (t = document.createElement("video")).autoplay = !0,
                                      t.className = "videoPreviewEl",
                                      t.loop = "loop",
                                      t.muted = "muted",
                                      t.src = e,
                                      t.poster = a,
                                      t.disableRemotePlayback = !0,
                                      t))
                                  }, p),
                                  l && s.addEventListener(l, function() {
                                      s.style.opacity = 0
                                  })
                              }
                      }
                  }),
                  MG_Utils.addEventHandler(d, "mouseout", function(e) {
                      var a;
                      if (u) {
                          var t = e.relatedTarget;
                          if (t)
                              for (; t; ) {
                                  if (t == u)
                                      return;
                                  t = t.parentNode
                              }
                          if (a = u.querySelector(".js-videoPreview")) {
                              var r = a.parentNode
                                , n = r.querySelector(".videoPreviewEl")
                                , i = MG_Utils.closest(a, ".video_block_wrapper")
                                , o = i.querySelector(".preloadLine");
                              window.clearTimeout(m),
                              h(o, 0, 0),
                              MG_Utils.removeClass(a, "activeVideo"),
                              n && n.parentNode.removeChild(n)
                          }
                          u = null
                      }
                  })
              }(arguments[0])
      }
  }
}();
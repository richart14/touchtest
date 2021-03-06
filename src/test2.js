!function(x) {
  x.fn.extend({
      slimScroll: function(w) {
          var S = x.extend({
              width: "auto",
              height: "250px",
              size: "7px",
              color: "#000",
              position: "right",
              distance: "1px",
              start: "top",
              opacity: .4,
              alwaysVisible: !1,
              disableFadeOut: !1,
              railVisible: !1,
              railColor: "#333",
              railOpacity: .2,
              railDraggable: !0,
              railClass: "slimScrollRail",
              barClass: "slimScrollBar",
              wrapperClass: "slimScrollDiv",
              allowPageScroll: !1,
              wheelStep: 20,
              touchScrollStep: 200,
              borderRadius: "7px",
              railBorderRadius: "7px"
          }, w);
          return this.each(function() {
              function e(e) {
                  if (n) {
                      var a = 0;
                      (e = e || window.event).wheelDelta && (a = -e.wheelDelta / 120),
                      e.detail && (a = e.detail / 3),
                      x(e.target || e.srcTarget || e.srcElement).closest("." + S.wrapperClass).is(g.parent()) && r(a, !0),
                      e.preventDefault && !h && e.preventDefault(),
                      h || (e.returnValue = !1)
                  }
              }
              function r(e, a, t) {
                  h = !1;
                  var r = e
                    , n = g.outerHeight() - _.outerHeight();
                  a && (r = parseInt(_.css("top")) + e * parseInt(S.wheelStep) / 100 * _.outerHeight(),
                  r = Math.min(Math.max(r, 0), n),
                  r = 0 < e ? Math.ceil(r) : Math.floor(r),
                  _.css({
                      top: r + "px"
                  })),
                  r = (p = parseInt(_.css("top")) / (g.outerHeight() - _.outerHeight())) * (g[0].scrollHeight - g.outerHeight()),
                  t && (e = (r = e) / g[0].scrollHeight * g.outerHeight(),
                  e = Math.min(Math.max(e, 0), n),
                  _.css({
                      top: e + "px"
                  })),
                  g.scrollTop(r),
                  g.trigger("slimscrolling", ~~r),
                  i(),
                  o()
              }
              function a() {
                  m = Math.max(g.outerHeight() / g[0].scrollHeight * g.outerHeight(), 30),
                  _.css({
                      height: m + "px"
                  });
                  var e = m == g.outerHeight() ? "none" : "block";
                  _.css({
                      display: e
                  })
              }
              function i() {
                  a(),
                  clearTimeout(c),
                  p == ~~p ? (h = S.allowPageScroll,
                  u != p && g.trigger("slimscroll", 0 == ~~p ? "top" : "bottom")) : h = !1,
                  u = p,
                  m >= g.outerHeight() ? h = !0 : (_.stop(!0, !0).fadeIn("fast"),
                  S.railVisible && v.stop(!0, !0).fadeIn("fast"))
              }
              function o() {
                  S.alwaysVisible || (c = setTimeout(function() {
                      S.disableFadeOut && n || s || l || (_.fadeOut("slow"),
                      v.fadeOut("slow"))
                  }, 1e3))
              }
              var n, s, l, c, d, m, p, u, h = !1, g = x(this);
              if (g.parent().hasClass(S.wrapperClass)) {
                  var f = g.scrollTop()
                    , _ = g.parent().find("." + S.barClass)
                    , v = g.parent().find("." + S.railClass);
                  if (a(),
                  x.isPlainObject(w)) {
                      if ("height"in w && "auto" == w.height) {
                          g.parent().css("height", "auto"),
                          g.css("height", "auto");
                          var b = g.parent().parent().height();
                          g.parent().css("height", b),
                          g.css("height", b)
                      }
                      if ("scrollTo"in w)
                          f = parseInt(S.scrollTo);
                      else if ("scrollBy"in w)
                          f += parseInt(S.scrollBy);
                      else if ("destroy"in w)
                          return _.remove(),
                          v.remove(),
                          void g.unwrap();
                      r(f, !1, !0)
                  }
              } else if (!(x.isPlainObject(w) && "destroy"in w)) {
                  S.height = "auto" == S.height ? g.parent().height() : S.height,
                  f = x("<div></div>").addClass(S.wrapperClass).css({
                      position: "relative",
                      overflow: "hidden",
                      width: S.width,
                      height: S.height
                  }),
                  g.css({
                      overflow: "hidden",
                      width: S.width,
                      height: S.height
                  });
                  v = x("<div></div>").addClass(S.railClass).css({
                      width: S.size,
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      display: S.alwaysVisible && S.railVisible ? "block" : "none",
                      "border-radius": S.railBorderRadius,
                      background: S.railColor,
                      opacity: S.railOpacity,
                      zIndex: 90
                  }),
                  _ = x("<div></div>").addClass(S.barClass).css({
                      background: S.color,
                      width: S.size,
                      position: "absolute",
                      top: 0,
                      opacity: S.opacity,
                      display: S.alwaysVisible ? "block" : "none",
                      "border-radius": S.borderRadius,
                      BorderRadius: S.borderRadius,
                      MozBorderRadius: S.borderRadius,
                      WebkitBorderRadius: S.borderRadius,
                      zIndex: 99
                  }),
                  b = "right" == S.position ? {
                      right: S.distance
                  } : {
                      left: S.distance
                  };
                  v.css(b),
                  _.css(b),
                  g.wrap(f),
                  g.parent().append(_),
                  g.parent().append(v),
                  S.railDraggable && _.bind("mousedown", function(e) {
                      var a = x(document);
                      return l = !0,
                      t = parseFloat(_.css("top")),
                      pageY = e.pageY,
                      a.bind("mousemove.slimscroll", function(e) {
                          currTop = t + e.pageY - pageY,
                          _.css("top", currTop),
                          r(0, _.position().top, !1)
                      }),
                      a.bind("mouseup.slimscroll", function(e) {
                          l = !1,
                          o(),
                          a.unbind(".slimscroll")
                      }),
                      !1
                  }).bind("selectstart.slimscroll", function(e) {
                      return e.stopPropagation(),
                      e.preventDefault(),
                      !1
                  }),
                  v.hover(function() {
                      i()
                  }, function() {
                      o()
                  }),
                  _.hover(function() {
                      s = !0
                  }, function() {
                      s = !1
                  }),
                  g.hover(function() {
                      n = !0,
                      i(),
                      o()
                  }, function() {
                      n = !1,
                      o()
                  }),
                  g.bind("touchstart", function(e, a) {
                      e.originalEvent.touches.length && (d = e.originalEvent.touches[0].pageY)
                  }),
                  g.bind("touchmove", function(e) {
                      h || e.originalEvent.preventDefault(),
                      e.originalEvent.touches.length && (r((d - e.originalEvent.touches[0].pageY) / S.touchScrollStep, !0),
                      d = e.originalEvent.touches[0].pageY)
                  }),
                  a(),
                  "bottom" === S.start ? (_.css({
                      top: g.outerHeight() - _.outerHeight()
                  }),
                  r(0, !0)) : "top" !== S.start && (r(x(S.start).position().top, null, !0),
                  S.alwaysVisible || _.hide()),
                  function() {
                      window.addEventListener ? (this.addEventListener("DOMMouseScroll", e, !1),
                      this.addEventListener("mousewheel", e, !1)) : document.attachEvent("onmousewheel", e)
                  }()
              }
          }),
          this
      }
  }),
  x.fn.extend({
      slimscroll: x.fn.slimScroll
  })
}(jQuery);
var Header_bar = function() {
  "use strict";
  var t = this;
  t.defaultSettings = {
      toggleSideMenuBtn_class: "js_sidemenu",
      menuContainer_id: "menu_container",
      activeSideMenu_class: "menu_active",
      hideSideMenu_class: "menu_hide",
      showSideMenu_class: "menu_open",
      toggleSubMenu_class: "js_expend_menu",
      activeSubMenu_class: "active",
      parentMenu_class: "parent_elem",
      sideMenu_id: "sidemenu_wrap",
      showCatPanel_class: "js_show_categories",
      catPanel_id: "categories_panel",
      closeSideMenu_class: "js_close_side_menu",
      breakPointWidth: 1324,
      isTablet: !1
  },
  t.init = function(e) {
      t.params = $.extend(!0, t.defaultSettings, e),
      t.closeTimer = null,
      t.add_listeners(),
      t.initScroll(),
      void 0 === $.cookie("sideMenu") && t.initMenu()
  }
  ,
  t.initMenu = function() {
      $("body").one("mousemove", function() {
          $("." + t.params.showSideMenu_class).removeClass(t.params.showSideMenu_class)
      }),
      $.cookie("sideMenu", "true")
  }
  ,
  t.add_listeners = function() {
      $("." + t.params.toggleSideMenuBtn_class).on("click", function() {
          t.menuToggle()
      }),
      $("." + t.params.toggleSubMenu_class).on("click", function() {
          t.toggle_class($(this).parent("." + t.params.parentMenu_class), t.params.activeSubMenu_class),
          $("#" + t.params.menuContainer_id).slimScroll()
      }),
      $("." + t.params.showCatPanel_class).on("mouseover", function() {
          t.openPanel(),
          t.lazyLoadCatPanel()
      }).on("mouseout", function() {
          t.closePanel()
      }),
      $("#" + t.params.catPanel_id).on("mouseover", function() {
          t.openPanel()
      }).on("mouseout", function() {
          t.closePanel()
      }),
      $("." + t.params.closeSideMenu_class).on("click", function() {
          t.menuToggle()
      })
  }
  ,
  t.menuToggle = function() {
      var e = $("body");
      window.innerWidth < t.params.breakPointWidth ? e.hasClass(t.params.showSideMenu_class) ? e.removeClass(t.params.showSideMenu_class) : (t.toggle_class(e, t.params.activeSideMenu_class),
      e.removeClass(t.params.hideSideMenu_class)) : (e.removeClass(t.params.showSideMenu_class),
      e.removeClass(t.params.activeSideMenu_class),
      e.hasClass(t.params.hideSideMenu_class) ? $.cookie("sideMenu", "true") : $.cookie("sideMenu", "false"),
      t.toggle_class(e, t.params.hideSideMenu_class))
  }
  ,
  t.toggle_class = function(e, a) {
      e.toggleClass(a)
  }
  ,
  t.openPanel = function() {
      $("." + t.params.showCatPanel_class).addClass("highlight"),
      clearTimeout(t.closeTimer),
      $("#" + t.params.catPanel_id).fadeIn(200)
  }
  ,
  t.closePanel = function() {
      $("." + t.params.showCatPanel_class).removeClass("highlight"),
      t.closeTimer = window.setTimeout(function() {
          $("#" + t.params.catPanel_id).hide()
      }, 500)
  }
  ,
  t.lazyLoadCatPanel = function() {
      try {
          var e = new LazyLoadImage
            , a = {
              sections: [t.params.catPanel_id],
              thumbUrl: "thumb_url"
          };
          e.init(a)
      } catch (e) {
          console.log("error loading LazyLoadImage object")
      }
  }
  ,
  t.initScroll = function() {
      $("#" + t.params.menuContainer_id).slimScroll({
          size: "8px",
          color: "#202020",
          width: "100%",
          height: "100%",
          disableFadeOut: !0,
          borderRadius: 0,
          opacity: 1
      })
  }
};
try {
  var myHeader_bar = new Header_bar;
  myHeader_bar.init(page_params.header_bar_setup)
} catch (e) {
  console.log(e),
  console.log("error in myHeader_bar")
}
var Header_Liu_Actions = function() {
  "use strict";
  var n = this;
  n.defaultSettings = {
      boxElemensSelector: {
          contentWrapper: ".js-notifier_box_wrapper",
          itemsFullWrapper: ".js-notifier_full",
          itemsEmptyWrapper: ".js-notifier_empty",
          itemWrapper: ".js-itemWrapper",
          profileLink: ".js-profileLink",
          avatarImage: ".js-avatarImage",
          avatarLink: ".js-avatarLink",
          verifyTooltip: ".js-verifyTooltip",
          messageDate: ".js-messageDate",
          messageText: ".js-messageText",
          buttonAccept: ".js-buttonAccept",
          buttonIgnore: ".js-buttonIgnore",
          ajaxLoader: ".js-ajaxLoader"
      },
      messagesBox: {
          itemTempSelector: "#message-item-temp",
          openerSelector: "#header_nav_messages .rt_icon",
          containerSelector: "#js-liu_messages",
          itemsDataUrl: "",
          itemsNumber: "#header_nav_messages .itemsNumber"
      },
      friendsBox: {
          itemTempSelector: "#friend-item-temp",
          openerSelector: "#header_nav_friends .rt_icon",
          containerSelector: "#js-liu_friends",
          itemsDataUrl: "",
          itemsNumber: "#header_nav_friends .itemsNumber",
          acceptFriendRequestUrl: "",
          ignoreFriendRequestUrl: "",
          acceptedMessage: ".js-acceptedMessage",
          itemContent: ".js-itemContent",
          actionsWrapper: ".js-actionsWrapper"
      },
      notificationsBox: {
          itemTempSelector: "#notification-item-temp",
          openerSelector: "#header_nav_notifications .rt_icon",
          containerSelector: "#js-liu_notifications",
          itemsDataUrl: "",
          itemsNumber: "#header_nav_notifications .itemsNumber"
      },
      userMenuBox: {
          openerSelector: ".js_user_menu_opener",
          containerSelector: ".js_user_menu",
          contentSelector: ".js_user_menu_content",
          contentListSelector: ".user_menu_list",
          topRightHeaderSelector: "#header_right",
          contentHeaderSelector: ".notifier_box_header"
      },
      active_class: "show_dropdown_header"
  },
  n.init = function(e) {
      n.params = $.extend(!0, n.defaultSettings, e),
      n.add_listeners(),
      n.initScroll()
  }
  ,
  n.add_listeners = function() {
      var a;
      $(n.params.notificationsBox.openerSelector).on("click", function(e) {
          e.preventDefault(),
          a = $(n.params.notificationsBox.containerSelector),
          n.showDropdown(e, a),
          a.hasClass(n.params.active_class) && (n.displayNotifications(a),
          $(n.params.notificationsBox.itemsNumber).hide())
      }),
      $(n.params.friendsBox.openerSelector).on("click", function(e) {
          e.preventDefault(),
          a = $(n.params.friendsBox.containerSelector),
          n.showDropdown(e, a),
          a.hasClass(n.params.active_class) && (n.displayFriends(a),
          $(n.params.friendsBox.itemsNumber).hide())
      }),
      $(n.params.messagesBox.openerSelector).on("click", function(e) {
          e.preventDefault(),
          a = $(n.params.messagesBox.containerSelector),
          n.showDropdown(e, a),
          a.hasClass(n.params.active_class) && (n.displayMessages(a),
          $(n.params.messagesBox.itemsNumber).hide())
      }),
      $(n.params.userMenuBox.openerSelector).on("click", function(e) {
          e.preventDefault(),
          n.showDropdown(e, $(n.params.userMenuBox.containerSelector));
          var a = $(n.params.userMenuBox.contentListSelector).height()
            , t = $(window).height() - $(n.params.userMenuBox.topRightHeaderSelector).height() - $(n.params.userMenuBox.contentHeaderSelector).height() - 30;
          $(n.params.userMenuBox.contentSelector).height(a < t ? a : t)
      })
  }
  ,
  n.initScroll = function() {
      $(n.params.userMenuBox.contentSelector).slimScroll({
          size: "8px",
          color: "#202020",
          width: "100%",
          height: "100%",
          disableFadeOut: !0,
          borderRadius: 0,
          opacity: 1
      })
  }
  ,
  n.showDropdown = function(e, a) {
      a.hasClass(n.params.active_class) ? n.closeDropdown() : (n.closeDropdown(),
      a.addClass(n.params.active_class),
      $(document).on("click", function(e) {
          0 == $(e.target).closest("." + n.params.active_class).length && n.closeDropdown()
      })),
      e.stopPropagation()
  }
  ,
  n.closeDropdown = function() {
      $("." + n.params.active_class).removeClass(n.params.active_class),
      $(window).off("click", n.closeDropdown)
  }
  ,
  n.displayNotifications = function(a) {
      $.ajax({
          type: "GET",
          url: n.params.notificationsBox.itemsDataUrl,
          data: {
              limit: 5,
              token: page_params.token
          },
          beforeSend: function() {
              a.find(n.params.boxElemensSelector.itemsFullWrapper).hide(),
              n.displayAjaxLoader(a)
          },
          success: function(e) {
              n.removeAjaxLoader(a),
              e.html ? n.appendNotificationItems(a, e.html) : (a.find(n.params.boxElemensSelector.itemsEmptyWrapper).show(),
              a.find(n.params.boxElemensSelector.itemsFullWrapper).hide())
          },
          error: function() {
              alert(n.params.ajaxFailError)
          }
      })
  }
  ,
  n.displayFriends = function(a) {
      $.ajax({
          type: "GET",
          url: n.params.friendsBox.itemsDataUrl,
          data: {
              limit: 5,
              token: page_params.token
          },
          beforeSend: function() {
              a.find(n.params.boxElemensSelector.itemsFullWrapper).hide(),
              n.displayAjaxLoader(a)
          },
          success: function(e) {
              n.removeAjaxLoader(a),
              e.success || e.datas && 0 < e.datas.length ? n.appendFriendRequestItems(a, e.datas) : (a.find(n.params.boxElemensSelector.itemsEmptyWrapper).show(),
              a.find(n.params.boxElemensSelector.itemsFullWrapper).hide())
          },
          error: function() {
              alert(n.params.ajaxFailError)
          }
      })
  }
  ,
  n.displayMessages = function(a) {
      $.ajax({
          type: "GET",
          url: n.params.messagesBox.itemsDataUrl,
          data: {
              limit: 5,
              token: page_params.token
          },
          beforeSend: function() {
              a.find(n.params.boxElemensSelector.itemsFullWrapper).hide(),
              n.displayAjaxLoader(a)
          },
          success: function(e) {
              n.removeAjaxLoader(a),
              e.success || e.jsonThreads ? n.appendMessageItems(a, e.jsonThreads) : (a.find(n.params.boxElemensSelector.itemsEmptyWrapper).show(),
              a.find(n.params.boxElemensSelector.itemsFullWrapper).hide())
          },
          error: function() {
              alert(n.params.ajaxFailError)
          }
      })
  }
  ,
  n.appendFriendRequestItems = function(e, a) {
      var t = e.find(n.params.boxElemensSelector.itemsEmptyWrapper)
        , r = e.find(n.params.boxElemensSelector.itemsFullWrapper);
      n.clearContentWrapper(r),
      0 == a.length ? (t.show(),
      r.hide()) : (t.hide(),
      r.show(),
      $.each(a, function(e, a) {
          r.append(n.createFriendItem(a))
      }))
  }
  ,
  n.appendNotificationItems = function(e, a) {
      var t = e.find(n.params.boxElemensSelector.itemsEmptyWrapper)
        , r = e.find(n.params.boxElemensSelector.itemsFullWrapper);
      n.clearContentWrapper(r),
      0 == a.length ? (t.show(),
      r.hide()) : (t.hide(),
      r.show(),
      r.html(a))
  }
  ,
  n.appendMessageItems = function(e, a) {
      var t = e.find(n.params.boxElemensSelector.itemsEmptyWrapper)
        , r = e.find(n.params.boxElemensSelector.itemsFullWrapper);
      n.clearContentWrapper(r),
      0 == a.length ? (t.show(),
      r.hide()) : (t.hide(),
      r.show(),
      $.each(a, function(e, a) {
          r.append(n.createMessageItem(a))
      }))
  }
  ,
  n.displayAjaxLoader = function(e) {
      e && e.find(n.params.boxElemensSelector.ajaxLoader).show()
  }
  ,
  n.removeAjaxLoader = function(e) {
      e && e.find(n.params.boxElemensSelector.ajaxLoader).hide()
  }
  ,
  n.clearContentWrapper = function(e) {
      e && e.empty()
  }
  ,
  n.createMessageItem = function(a) {
      var e = $($(n.params.messagesBox.itemTempSelector).html());
      return e.find(n.params.boxElemensSelector.avatarLink).attr("href", a.profileLink),
      e.find(n.params.boxElemensSelector.avatarImage).attr("src", a.profileImage),
      e.find(n.params.boxElemensSelector.messageText).text(a.lastMessageReceived),
      e.find(n.params.boxElemensSelector.messageText).attr("href", a.link),
      e.find(n.params.boxElemensSelector.messageDate).text(a.lastActionNice),
      e.find(n.params.boxElemensSelector.profileLink).append(a.profileLinkOnline),
      e.click(function(e) {
          window.location.href = a.link
      }),
      e
  }
  ,
  n.createNotificationItem = function(e) {
      var a = $(n.params.notificationsBox.itemTempSelector).clone(!0);
      return a.find(n.params.boxElemensSelector.profileLink).text(e.profileLink),
      a.find(n.params.boxElemensSelector.avatarLink).attr("href", e.profileLink),
      a.find(n.params.boxElemensSelector.avatarImage).attr("src", e.avatarImage),
      a.find(n.params.boxElemensSelector.messageDate).text(e.messageDate),
      a.find(n.params.boxElemensSelector.messageText).text(e.messageText),
      e.html
  }
  ,
  n.createFriendItem = function(e) {
      var a = $($(n.params.friendsBox.itemTempSelector).html());
      a.find(n.params.boxElemensSelector.profileLink).attr("href", e.user_link),
      a.find(n.params.boxElemensSelector.profileLink).text(e.username),
      a.find(n.params.boxElemensSelector.avatarLink).attr("href", e.user_link),
      a.find(n.params.boxElemensSelector.avatarImage).attr("src", e.avatar_url),
      a.find(n.params.boxElemensSelector.messageText).text(e.message),
      a.find(n.params.boxElemensSelector.messageDate).text(e.request_date);
      var t = a.find(n.params.boxElemensSelector.buttonIgnore)
        , r = a.find(n.params.boxElemensSelector.buttonAccept);
      return t.attr("data-friendId", e.user_id),
      r.attr("data-friendId", e.user_id),
      r.click(function(e) {
          n.doAcceptFriend(e)
      }),
      t.click(function(e) {
          n.doIgnoreFriend(e)
      }),
      a
  }
  ,
  n.doAcceptFriend = function(e) {
      var a = $(e.currentTarget).attr("data-friendId")
        , t = $(e.currentTarget).closest(n.params.boxElemensSelector.itemWrapper)
        , r = t.find(n.params.friendsBox.itemContent);
      n.displayAjaxLoader(t),
      $.ajax({
          type: "GET",
          url: n.params.friendsBox.acceptFriendRequestUrl,
          data: {
              token: page_params.token,
              id: a
          },
          success: function(e) {
              "OK" == e ? (n.removeAjaxLoader(t),
              t.find(n.params.friendsBox.actionsWrapper).remove(),
              r.find(n.params.friendsBox.acceptedMessage).show().nextAll().remove()) : alert(n.params.ajaxFailError)
          },
          error: function(e) {
              alert(n.params.ajaxFailError)
          }
      })
  }
  ,
  n.doIgnoreFriend = function(a) {
      var e = $(a.currentTarget).attr("data-friendId");
      $.ajax({
          type: "GET",
          url: n.params.friendsBox.ignoreFriendRequestUrl,
          data: {
              token: page_params.token,
              id: e
          },
          success: function(e) {
              "OK" == e ? $(a.currentTarget).closest(n.params.boxElemensSelector.itemWrapper).remove() : alert(n.params.ajaxFailError)
          },
          error: function(e) {
              alert(n.params.ajaxFailError)
          }
      })
  }
};
try {
  var header_liu_actions = new Header_Liu_Actions;
  header_liu_actions.init(page_params.header_liu_actions_setup)
} catch (e) {
  console.log(e),
  console.log("error in Header_Liu_Actions")
}
function getChrome69Version() {
  var e = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
  return null != e && 5 == e.length && "69" === e[1] && Number(e[1] + "." + e[2] + e[3] + e[4]) < 69.034971
}
var isScrolling, isChrome69 = getChrome69Version();
isChrome69 && window.addEventListener("scroll", function(e) {
  window.clearTimeout(isScrolling),
  isScrolling = setTimeout(function() {
      for (var e = document.querySelectorAll("iframe"), a = 0; a < e.length; a++) {
          var t = e[a]
            , r = t.offsetHeight;
          t.style.height = r + 1 + "px",
          t.offsetHeight,
          t.style.height = r + "px"
      }
  }, 66)
}, !1);
var headerSearch = function() {
  "use strict";
  var r = this;
  r.defaultSettings = {
      unselected_search_type: $("li#header_search_dropdown_unselected"),
      selected_search_type: $("li#header_search_dropdown_selected"),
      search_input_element: $("#header_search_field"),
      search_term_remover: $(".js_term_remover"),
      search_dropdown_wrap: $("#header_search_dropdown_wrap"),
      search_dropdown_toggle: $(".js_search_toggle"),
      search_dropdown_toggle_class: "open_search",
      search_type_elem: $(".search_type_filter"),
      segmentGay: page_params.global.networkSegment,
      header_search: $("#header_search"),
      header_search_arrow: $(".header_search_arrow"),
      iconTriangleUpClass: "rotate180"
  },
  r.init = function(e) {
      r.params = $.extend(!0, r.defaultSettings, e),
      r.add_listeners()
  }
  ,
  r.add_listeners = function() {
      r.params.search_dropdown_toggle.on("click", function() {
          r.params.search_dropdown_wrap.toggleClass(r.params.search_dropdown_toggle_class),
          r.toggleIconTriangle(r.params.header_search_arrow),
          r.hideTrending()
      }),
      r.params.search_type_elem.on("click", function() {
          r.changeTypeValue($(this))
      }),
      r.params.search_input_element.on("focus focusin click keyup", function() {
          $(this).attr("placeholder", ""),
          r.closeTypeDropdown(),
          0 == this.value.length ? r.showTrending() : r.hideTrending()
      }).on("blur", function() {
          $(this).attr("placeholder", $(this).attr("data-placeholder")),
          r.hideTrending()
      }),
      r.params.search_input_element.on("keypress", function() {
          r.params.search_term_remover.show()
      }),
      r.params.search_term_remover.on("click", function(e) {
          e.stopPropagation(),
          e.preventDefault(),
          r.params.search_input_element.val(""),
          r.params.search_term_remover.hide()
      }),
      $("#js_header_search").submit(function(e) {
          if (e.preventDefault(),
          r.params.search_input_element.val().replace(/\s/g, "").length) {
              var a = $(".search_type_filter.selected_type").attr("data-value")
                , t = r.searchTermSeoRefiner(r.params.search_input_element.val()).replace(/ /g, "+");
              switch (a) {
              case "photo":
                  window.location = page_params.search.searchUrlPhoto + t;
                  break;
              case "cam":
                  window.location = page_params.search.searchUrlCam + t;
                  break;
              case "video":
              default:
                  window.location = page_params.search.searchUrlVideo + t
              }
          }
          return !1
      }),
      $(".search_gay_tag_X").on("click", function() {
          $(".search_gay_tag").hide(),
          $("#search_form_wrapper").removeClass("gay"),
          r.params.segmentGay = 0
      })
  }
  ,
  r.showTrending = function() {
      r.params.header_search.addClass("show_trending")
  }
  ,
  r.hideTrending = function() {
      r.params.header_search.removeClass("show_trending")
  }
  ,
  r.toggleIconTriangle = function(e) {
      e.hasClass(r.params.iconTriangleUpClass) ? e.removeClass(r.params.iconTriangleUpClass) : e.addClass(r.params.iconTriangleUpClass)
  }
  ,
  r.changeTypeValue = function(e) {
      var a = e.html().trim();
      $(".header_search_selected_label").html(a),
      r.hideSelectedElem(e),
      r.closeTypeDropdown()
  }
  ,
  r.hideSelectedElem = function(e) {
      $(".search_type_filter.selected_type").removeClass("selected_type"),
      e.addClass("selected_type")
  }
  ,
  r.closeTypeDropdown = function() {
      r.params.search_dropdown_wrap.removeClass(r.params.search_dropdown_toggle_class),
      r.params.header_search_arrow.removeClass(r.params.iconTriangleUpClass)
  }
  ,
  r.searchTermSeoRefiner = function(e) {
      return e = (e = (e = (e = (e = e.toLowerCase()).replace(/[.]/g, ".")).replace(/(^([.]))| ([.]\b)|([.]$)|(\b[.]\s+)/g, " ")).replace(/\s{1,} /g, " ")).replace(/["]{1,}/g, '"'),
      e = (e = encodeURIComponent(e)).replace(/%20/g, "+"),
      e = $.trim(e)
  }
};
try {
  var header_search = new headerSearch;
  header_search.init(page_params.header_search)
} catch (e) {
  console.log(e)
}
try {
  var Simple_dropdown = function(e, a) {
      "use strict";
      var t = this
        , r = {
          drpd_item: ".js_drpd_item",
          drpd_item_selected: ".js_drpd_item_selected",
          drpd_items_container: ".js_drpd_items_container",
          drpd_arrow: ".js_drpd_arrow",
          drpd_error: ".js_drpd_error",
          drpd_body: ".js_drpd_body"
      };
      t.init = function() {
          t.template = typeof e == $ ? e : $(e),
          t.options = $.extend(r, a),
          t.find_elements(),
          t.register_callbacks(),
          t.add_listeners(),
          t.bind_to_template()
      }
      ,
      t.find_elements = function() {
          t.item = t.template.find(t.options.drpd_item),
          t.item_selected = t.template.find(t.options.drpd_item_selected),
          t.items_container = t.template.find(t.options.drpd_items_container),
          t.arrow = t.template.find(t.options.drpd_arrow),
          t.error = t.template.find(t.options.drpd_error),
          t.body = t.template.find(t.options.drpd_body)
      }
      ,
      t.add_listeners = function() {
          t.body.off("click").on("click", function(e) {
              t.remove_error(),
              t.items_container.slideToggle("fast")
          }),
          t.body.off("mouseleave").mouseleave(function() {
              t.items_container.slideUp(),
              t.arrow.removeClass("open")
          }),
          t.item.off("click").on("click", function(e) {
              var a = {
                  selectedItemValue: $(e.target).data("value"),
                  selectedItemText: $(e.target).html()
              };
              t.item_selected.attr("data-value", a.selectedItemValue),
              t.item_selected.html(a.selectedItemText),
              t.template.trigger("optionSelected", a)
          })
      }
      ,
      t.register_callbacks = function() {
          t.template.off("optionSelected").on("optionSelected", function(e, a) {
              t.options.optionSelected && t.options.optionSelected(e, a)
          })
      }
      ,
      t.bind_to_template = function() {
          t.template.data("rtController", t)
      }
      ,
      t.do_validation = function() {
          if (t.options.validator) {
              var e = t.options.validator(t.get_value());
              return e.result ? t.remove_error() : t.show_error(e.message),
              e.result
          }
          return !0
      }
      ,
      t.get_value = function() {
          return $.trim(t.item_selected.attr("data-value"))
      }
      ,
      t.set_value = function(e) {
          t.item_selected.attr("data-value", e)
      }
      ,
      t.is_valid = function() {
          return t.do_validation()
      }
      ,
      t.show_error = function(e) {
          t.error.text(e),
          t.error.show()
      }
      ,
      t.remove_error = function() {
          t.error.hide()
      }
      ,
      t.set_default = function() {
          t.item_selected.data("value", t.template.data("default-value")),
          t.item_selected.html(t.template.data("default-display"))
      }
      ,
      t.disable_fadeout = function() {
          t.reset(),
          t.template.fadeOut()
      }
      ,
      t.enable_fadein = function() {
          t.reset(),
          t.template.fadeIn()
      }
      ,
      t.reset = function() {
          t.remove_error(),
          t.items_container.hide(),
          t.set_default()
      }
      ,
      t.destroy = function() {
          t.template.remove(),
          t = null
      }
      ,
      t.init()
  }
} catch (e) {
  console.log(e),
  console.log("error in rt_simple_dropdown")
}
var HeaderAdvancedSearch = function() {
  "use strict";
  var s = this;
  s.reset_dropdown_callback = null,
  s.defaultSettings = {
      defaultMin: 0,
      defaultMax: 60,
      advancedSearchContainer: "#advanced_search_wrapper",
      openLoginForm: "#header_login",
      closeAdvancedSearch: ".advanced_search_close",
      open_advanced_search: ".autocomplete_type_advanced_search",
      resetAdvancedSearch: "#js_advanced_search_reset",
      asSubmitButton: "#js_advanced_search",
      asMinutesTextMin: ".minutes_min",
      asMinutesTextMax: ".minutes_max",
      asMinutesInputMin: "#as_min_duration",
      asMinutesInputMax: "#as_max_duration",
      asSearch: "#as_search_term",
      asCategory: "#as_category",
      asHd: "#as_hd",
      asForm: "#js_advanced_search",
      asSlider: "#minutes_slider",
      autoSearch: !1
  },
  s.init = function(e) {
      s.params = $.extend(!0, s.defaultSettings, e),
      s.add_listeners(),
      s.slider_init()
  }
  ,
  s.add_listeners = function() {
      $(s.params.closeAdvancedSearch).click(function() {
          s.close_advanced_search_form()
      }),
      $(s.params.openLoginForm).click(function() {
          s.close_advanced_search_form()
      }),
      $(s.params.open_advanced_search).click(function() {
          s.open_advanced_search_form()
      }),
      $(s.params.resetAdvancedSearch).click(function() {
          s.reset_advanced_search_form()
      }),
      $(s.params.asSubmitButton).submit(function() {
          var e = $(s.params.asSearch);
          if (e.val().replace(/\s/g, "").length) {
              var a = $(s.params.asCategory).val()
                , t = $(s.params.asMinutesInputMin).val()
                , r = $(s.params.asMinutesInputMax).val()
                , n = $(s.params.asHd).is(":checked") ? 1 : 0
                , i = e.val().replace(/ /g, "+")
                , o = page_params.search.searchUrlVideo + i;
              a && (o += "&category=" + a),
              (t && t != s.params.defaultMin || r && r != s.params.defaultMax) && (o += "&min_duration=" + t + "&max_duration=" + r),
              n && (o += "&hd=" + n),
              window.location.href = o
          }
          return !1
      })
  }
  ,
  s.slider_init = function() {
      var e = $(s.params.asSlider);
      e.slider({
          range: !0,
          min: 0,
          max: 60,
          values: [e.data("min-value"), e.data("max-value")],
          slide: function(e, a) {
              $(s.params.asMinutesInputMin).val(a.values[0]),
              $(s.params.asMinutesInputMax).val(a.values[1]),
              $(s.params.asMinutesTextMin).text(a.values[0] + " - "),
              50 != a.values[1] ? $(s.params.asMinutesTextMax).text(a.values[1]) : $(s.params.asMinutesTextMax).text(a.values[1] + "+")
          }
      })
  }
  ,
  s.close_advanced_search_form = function() {
      $(s.params.advancedSearchContainer).slideUp(),
      s.reset_advanced_search_form()
  }
  ,
  s.open_advanced_search_form = function() {
      $(s.params.advancedSearchContainer).slideDown()
  }
  ,
  s.reset_advanced_search_form = function() {
      $(s.params.asSlider).slider({
          values: [s.params.defaultMin, s.params.defaultMax]
      }),
      $(s.params.asMinutesTextMin).text(s.params.defaultMin + " - "),
      $(s.params.asMinutesTextMax).text(s.params.defaultMax + "+"),
      s.reset_dropdown_callback && s.reset_dropdown_callback(),
      $(s.params.asHd).attr("checked", !1),
      $(s.params.asForm)[0].reset()
  }
  ,
  s.category_option_selected = function(e, a) {
      $(s.params.asCategory).val(a.selectedItemValue),
      $(s.params.asCategory + 'option[value="' + a.selectedItemValue + '"]').attr("selected", "selected")
  }
};
try {
  var headerAdvancedSearch = new HeaderAdvancedSearch;
  if (headerAdvancedSearch.init(page_params.headerAdvancedSearch),
  page_params.simple_dropdown) {
      page_params.simple_dropdown.optionSelected = headerAdvancedSearch.category_option_selected;
      var categories_dropdown = new Simple_dropdown($(".rt_simple_dropdown"),page_params.simple_dropdown);
      headerAdvancedSearch.reset_dropdown_callback = function() {
          categories_dropdown.reset()
      }
  }
} catch (e) {
  console.log(e),
  console.log("error in header_advanced_search")
}
var HeaderAutocomplete = function() {
  "use strict";
  var l = this;
  l.defaultSettings = {
      searchField: "#header_search_field",
      showTrending: !1,
      trendingSearchesDiv: ".search_bar_trending"
  },
  l.init = function(e) {
      l.params = $.extend(!0, l.defaultSettings, e),
      l.autocomplete_class = "",
      l.autocomplete_init(),
      l.initTrendingSearch()
  }
  ,
  l.autocomplete_init = function() {
      $(l.params.searchField).autocomplete({
          appendTo: "#header_search",
          source: function(r, n) {
              $.ajax({
                  url: l.params.autocompleteAjax,
                  data: {
                      pornstars: "true",
                      token: page_params.token,
                      orientation: "straight",
                      q: r.term,
                      alt: 0
                  },
                  success: function(e) {
                      var a = $(".search_type_filter.selected_type").attr("data-value")
                        , t = l.formatData(e, a, r.term);
                      n(t)
                  }
              })
          },
          minLength: 3,
          select: function(e, a) {
              a.item.url ? window.location = a.item.url : "advanced_search" == a.item.type && l.openAdvancedSearch()
          },
          focus: function(e, a) {
              a.item.label && a.item.value && (a.item.label = a.item.label.replace(/<b>/g, ""),
              a.item.label = a.item.label.replace(/<\/b>/g, ""),
              a.item.value = a.item.value.replace(/<b>/g, ""),
              a.item.value = a.item.value.replace(/<\/b>/g, ""))
          },
          open: function(e, a) {
              l.closeTrending()
          }
      }).data("ui-autocomplete")._renderItem = function(e, a) {
          var t = "autocomplete_type_" + a.type;
          l.autocomplete_class != a.type && (l.autocomplete_class = a.type,
          t += " first_in_grp",
          "advanced_search" != a.type && $("<li>").addClass("search_bar_header").append(a.typeText).appendTo(e));
          var r = "";
          if (a.rank) {
              var n = "th";
              switch (a.rank.toString().split("").pop()) {
              case "1":
                  n = "st";
                  break;
              case "2":
                  n = "nd";
                  break;
              case "3":
                  n = "rd"
              }
              2 == a.rank.toString().length && (n = "th"),
              r = "<span class='autocomplete_rank'> " + a.rank + n + " " + l.params.text.rank + "</span>"
          }
          return "advanced_search" == a.type ? $("<li>").append("<a class='" + t + "'>" + a.name + "</a>").appendTo(e) : $("<li>").append("<a class='" + t + "' href='" + a.url + "'>" + a.label + r + "</a>").appendTo(e)
      }
  }
  ,
  l.initTrendingSearch = function() {
      $(l.params.searchField).on("focus", function() {
          l.openTrending()
      }).on("focusout", function() {
          setTimeout(function() {
              l.closeTrending()
          }, 200)
      }).on("input", function(e) {
          setTimeout(function() {
              l.closeTrending()
          }, 200),
          3 <= $(l.params.searchField).val().length && $(l.params.searchField).autocomplete("search")
      }).on("click", function() {
          l.params.showTrending = !0,
          l.openTrending()
      })
  }
  ,
  l.openTrending = function() {
      l.params.showTrending && (2 <= $(l.params.searchField).val().length ? $(l.params.searchField).autocomplete("search") : 0 == $(l.params.searchField).val().length && $(l.params.trendingSearchesDiv).addClass("active"))
  }
  ,
  l.closeTrending = function() {
      $(l.params.trendingSearchesDiv).hasClass("active") && $(l.params.trendingSearchesDiv).removeClass("active")
  }
  ,
  l.openAdvancedSearch = function() {
      $("#advanced_search_wrapper").slideDown(),
      $("#login_form").slideUp(),
      0 < $(l.params.searchField).val().length && ($("#as_search_term").val($("#header_search_field").val()),
      $("#as_search_term").focus())
  }
  ,
  l.formatData = function(e, a, r) {
      var n = []
        , i = ""
        , o = ""
        , s = "";
      if (o = "video" == a ? "video" : "photo",
      e.queries && (e.queries.forEach(function(e) {
          var a = e.replace(/ /g, "+");
          "video" === o ? (i = page_params.search.searchUrlVideo + a,
          s = l.params.text.video) : (i = page_params.search.searchUrlPhoto + a,
          s = l.params.text.photo);
          var t = {
              label: l.formatLabel(e, r, !1),
              type: o.toLowerCase(),
              typeText: s,
              url: i
          };
          n.push(t)
      }),
      e.pornstars.forEach(function(e) {
          var a = {
              label: l.formatLabel(e.name, r, !0),
              type: "pornstar",
              typeText: l.params.text.pornstar,
              rank: e.rank,
              url: "/pornstar/" + e.slug
          };
          n.push(a)
      }),
      e.channels.forEach(function(e) {
          var a = {
              label: l.formatLabel(e.name, r, !0),
              type: "channel",
              typeText: l.params.text.channel,
              rank: e.rank,
              url: "/channels/" + e.slug
          };
          n.push(a)
      })),
      "video" == o) {
          var t = {
              name: l.params.text.advancedSearch,
              type: "advanced_search"
          };
          n.push(t)
      }
      return n
  }
  ,
  l.formatLabel = function(e, a, t) {
      var r = new RegExp(a,"gi")
        , n = a.substr(0, 1).toUpperCase() + a.substr(1);
      return e ? 1 == t ? e.replace(r, "<b>" + n + "</b>") : e.replace(r, "<b>" + a + "</b>") : e
  }
};
try {
  var header_autocomplete = new HeaderAutocomplete;
  header_autocomplete.init(page_params.header_autocomplete)
} catch (e) {
  console.log("error in header_autocomplete"),
  console.log(e)
}
var Language_Switch = function() {
  "use strict";
  var t = this;
  t.defaultSettings = {
      langSwitch_class: "js-lang-switch",
      closeNotification_class: "redirect_close_btn",
      messageBox_id: "lang_redirect_msg",
      language: page_params.global.usedLanguage
  },
  t.init = function(e) {
      t.params = $.extend(!0, t.defaultSettings, e),
      t.params.domain = t.splitHostname().mainDomain,
      t.addListeners();
      var a = t.getLanguageCookie();
      a ? a.showMsg && t.changeCookie(t.params.language, !1, t.params.domain) : t.changeCookie(t.params.language, !1, t.params.domain)
  }
  ,
  t.addListeners = function() {
      $("." + t.params.langSwitch_class).on("click", function(e) {
          t.switchLanguage(this)
      }),
      $("." + t.params.closeNotification_class).on("click", function(e) {
          $("#" + t.params.messageBox_id).hide(),
          t.changeCookie(t.params.language, !1, t.params.domain)
      })
  }
  ,
  t.getLanguageCode = function(e) {
      var a = $(e).data("lang");
      return void 0 !== a && a
  }
  ,
  t.getEventAction = function(e) {
      var a = $(e).data("event-action");
      return void 0 !== a && a
  }
  ,
  t.getLanguageCookie = function() {
      var e = MG_Utils.getCookie("language");
      return !!e && JSON.parse(e)
  }
  ,
  t.changeCookie = function(e, a, t) {
      var r = new Date
        , n = JSON.stringify({
          lang: e,
          showMsg: a
      });
      r.setTime(r.getTime() + 2592e6),
      document.cookie = "language=" + n + ";path=/;domain=" + t + "; expires=" + r.toUTCString()
  }
  ,
  t.switchLanguage = function(e) {
      var a = t.getLanguageCode(e);
      a && t.changeCookie(a, !0, t.params.domain)
  }
  ,
  t.splitHostname = function() {
      var e = {}
        , a = new RegExp("([a-z-0-9]{2,63}).([a-z.]{2,5}([a-z]{2,5})?)$").exec(window.location.hostname);
      return e.mainDomain = a[0],
      e.domain = a[1],
      e.type = a[2],
      e.subdomain = window.location.hostname.replace(e.domain + "." + e.type, "").slice(0, -1),
      e
  }
};
try {
  var my_Language_Switch = new Language_Switch;
  my_Language_Switch.init(page_params.language_system_setup)
} catch (e) {
  console.log("ERROR === Language_System ==="),
  console.log(e)
}
var Premium_button = function() {
  "use strict";
  var r = this;
  r.init = function(e) {
      r.params = e,
      page_params.user.isPremium || (r.params.has_slider = void 0 !== r.params.has_slider && r.params.has_slider,
      r.add_listeners(),
      r.initSlider())
  }
  ,
  r.add_listeners = function() {
      var t = $("#" + r.params.modal_overlay_id);
      $("." + r.params.btn_class).click(function() {
          var e = $(this).attr("data-popup_redirection_url")
            , a = $(this).attr("data-modal_name");
          if (!a)
              return window.open(e),
              !1;
          r.open_modal(r.detectModal(a), t, e)
      }),
      $("#" + r.params.btn_close_modal_id).click(function() {
          $("#" + r.params.modal_id).hide(),
          $("#" + r.params.modal_overlay_id).hide()
      }),
      t.click(function(e) {
          $("#" + r.params.modal_id).hide(),
          $("#" + r.params.modal_overlay_id).hide()
      })
  }
  ,
  r.detectModal = function(e) {
      switch (e) {
      case "modal1":
          r.params.modal_id = "premium_modal_1";
          break;
      case "modal2":
          r.params.modal_id = "premium_modal_2"
      }
      var a = $("#" + r.params.modal_id);
      return a.click(function(e) {
          0 === $(e.target).closest($("." + r.params.modal_content)).length && ($("#" + r.params.modal_id).hide(),
          $("#" + r.params.modal_overlay_id).hide())
      }),
      a
  }
  ,
  r.open_modal = function(e, a, t) {
      e.show(),
      a.show(),
      $("#" + r.params.premium_btn).attr("href", t)
  }
  ,
  r.initSlider = function() {
      r.params.has_slider && $("#owl-premium").owlCarousel({
          items: 1,
          autoplay: !0,
          loop: !0
      })
  }
}
, my_premium = new Premium_button;
my_premium.init(page_params.premium_button);
var Ads_free_modal = function() {
  "use strict";
  var r = this;
  r.defaultSettings = {},
  r.init = function(e) {
      r.params = $.extend(!0, r.defaultSettings, e),
      r.events()
  }
  ,
  r.events = function() {
      if (r.params.is_displayed) {
          MG_Utils.ajaxCall({
              url: r.params.notify_url,
              type: "POST",
              crossDomain: !0
          });
          var e = document.getElementById(r.params.close_btn_id)
            , a = document.getElementById(r.params.modal_id)
            , t = document.getElementById(r.params.btn_no_thanks_2_id);
          e.addEventListener && e.addEventListener("click", function() {
              a.style.display = "none"
          }),
          t.addEventListener && t.addEventListener("click", function() {
              a.style.display = "none"
          })
      }
  }
};
try {
  var my_Ads_free_modal = new Ads_free_modal;
  my_Ads_free_modal.init(page_params.ads_free_modal)
} catch (e) {
  console.log("ERROR === Ads_free_modal ==="),
  console.log(e)
}
var Utah_disclaimer = function() {
  "use strict";
  var a = this;
  a.init = function(e) {
      a.params = e,
      a.add_listeners()
  }
  ,
  a.toggle_class = function() {
      $("." + a.params.check_combo).toggleClass(a.params.class_toggle)
  }
  ,
  a.set_cookie = function() {
      if (!0 === $("#" + a.params.checkbox_trigger).hasClass(a.params.class_toggle)) {
          var e = new Date;
          e.setTime(e.getTime() + 31556926e3),
          document.cookie = "accessPH=1;expires=" + e.toUTCString() + ";path=/",
          $("#" + a.params.utah_disclaimer_wrapper).remove(),
          $("#" + a.params.modal_content).remove(),
          $("#" + a.params.modal).remove()
      }
  }
  ,
  a.add_listeners = function() {
      var e = "mousedown";
      $("#" + a.params.checkbox_trigger).on(e, function() {
          a.toggle_class()
      }),
      $("#" + a.params.submit_button).on(e, function() {
          a.set_cookie()
      })
  }
};
try {
  if (void 0 !== page_params.utah_disclaimer) {
      var my_disclaimer = new Utah_disclaimer;
      my_disclaimer.init(page_params.utah_disclaimer)
  }
} catch (e) {
  console.log(e)
}
var LoginForm = function() {
  "use strict";
  var m = this;
  m.defaultSettings = {
      mainLoginDiv_id: "login_form",
      disableLoginDiv_class: "disable_login_container",
      usernameInput_id: "login_username",
      passwordInput_id: "login_password",
      activeSubMenu_class: "sub_menu_active",
      login_submit: "js-loginSubmitModal",
      ga_logged_in: {
          default_ga_category: "Logins",
          default_ga_action: page_params.global.platform + " logged in",
          default_ga_label: "Logged in"
      }
  },
  m.init = function(e) {
      m.params = $.extend(!0, m.defaultSettings, e),
      m.add_listeners(),
      m.recaptchaEnable = m.isRecaptchaEnable()
  }
  ,
  m.add_listeners = function() {
      $(".login_form_X").click(function() {
          m.params.disableLogin ? $("." + m.params.disableLoginDiv_class).slideUp() : $("#" + m.params.mainLoginDiv_id).slideUp(),
          m.resetErrorMessages(),
          $('input[name="username"]').val(""),
          $('input[name="password"]').val("")
      }),
      $("#js_loginform").on("submit", function(e) {
          e.preventDefault(),
          e.stopImmediatePropagation(),
          m.submitLogin()
      }),
      $(".login_rt_premium_btn").click(function() {
          m.openOauthDialog("/rtplogin")
      }),
      $(".js_pornhub_login").click(function() {
          m.openOauthDialog("/phlogin")
      })
  }
  ,
  m.submitLogin = function() {
      var e = $("#" + m.params.usernameInput_id)
        , a = $("#" + m.params.passwordInput_id)
        , t = e.val()
        , r = a.val()
        , n = $("#login_checkbox").is(":checked") ? 1 : 0
        , i = $('input[name="redirect"]').val()
        , o = $('input[name="token"]').val()
        , s = $('input[name="from"]').val()
        , l = !!m.recaptchaEnable && grecaptcha.getResponse(page_params.recaptchas.loginRecaptcha);
      if (m.resetErrorMessages(),
      "" == t)
          return $("#error_username").show(),
          e.addClass("login_error"),
          !1;
      if ("" == r)
          return $("#error_password").show(),
          a.addClass("login_error"),
          !1;
      if (!m.recaptchaEnable || "" !== l) {
          var c = "redirect=" + i + "&token=" + o + "&remember_me=" + n + "&from=" + s + "&username=" + t + "&password=" + r;
          l && (c = c + "&g-recaptcha-response=" + l);
          var d = new XMLHttpRequest;
          return d.open("POST", "/authenticate/authenticate", !0),
          d.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
          d.onreadystatechange = function() {
              if (4 === d.readyState)
                  if (200 <= d.status && d.status < 400) {
                      var e = JSON.parse(d.responseText);
                      m.callbackSuccess(e),
                      m.send_ga_event($(this))
                  } else
                      location.reload
          }
          ,
          d.send(c),
          !1
      }
      alert("Captcha missing")
  }
  ,
  m.send_ga_event = function() {
      var e = $("." + m.params.login_submit)
        , a = e.data("ga-category") ? e.data("ga-category") : m.params.ga_logged_in.default_ga_category
        , t = e.data("ga-action") ? e.data("ga-action") : m.params.ga_logged_in.default_ga_action
        , r = e.data("ga-label") ? e.data("ga-label") : m.params.ga_logged_in.default_ga_label;
      ga("send", {
          hitType: "event",
          eventCategory: a,
          eventAction: t,
          eventLabel: r,
          nonInteraction: 1
      })
  }
  ,
  m.callbackSuccess = function(e) {
      e.redirect ? document.location.assign(e.redirect) : e.recaptcha && 0 == m.recaptchaEnable ? document.location.reload() : (m.recaptchaEnable && grecaptcha.reset(page_params.recaptchas.loginRecaptcha),
      e.messageLink ? $(".invalid_error_msg").addClass("big_error").html(e.message + '</br><a href="' + e.redirectUrl + '">' + e.messageLink + "</a>") : $(".invalid_error_msg").text(e.message),
      $(".invalid_error_msg").show())
  }
  ,
  m.resetErrorMessages = function() {
      $("#error_username").hide(),
      $("#error_password").hide(),
      $(".invalid_error_msg").hide(),
      $('input[name="username"]').removeClass("login_error"),
      $('input[name="password"]').removeClass("login_error")
  }
  ,
  m.openOauthDialog = function(e) {
      var a = (screen.width - 540) / 2
        , t = (screen.height - 465) / 4
        , r = window.open(e, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=540, height=465, top=" + t + ", left=" + a)
        , n = setInterval(function() {
          try {
              (null == r || r.closed) && (window.clearInterval(n),
              location.reload())
          } catch (e) {
              errorHandler(e)
          }
      }, 500)
  }
  ,
  m.isRecaptchaEnable = function() {
      var e = $("#loginRecaptcha .g-recaptcha-response").val();
      return null != e && "undefined" != e && (m.trigger_login_form(),
      !0)
  }
};
try {
  var login_form = new LoginForm;
  login_form.init(page_params.loginForm)
} catch (e) {
  console.log(e),
  console.log("error in login_form")
}
var Age_disclaimer = function() {
  "use strict";
  var a = this;
  a.init = function(e) {
      a.params = e,
      a.add_listeners(),
      page_params.disclaimer && ($("body").addClass("disclaimer"),
      $("#header_search_field").prop("disabled", !0))
  }
  ,
  a.close_it = function() {
      var e = new Date;
      e.setTime(e.getTime() + 31556926e3),
      document.cookie = a.params.cookie_name + "=1;expires=" + e.toUTCString() + ";path=/",
      $("body").removeClass("disclaimer"),
      $("#header_search_field").prop("disabled", !1),
      $("#" + a.params.modal_id).remove()
  }
  ,
  a.add_listeners = function() {
      $("#" + a.params.agree_btn_id).on("mousedown", function() {
          a.close_it()
      })
  }
};
try {
  if (void 0 !== page_params.age_disclaimer) {
      var my_age_disclaimer = new Age_disclaimer;
      my_age_disclaimer.init(page_params.age_disclaimer)
  }
} catch (e) {
  console.log(e)
}
var LazyLoadImage = function() {
  "use strict";
  var t = this;
  t.init = function(e) {
      t.params = e,
      t.replaceImage(),
      t.replaceBackground(),
      t.replace_section()
  }
  ,
  t.replaceImage = function() {
      void 0 !== t.params.class_name && void 0 !== t.params.class_name && $("." + t.params.class_name).each(function() {
          var e = $(this).data(t.params.dataSrc);
          $(this).attr("src", e)
      })
  }
  ,
  t.replaceBackground = function() {
      void 0 !== t.params.classBkg && t.params.dataBkg && $("." + t.params.classBkg).each(function() {
          var e = $(this).data(t.params.dataBkg);
          $(this).css("background-image", "url(" + e + ")")
      })
  }
  ,
  t.replace_section = function() {
      if (void 0 !== t.params.sections && void 0 !== t.params.thumbUrl)
          for (var e = 0, a = t.params.sections.length; e < a; e++)
              $("#" + t.params.sections[e] + " li img").each(function() {
                  $(this).attr("src", $(this).data(t.params.thumbUrl))
              })
  }
}
, lazyloadBrowserCheck = !MG_Utils.browser.iOSversion() || 9 < MG_Utils.browser.iOSversion();
if ("function" == typeof $(document).ready && lazyloadBrowserCheck)
  $(document).ready(function() {
      (new LazyLoadImage).init(page_params.lazyLoad)
  });
else {
  var myRawLazy = new LazyLoadImage;
  myRawLazy.init(page_params.lazyLoad)
}
!function(d, l, c) {
  function m(e, a, t) {
      var r = l.createElement(e);
      return a && (r.id = Z + a),
      t && (r.style.cssText = t),
      d(r)
  }
  function p() {
      return c.innerHeight ? c.innerHeight : d(c).height()
  }
  function u(e, t) {
      t !== Object(t) && (t = {}),
      this.cache = {},
      this.el = e,
      this.value = function(e) {
          var a;
          return void 0 === this.cache[e] && (void 0 !== (a = d(this.el).attr("data-cbox-" + e)) ? this.cache[e] = a : void 0 !== t[e] ? this.cache[e] = t[e] : void 0 !== J[e] && (this.cache[e] = J[e])),
          this.cache[e]
      }
      ,
      this.get = function(e) {
          var a = this.value(e);
          return d.isFunction(a) ? a.call(this.el, this) : a
      }
  }
  function i(e) {
      var a = E.length
        , t = (O + e) % a;
      return t < 0 ? a + t : t
  }
  function h(e, a) {
      return Math.round((/%/.test(e) ? ("x" === a ? L.width() : p()) / 100 : 1) * parseInt(e, 10))
  }
  function g(e, a) {
      return e.get("photo") || e.get("photoRegex").test(a)
  }
  function f(e, a) {
      return e.get("retinaUrl") && 1 < c.devicePixelRatio ? a.replace(e.get("photoRegex"), e.get("retinaSuffix")) : a
  }
  function _(e) {
      "contains"in S[0] && !S[0].contains(e.target) && e.target !== w[0] && (e.stopPropagation(),
      S.focus())
  }
  function v(e) {
      v.str !== e && (S.add(w).removeClass(v.str).addClass(e),
      v.str = e)
  }
  function b(e) {
      d(l).trigger(e),
      se.triggerHandler(e)
  }
  function r(e) {
      var a, t;
      if (!G) {
          if (a = d(e).data(Q),
          A = new u(e,a),
          t = A.get("rel"),
          O = 0,
          t && !1 !== t && "nofollow" !== t ? (E = d("." + ee).filter(function() {
              return new u(this,d.data(this, Q)).get("rel") === t
          }),
          -1 === (O = E.index(A.el)) && (E = E.add(A.el),
          O = E.length - 1)) : E = d(A.el),
          !z) {
              z = V = !0,
              v(A.get("className")),
              S.css({
                  visibility: "hidden",
                  display: "block",
                  opacity: ""
              }),
              M = m(le, "LoadedContent", "width:0; height:0; overflow:hidden; visibility:hidden"),
              y.css({
                  width: "",
                  height: ""
              }).append(M),
              B = $.height() + C.height() + y.outerHeight(!0) - y.height(),
              W = T.width() + k.width() + y.outerWidth(!0) - y.width(),
              R = M.outerHeight(!0),
              N = M.outerWidth(!0);
              var r = h(A.get("initialWidth"), "x")
                , n = h(A.get("initialHeight"), "y")
                , i = A.get("maxWidth")
                , o = A.get("maxHeight");
              A.w = Math.max((!1 !== i ? Math.min(r, h(i, "x")) : r) - N - W, 0),
              A.h = Math.max((!1 !== o ? Math.min(n, h(o, "y")) : n) - R - B, 0),
              M.css({
                  width: "",
                  height: A.h
              }),
              Y.position(),
              b(ae),
              A.get("onOpen"),
              H.add(D).hide(),
              S.focus(),
              A.get("trapFocus") && l.addEventListener && (l.addEventListener("focus", _, !0),
              se.one(ie, function() {
                  l.removeEventListener("focus", _, !0)
              })),
              A.get("returnFocus") && se.one(ie, function() {
                  d(A.el).focus()
              })
          }
          var s = parseFloat(A.get("opacity"));
          w.css({
              opacity: s == s ? s : "",
              cursor: A.get("overlayClose") ? "pointer" : "",
              visibility: "visible"
          }).show(),
          A.get("closeButton") ? U.html(A.get("close")).appendTo(y) : U.appendTo("<div/>"),
          function() {
              var e, a, t, r = Y.prep, n = ++ce;
              if (q = !(V = !0),
              b(oe),
              b(te),
              A.get("onLoad"),
              A.h = A.get("height") ? h(A.get("height"), "y") - R - B : A.get("innerHeight") && h(A.get("innerHeight"), "y"),
              A.w = A.get("width") ? h(A.get("width"), "x") - N - W : A.get("innerWidth") && h(A.get("innerWidth"), "x"),
              A.mw = A.w,
              A.mh = A.h,
              A.get("maxWidth") && (A.mw = h(A.get("maxWidth"), "x") - N - W,
              A.mw = A.w && A.w < A.mw ? A.w : A.mw),
              A.get("maxHeight") && (A.mh = h(A.get("maxHeight"), "y") - R - B,
              A.mh = A.h && A.h < A.mh ? A.h : A.mh),
              e = A.get("href"),
              K = setTimeout(function() {
                  j.show()
              }, 100),
              A.get("inline")) {
                  var i = d(e).eq(0);
                  t = d("<div>").hide().insertBefore(i),
                  se.one(oe, function() {
                      t.replaceWith(i)
                  }),
                  r(i)
              } else
                  A.get("iframe") ? r(" ") : A.get("html") ? r(A.get("html")) : g(A, e) ? (e = f(A, e),
                  q = A.get("createImg"),
                  d(q).addClass(Z + "Photo").bind("error." + Z, function() {
                      r(m(le, "Error").html(A.get("imgError")))
                  }).one("load", function() {
                      n === ce && setTimeout(function() {
                          var e;
                          A.get("retinaImage") && 1 < c.devicePixelRatio && (q.height = q.height / c.devicePixelRatio,
                          q.width = q.width / c.devicePixelRatio),
                          A.get("scalePhotos") && (a = function() {
                              q.height -= q.height * e,
                              q.width -= q.width * e
                          }
                          ,
                          A.mw && q.width > A.mw && (e = (q.width - A.mw) / q.width,
                          a()),
                          A.mh && q.height > A.mh && (e = (q.height - A.mh) / q.height,
                          a())),
                          A.h && (q.style.marginTop = Math.max(A.mh - q.height, 0) / 2 + "px"),
                          E[1] && (A.get("loop") || E[O + 1]) && (q.style.cursor = "pointer",
                          d(q).bind("click." + Z, function() {
                              Y.next()
                          })),
                          q.style.width = q.width + "px",
                          q.style.height = q.height + "px",
                          r(q)
                      }, 1)
                  }),
                  q.src = e) : e && I.load(e, A.get("data"), function(e, a) {
                      n === ce && r("error" === a ? m(le, "Error").html(A.get("xhrError")) : d(this).contents())
                  })
          }()
      }
  }
  function n() {
      S || (X = !1,
      L = d(c),
      S = m(le).attr({
          id: Q,
          class: !1 === d.support.opacity ? Z + "IE" : "",
          role: "dialog",
          tabindex: "-1"
      }).hide(),
      w = m(le, "Overlay").hide(),
      j = d([m(le, "LoadingOverlay")[0], m(le, "LoadingGraphic")[0]]),
      x = m(le, "Wrapper"),
      y = m(le, "Content").append(D = m(le, "Title"), o = m(le, "Current"), P = d('<button type="button"/>').attr({
          id: Z + "Previous"
      }), s = d('<button type="button"/>').attr({
          id: Z + "Next"
      }), F = d('<button type="button"/>').attr({
          id: Z + "Slideshow"
      }), j),
      U = d('<button type="button"/>').attr({
          id: Z + "Close"
      }),
      x.append(m(le).append(m(le, "TopLeft"), $ = m(le, "TopCenter"), m(le, "TopRight")), m(le, !1, "clear:left").append(T = m(le, "MiddleLeft"), y, k = m(le, "MiddleRight")), m(le, !1, "clear:left").append(m(le, "BottomLeft"), C = m(le, "BottomCenter"), m(le, "BottomRight"))).find("div div").css({
          float: "left"
      }),
      I = m(le, !1, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"),
      H = s.add(P).add(o).add(F)),
      l.body && !S.parent().length && d(l.body).append(w, S.append(x, I))
  }
  var w, S, x, y, $, T, k, C, E, L, M, I, j, D, o, F, s, P, U, H, A, B, W, R, N, O, q, z, V, G, K, Y, X, J = {
      html: !1,
      photo: !1,
      iframe: !1,
      inline: !1,
      transition: "elastic",
      speed: 300,
      fadeOut: 300,
      width: !1,
      initialWidth: "600",
      innerWidth: !1,
      maxWidth: !1,
      height: !1,
      initialHeight: "450",
      innerHeight: !1,
      maxHeight: !1,
      scalePhotos: !0,
      scrolling: !0,
      opacity: .9,
      preloading: !0,
      className: !1,
      overlayClose: !0,
      escKey: !0,
      arrowKey: !0,
      top: !1,
      bottom: !1,
      left: !1,
      right: !1,
      fixed: !1,
      data: void 0,
      closeButton: !0,
      fastIframe: !0,
      open: !1,
      reposition: !0,
      loop: !0,
      slideshow: !1,
      slideshowAuto: !0,
      slideshowSpeed: 2500,
      slideshowStart: "start slideshow",
      slideshowStop: "stop slideshow",
      photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
      retinaImage: !1,
      retinaUrl: !1,
      retinaSuffix: "@2x.$1",
      current: "image {current} of {total}",
      previous: "previous",
      next: "next",
      close: "close",
      xhrError: "This content failed to load.",
      imgError: "This image failed to load.",
      returnFocus: !0,
      trapFocus: !0,
      onOpen: !1,
      onLoad: !1,
      onComplete: !1,
      onCleanup: !1,
      onClosed: !1,
      rel: function() {
          return this.rel
      },
      href: function() {
          return d(this).attr("href")
      },
      title: function() {
          return this.title
      },
      createImg: function() {
          var t = new Image
            , e = d(this).data("cbox-img-attrs");
          return "object" == typeof e && d.each(e, function(e, a) {
              t[e] = a
          }),
          t
      },
      createIframe: function() {
          var t = l.createElement("iframe")
            , e = d(this).data("cbox-iframe-attrs");
          return "object" == typeof e && d.each(e, function(e, a) {
              t[e] = a
          }),
          "frameBorder"in t && (t.frameBorder = 0),
          "allowTransparency"in t && (t.allowTransparency = "true"),
          t.name = (new Date).getTime(),
          t.allowFullscreen = !0,
          t
      }
  }, Q = "colorbox", Z = "cbox", ee = Z + "Element", ae = Z + "_open", te = Z + "_load", re = Z + "_complete", ne = Z + "_cleanup", ie = Z + "_closed", oe = Z + "_purge", se = d("<a/>"), le = "div", ce = 0, de = {}, me = function() {
      function e() {
          clearTimeout(o)
      }
      function a() {
          (A.get("loop") || E[O + 1]) && (e(),
          o = setTimeout(Y.next, A.get("slideshowSpeed")))
      }
      function t() {
          F.html(A.get("slideshowStop")).unbind(l).one(l, r),
          se.bind(re, a).bind(te, e),
          S.removeClass(s + "off").addClass(s + "on")
      }
      function r() {
          e(),
          se.unbind(re, a).unbind(te, e),
          F.html(A.get("slideshowStart")).unbind(l).one(l, function() {
              Y.next(),
              t()
          }),
          S.removeClass(s + "on").addClass(s + "off")
      }
      function n() {
          i = !1,
          F.hide(),
          e(),
          se.unbind(re, a).unbind(te, e),
          S.removeClass(s + "off " + s + "on")
      }
      var i, o, s = Z + "Slideshow_", l = "click." + Z;
      return function() {
          i ? A.get("slideshow") || (se.unbind(ne, n),
          n()) : A.get("slideshow") && E[1] && (i = !0,
          se.one(ne, n),
          A.get("slideshowAuto") ? t() : r(),
          F.show())
      }
  }();
  d[Q] || (d(n),
  (Y = d.fn[Q] = d[Q] = function(a, e) {
      var t = this;
      return a = a || {},
      d.isFunction(t) && (t = d("<a/>"),
      a.open = !0),
      t[0] && (n(),
      function() {
          function e(e) {
              1 < e.which || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey || (e.preventDefault(),
              r(this))
          }
          return !!S && (X || (X = !0,
          s.click(function() {
              Y.next()
          }),
          P.click(function() {
              Y.prev()
          }),
          U.click(function() {
              Y.close()
          }),
          w.click(function() {
              A.get("overlayClose") && Y.close()
          }),
          d(l).bind("keydown." + Z, function(e) {
              var a = e.keyCode;
              z && A.get("escKey") && 27 === a && (e.preventDefault(),
              Y.close()),
              z && A.get("arrowKey") && E[1] && !e.altKey && (37 === a ? (e.preventDefault(),
              P.click()) : 39 === a && (e.preventDefault(),
              s.click()))
          }),
          d.isFunction(d.fn.on) ? d(l).on("click." + Z, "." + ee, e) : d("." + ee).live("click." + Z, e)),
          !0)
      }() && (e && (a.onComplete = e),
      t.each(function() {
          var e = d.data(this, Q) || {};
          d.data(this, Q, d.extend(e, a))
      }).addClass(ee),
      new u(t[0],a).get("open") && r(t[0]))),
      t
  }
  ).position = function(a, e) {
      function t() {
          $[0].style.width = C[0].style.width = y[0].style.width = parseInt(S[0].style.width, 10) - W + "px",
          y[0].style.height = T[0].style.height = k[0].style.height = parseInt(S[0].style.height, 10) - B + "px"
      }
      var r, n, i, o = 0, s = 0, l = S.offset();
      if (L.unbind("resize." + Z),
      S.css({
          top: -9e4,
          left: -9e4
      }),
      n = L.scrollTop(),
      i = L.scrollLeft(),
      A.get("fixed") ? (l.top -= n,
      l.left -= i,
      S.css({
          position: "fixed"
      })) : (o = n,
      s = i,
      S.css({
          position: "absolute"
      })),
      s += !1 !== A.get("right") ? Math.max(L.width() - A.w - N - W - h(A.get("right"), "x"), 0) : !1 !== A.get("left") ? h(A.get("left"), "x") : Math.round(Math.max(L.width() - A.w - N - W, 0) / 2),
      o += !1 !== A.get("bottom") ? Math.max(p() - A.h - R - B - h(A.get("bottom"), "y"), 0) : !1 !== A.get("top") ? h(A.get("top"), "y") : Math.round(Math.max(p() - A.h - R - B, 0) / 2),
      S.css({
          top: l.top,
          left: l.left,
          visibility: "visible"
      }),
      x[0].style.width = x[0].style.height = "9999px",
      r = {
          width: A.w + N + W,
          height: A.h + R + B,
          top: o,
          left: s
      },
      a) {
          var c = 0;
          d.each(r, function(e) {
              return r[e] !== de[e] ? void (c = a) : void 0
          }),
          a = c
      }
      de = r,
      a || S.css(r),
      S.dequeue().animate(r, {
          duration: a || 0,
          complete: function() {
              t(),
              V = !1,
              x[0].style.width = A.w + N + W + "px",
              x[0].style.height = A.h + R + B + "px",
              A.get("reposition") && setTimeout(function() {
                  L.bind("resize." + Z, Y.position)
              }, 1),
              d.isFunction(e) && e()
          },
          step: t
      })
  }
  ,
  Y.resize = function(e) {
      var a;
      z && ((e = e || {}).width && (A.w = h(e.width, "x") - N - W),
      e.innerWidth && (A.w = h(e.innerWidth, "x")),
      M.css({
          width: A.w
      }),
      e.height && (A.h = h(e.height, "y") - R - B),
      e.innerHeight && (A.h = h(e.innerHeight, "y")),
      e.innerHeight || e.height || (a = M.scrollTop(),
      M.css({
          height: "auto"
      }),
      A.h = M.height()),
      M.css({
          height: A.h
      }),
      a && M.scrollTop(a),
      Y.position("none" === A.get("transition") ? 0 : A.get("speed")))
  }
  ,
  Y.prep = function(e) {
      if (z) {
          var a, n = "none" === A.get("transition") ? 0 : A.get("speed");
          M.remove(),
          (M = m(le, "LoadedContent").append(e)).hide().appendTo(I.show()).css({
              width: (A.w = A.w || M.width(),
              A.w = A.mw && A.mw < A.w ? A.mw : A.w,
              A.w),
              overflow: A.get("scrolling") ? "auto" : "hidden"
          }).css({
              height: (A.h = A.h || M.height(),
              A.h = A.mh && A.mh < A.h ? A.mh : A.h,
              A.h)
          }).prependTo(y),
          I.hide(),
          d(q).css({
              float: "none"
          }),
          v(A.get("className")),
          a = function() {
              function e() {
                  !1 === d.support.opacity && S[0].style.removeAttribute("filter")
              }
              var a, t, r = E.length;
              z && (t = function() {
                  clearTimeout(K),
                  j.hide(),
                  b(re),
                  A.get("onComplete")
              }
              ,
              D.html(A.get("title")).show(),
              M.show(),
              1 < r ? ("string" == typeof A.get("current") && o.html(A.get("current").replace("{current}", O + 1).replace("{total}", r)).show(),
              s[A.get("loop") || O < r - 1 ? "show" : "hide"]().html(A.get("next")),
              P[A.get("loop") || O ? "show" : "hide"]().html(A.get("previous")),
              me(),
              A.get("preloading") && d.each([i(-1), i(1)], function() {
                  var e = E[this]
                    , a = new u(e,d.data(e, Q))
                    , t = a.get("href");
                  t && g(a, t) && (t = f(a, t),
                  l.createElement("img").src = t)
              })) : H.hide(),
              A.get("iframe") ? (a = A.get("createIframe"),
              A.get("scrolling") || (a.scrolling = "no"),
              d(a).attr({
                  src: A.get("href"),
                  class: Z + "Iframe"
              }).one("load", t).appendTo(M),
              se.one(oe, function() {
                  a.src = "//about:blank"
              }),
              A.get("fastIframe") && d(a).trigger("load")) : t(),
              "fade" === A.get("transition") ? S.fadeTo(n, 1, e) : e())
          }
          ,
          "fade" === A.get("transition") ? S.fadeTo(n, 0, function() {
              Y.position(0, a)
          }) : Y.position(n, a)
      }
  }
  ,
  Y.next = function() {
      !V && E[1] && (A.get("loop") || E[O + 1]) && (O = i(1),
      r(E[O]))
  }
  ,
  Y.prev = function() {
      !V && E[1] && (A.get("loop") || O) && (O = i(-1),
      r(E[O]))
  }
  ,
  Y.close = function() {
      z && !G && (z = !(G = !0),
      b(ne),
      A.get("onCleanup"),
      L.unbind("." + Z),
      w.fadeTo(A.get("fadeOut") || 0, 0),
      S.stop().fadeTo(A.get("fadeOut") || 0, 0, function() {
          S.hide(),
          w.hide(),
          b(oe),
          M.remove(),
          setTimeout(function() {
              G = !1,
              b(ie),
              A.get("onClosed")
          }, 1)
      }))
  }
  ,
  Y.remove = function() {
      S && (S.stop(),
      d[Q].close(),
      S.stop(!1, !0).remove(),
      w.remove(),
      G = !1,
      S = null,
      d("." + ee).removeData(Q).removeClass(ee),
      d(l).unbind("click." + Z).unbind("keydown." + Z))
  }
  ,
  Y.element = function() {
      return d(A.el)
  }
  ,
  Y.settings = J)
}(jQuery, document, window);
var Login_Modal = function() {
  "use strict";
  var n = this;
  n.defaultSettings = {
      selectors: {
          open_login_modal: "js_trigger_login",
          login_action_message: "js_login_message",
          login_submit: "js-loginSubmitModal"
      },
      ga_login_entry: {
          default_ga_category: "Logins",
          default_ga_action: page_params.global.platform + " login click",
          default_ga_label: "Login entry"
      }
  },
  n.init = function(e) {
      n.params = $.extend(!0, n.defaultSettings, e),
      n.initColorbox(),
      n.addListeners()
  }
  ,
  n.addListeners = function() {
      $("." + n.params.selectors.open_login_modal).on("click", n.trigger_login_modal)
  }
  ,
  n.trigger_login_modal = function(e) {
      n.send_ga_event($(this));
      var a = $(this).data("login-action-message");
      a = a || n.params.default_login_action_message,
      n.login_modal && n.login_modal.length && (n.login_modal.find("." + n.params.selectors.login_action_message).text(a),
      n.login_modal.find("." + n.params.selectors.login_submit).attr("data-ga-label", $(this).data("ga-label")),
      "mobile" != page_params.global.platform && e.preventDefault())
  }
  ,
  n.send_ga_event = function(e) {
      var a = e.data("ga-category") ? e.data("ga-category") : n.params.ga_login_entry.default_ga_category
        , t = e.data("ga-action") ? e.data("ga-action") : n.params.ga_login_entry.default_ga_action
        , r = e.data("ga-label") ? e.data("ga-label") : n.params.ga_login_entry.default_ga_label;
      ga("send", {
          hitType: "event",
          eventCategory: a,
          eventAction: t,
          eventLabel: r,
          nonInteraction: 1
      })
  }
  ,
  n.initColorbox = function() {
      "mobile" != page_params.global.platform && (n.login_modal = $("#" + n.params.selectors.wrapper_id),
      $("#" + n.params.selectors.wrapper_id).length && (n.colorbox_instance = $("." + n.params.selectors.open_login_modal).colorbox({
          inline: !0,
          href: n.login_modal,
          fixed: !0,
          close: '<span class="rt_icon rt_Close_X"></span>'
      })))
  }
};
try {
  var login_modal = new Login_Modal;
  login_modal.init(page_params.login_modal)
} catch (e) {
  console.log(e),
  console.log("error in login_modal")
}
var VideoWatchLater = function() {
  "use strict";
  var t = this;
  t.defaultSettings = {
      selectors: {
          watch_later_icon: "js_watchLater",
          watch_list_added: "js_watchListAdded"
      }
  },
  t.init = function(e) {
      t.params = $.extend(!0, t.defaultSettings, e),
      t.addListeners()
  }
  ,
  t.addListeners = function() {
      $("." + t.params.selectors.watch_later_icon).on("click", function(e) {
          e.preventDefault(),
          page_params.user.isLoggedIn && (e.stopPropagation(),
          t.addToWatchLaterList(e))
      }),
      $("." + t.params.selectors.watch_list_added).on("click", function(e) {
          e.preventDefault(),
          page_params.user.isLoggedIn && (e.stopPropagation(),
          t.removeFromWatchLaterList(e))
      })
  }
  ,
  t.addToWatchLaterList = function(a) {
      var e = $(a.currentTarget).attr("data-videoId");
      $.ajax({
          type: "POST",
          url: t.params.add_to_watch_later,
          dataType: "json",
          data: {
              type: "watchlater",
              vkey: e,
              token: page_params.token
          },
          success: function(e) {
              e.success && ($(a.currentTarget).hide(),
              $(a.currentTarget).siblings("." + t.params.selectors.watch_list_added).show())
          },
          error: function(e) {
              alert(t.params.ajaxErrorMsg)
          }
      })
  }
  ,
  t.removeFromWatchLaterList = function(a) {
      var e = $(a.currentTarget).attr("data-videoId");
      $.ajax({
          type: "POST",
          url: t.params.remove_from_watch_later,
          dataType: "json",
          data: {
              type: "watchlater",
              vkey: e,
              token: page_params.token
          },
          success: function(e) {
              e.success && ($(a.currentTarget).hide(),
              $(a.currentTarget).siblings("." + t.params.selectors.watch_later_icon).show())
          },
          error: function(e) {
              alert(t.params.ajaxErrorMsg)
          }
      })
  }
};
try {
  var videoWatchLater = new VideoWatchLater;
  videoWatchLater.init(page_params.video_watch_later)
} catch (e) {
  console.log(e),
  console.log("error in video_watch_later-1.0.0")
}

// here is where it starts
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
VideoPreview.getTarget("js-videoPreview");
var MG_Flipbook = function() {
  "use strict";
  var Self = this, timer, o = {}, data = {}, flipTimer, oldThumbUrlAC, currentElem = null;
  Self.init = function(e) {
      Self.params = e,
      "pc" == page_params.global.platform && Self.addEvents()
  }
  ,
  Self.addEvent = function(e, a, t) {
      var r;
      e.addEventListener ? e.addEventListener(a, t, !1) : (t.$$guid || (t.$$guid = Self.addEvent.guid++),
      e.events || (e.events = {}),
      (r = e.events[a]) || (r = e.events[a] = {},
      e["on" + a] && (r[0] = e["on" + a])),
      r[t.$$guid] = t,
      e["on" + a] = Self.handleEvent)
  }
  ,
  Self.addEvent.guid = 1,
  Self.removeEvent = function(e, a, t) {
      e.removeEventListener ? e.removeEventListener(a, t, !1) : e.events && e.events[a] && delete e.events[a][t.$$guid]
  }
  ,
  Self.handleEvent = function(e) {
      var a = !0;
      e = e || Self.fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
      var t = this.events[e.type];
      for (var r in t)
          this.$$handleEvent = t[r],
          !1 === this.$$handleEvent(e) && (a = !1);
      return a
  }
  ,
  Self.fixEvent = function(e) {
      return e.preventDefault = Self.fixEvent.preventDefault,
      e.stopPropagation = Self.fixEvent.stopPropagation,
      e
  }
  ,
  Self.fixEvent.preventDefault = function() {
      this.returnValue = !1
  }
  ,
  Self.fixEvent.stopPropagation = function() {
      this.cancelBubble = !0
  }
  ,
  Self.addEvents = function() {
      Self.addEvent(document.body, "mousemove", Self.initFlip),
      Self.addEvent(document.body, "mouseout", function(e) {
          if (currentElem) {
              var a = e.relatedTarget;
              if (a)
                  for (; a; ) {
                      if (a == currentElem)
                          return;
                      a = a.parentNode
                  }
              currentElem.querySelector(".js-videoThumbFlip") && Self.endFlip(),
              currentElem = null
          }
      })
  }
  ,
  Self.hasClass = function(e, a) {
      return e.className && new RegExp("(^|\\s)" + a + "(\\s|$)").test(e.className)
  }
  ,
  Self.closestElm = function(e, a, t) {
      t = t || document.body;
      for (var r = a.charAt(0); e && e !== t; ) {
          if ("." === r && Self.hasClass(e, a.substr(1)))
              return e;
          if ("#" === r && e.id === a.substr(1))
              return e;
          if ("[" === r && e.getAttribute(a.substr(1, a.indexOf("]") - 1)))
              return e;
          e = e.parentNode
      }
      return !1
  }
  ,
  Self.dataSet = function(string) {
      var data;
      try {
          data = eval("(" + string + ")")
      } catch (e) {
          data = !1
      }
      return data
  }
  ,
  Self.data = function(e, a, t) {
      switch (e.data = e.data || {},
      arguments.length) {
      case 3:
          e.data[a] = t;
          break;
      case 2:
          return e.data[a];
      default:
          return e.data
      }
  }
  ,
  Self.callbackData = function() {
      return data = {
          index: o.index,
          setLength: o.setLength,
          currentImage: o.currentImage,
          imgWrapper: o.imgWrapper,
          currentUrl: o.currentUrl,
          active: o.active,
          status: o.status
      }
  }
  ,
  Self.initFlip = function(e) {
      if (!currentElem) {
          var a = document.querySelector("body")
            , t = e.target.closest(".video_thumb_title_wrap");
          if (t && a.contains(t)) {
              var r = (currentElem = t).querySelector(".js-videoThumbFlip");
              r && (clearTimeout(flipTimer),
              flipTimer = window.setTimeout(function() {
                  Self.startFlip(r)
              }, 0))
          }
      }
  }
  ,
  Self.startFlip = function(e) {
      e = e;
      var a, t, r, n, i, s, l, c, d, m, p, u, h, g = 0, f = Self.params.thumbnailsSets.length;
      for (oldThumbUrlAC = e.src; g < f; g++)
          if (!Self.params.thumbnailsSets[g].extendHoverClassName && Self.hasClass(e, Self.params.thumbnailsSets[g].thumbnailsClassName) || Self.params.thumbnailsSets[g].extendHoverClassName && Self.closestElm(e, "." + Self.params.thumbnailsSets[g].extendHoverClassName)) {
              if (m = d = e,
              Self.params.thumbnailsSets[g].excludeContainer && Self.closestElm(d, Self.params.thumbnailsSets[g].excludeContainer))
                  return !1;
              if (Self.params.thumbnailsSets[g].extendHoverClassName && (m = (d = Self.closestElm(d, "." + Self.params.thumbnailsSets[g].extendHoverClassName)).querySelector("." + Self.params.thumbnailsSets[g].thumbnailsClassName)),
              o.active) {
                  if (d.getAttribute("data-flipbook_active"))
                      return !1;
                  Self.endFlip()
              }
              return Self.params.thumbnailsSets[g].cover ? (n = (c = Self.dataSet(m.getAttribute("data-flipbook"))).setLength,
              r = c.firstThumbnail,
              l = parseInt(c.firstThumbnail, 10) - c.incrementer,
              a = c.digitsPreffix,
              t = c.digitsSuffix,
              i = c.incrementer,
              s = -1) : (1,
              p = /(https:[^)]+)/,
              u = m.src.indexOf(")."),
              h = p.exec(m.src),
              a = m.src.substring(0, m.src.lastIndexOf(Self.params.thumbnailsSets[g].digitsPreffix) + 1),
              l = m.src.replace(a, ""),
              t = Self.params.thumbnailsSets[g].digitsSuffix,
              l = parseInt(l.replace(t, ""), 10),
              r = Self.params.thumbnailsSets[g].firstThumbnail,
              n = Self.params.thumbnailsSets[g].setLength,
              s = (l - r) / (i = Self.params.thumbnailsSets[g].incrementer)),
              o = {
                  index: s,
                  setLength: n,
                  currentUrl: m.src,
                  firstThumbnail: r,
                  digits: l,
                  digitsPreffix: a,
                  digitsSuffix: t,
                  matches: h,
                  testString: u,
                  incrementer: i,
                  currentImage: m,
                  imgWrapper: !1,
                  interval: Self.params.thumbnailsSets[g].interval,
                  active: !0,
                  callback: Self.params.thumbnailsSets[g].callback,
                  init: Self.params.thumbnailsSets[g].init,
                  status: "started"
              },
              d.setAttribute("data-flipbook_active", "1"),
              Self.params.thumbnailsSets[g].extendHoverClassName && (o.imgWrapper = d),
              o.init && !d.init && (Self.callbackData(),
              o.init(data)),
              d.init || (Self.params.thumbnailsSets[g].adultCentro ? Self.data(d, "oldThumbUrl", oldThumbUrlAC) : (Self.data(d, "oldThumbUrl", m.src),
              Self.data(d, "oldIndex", s)),
              d.init = !0),
              o.callback && (Self.callbackData(),
              o.callback(data)),
              Self.params.thumbnailsSets[g].resetIndex && (o.digits = (n - 1) * o.incrementer + parseInt(o.firstThumbnail, 10),
              o.index = n - 1,
              Self.callbackData()),
              window.clearTimeout(timer),
              timer = window.setTimeout(Self.preload, 0),
              !1
          }
  }
  ,
  Self.endFlip = function() {
      var e;
      window.clearTimeout(timer),
      o.active && ((e = document.querySelector("[data-flipbook_active]")) && (e.removeAttribute("data-flipbook_active"),
      "IMG" === e.nodeName ? e.src = Self.data(e, "oldThumbUrl") : e.querySelector("img").src = Self.data(e, "oldThumbUrl")),
      o.active = !1,
      o.status = "ended",
      o.index = Self.data(e, "oldIndex"),
      o.callback && (Self.callbackData(),
      o.callback(data)))
  }
  ,
  Self.preload = function() {
      var e = new Image;
      o.digits < (o.setLength - 1) * o.incrementer + parseInt(o.firstThumbnail, 10) ? (o.digits = o.digits + o.incrementer,
      o.index++) : (o.digits = parseInt(o.firstThumbnail, 10),
      o.index = 0),
      o.firstThumbnail.length > String(o.digits).length ? o.currentUrl = o.digitsPreffix + o.firstThumbnail.substring(0, o.firstThumbnail.length - String(o.digits).length) + o.digits + o.digitsSuffix : -1 !== o.testString ? o.currentUrl = o.digitsPreffix + o.digits + "(" + o.matches[1] + ")" + o.digitsSuffix : o.currentUrl = o.digitsPreffix + o.digits + o.digitsSuffix,
      e.onerror = function() {
          Self.endFlip()
      }
      ,
      e.onload = function() {
          o.active && (timer = "running" !== o.status ? window.setTimeout(Self.flipImage, 0) : window.setTimeout(Self.flipImage, o.interval))
      }
      ,
      o.matches && (e.src = o.currentUrl)
  }
  ,
  Self.flipImage = function(e) {
      window.clearTimeout(timer),
      o.currentImage.src = o.currentUrl,
      o.status = "running",
      o.callback && (Self.callbackData(),
      o.callback(data)),
      void 0 !== e && (o.digits = e * o.incrementer + parseInt(o.firstThumbnail, 10),
      o.index = e,
      Self.callbackData()),
      Self.preload()
  }
  ,
  Self.jumpTo = function(e) {
      o.digits = e * o.incrementer + parseInt(o.firstThumbnail, 10),
      o.index = e,
      o.firstThumbnail.length > String(o.digits).length ? o.currentUrl = o.digitsPreffix + o.firstThumbnail.substring(0, o.firstThumbnail.length - String(o.digits).length) + o.digits + o.digitsSuffix : o.currentUrl = o.digitsPreffix + o.digits + o.digitsSuffix,
      o.currentImage.src = o.currentUrl,
      o.callback && (Self.callbackData(),
      o.callback(data))
  }
  ,
  Self.changeIndex = function(e) {
      o.digits = e * o.incrementer + parseInt(o.firstThumbnail, 10),
      o.index = e,
      Self.callbackData()
  }
  ,
  Self.pauseFlip = function() {
      window.clearTimeout(timer),
      o.status = "paused"
  }
}
, imgList = document.querySelectorAll(".video_thumb_title_wrap")
, flipbook = new MG_Flipbook;
[].forEach.call(imgList, function(e, a) {
  MG_Utils.addEventHandler(e, "mouseenter", function() {
      flipbook.init({
          thumbnailsSets: [{
              thumbnailsClassName: "js-videoThumbFlip",
              excludeContainer: !1,
              interval: 500,
              cover: !1,
              firstThumbnail: "1",
              digitsSuffix: ".jpg",
              digitsPreffix: "/",
              incrementer: 1,
              setLength: 16
          }]
      })
  })
});

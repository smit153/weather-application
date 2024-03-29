// THIS IS  A COMPILED FILE. FROM https://developers.teleport.org/
!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var t;
    (t =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this),
      (t.TeleportAutocomplete = e());
  }
})(function () {
  return (function e(t, n, i) {
    function r(s, a) {
      if (!n[s]) {
        if (!t[s]) {
          var u = "function" == typeof require && require;
          if (!a && u) return u(s, !0);
          if (o) return o(s, !0);
          var c = new Error("Cannot find module '" + s + "'");
          throw ((c.code = "MODULE_NOT_FOUND"), c);
        }
        var l = (n[s] = {
          exports: {},
        });
        t[s][0].call(
          l.exports,
          function (e) {
            var n = t[s][1][e];
            return r(n ? n : e);
          },
          l,
          l.exports,
          e,
          t,
          n,
          i
        );
      }
      return n[s].exports;
    }
    for (
      var o = "function" == typeof require && require, s = 0;
      s < i.length;
      s++
    )
      r(i[s]);
    return r;
  })(
    {
      1: [
        function (e, t, n) {
          "use strict";

          function i(e) {
            return e && e.__esModule
              ? e
              : {
                  default: e,
                };
          }

          function r(e, t) {
            if (!(e instanceof t))
              throw new TypeError("Cannot call a class as a function");
          }
          Object.defineProperty(n, "__esModule", {
            value: !0,
          });
          var o = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var i = t[n];
                (i.enumerable = i.enumerable || !1),
                  (i.configurable = !0),
                  "value" in i && (i.writable = !0),
                  Object.defineProperty(e, i.key, i);
              }
            }
            return function (t, n, i) {
              return n && e(t.prototype, n), i && e(t, i), t;
            };
          })();
          e("classlist-polyfill"), e("element-closest");
          var s = e("halfred"),
            a = i(s),
            u = e("minivents"),
            c = i(u),
            l = e("core-js/library/fn/object/assign"),
            f = i(l),
            d = e("core-js/library/fn/array/find"),
            p = i(d),
            h = e("core-js/library/fn/regexp/escape"),
            y = i(h),
            v = e("debounce"),
            m = i(v),
            g = {
              BACK: 8,
              TAB: 9,
              ENTER: 13,
              UP: 38,
              DOWN: 40,
            },
            b =
              '<div class="tp-autocomplete"><ul class="tp-ac__list"></ul></div>',
            _ = "tp-ac__input",
            x = function (e) {
              return '<li class="tp-ac__item">' + e + "</li>";
            },
            k = '<li class="tp-ac__item no-results">No matches</li>',
            $ =
              '<li class="tp-ac__item geolocate">Detect my current location</li>',
            w = function (e) {
              return this.wrapMatches(e.title);
            };
          (HTMLElement.prototype.on = HTMLElement.prototype.addEventListener),
            (HTMLElement.prototype.off =
              HTMLElement.prototype.removeEventListener);
          var j = (function () {
            function e() {
              var t = this,
                n =
                  arguments.length <= 0 || void 0 === arguments[0]
                    ? {}
                    : arguments[0],
                i = n.el,
                o = void 0 === i ? null : i,
                s = n.value,
                a = n.maxItems,
                u = void 0 === a ? 10 : a,
                l = n.itemTemplate,
                d = void 0 === l ? w : l,
                p = n.geoLocate,
                h = void 0 === p || p,
                y = n.apiRoot,
                v = void 0 === y ? "https://api.teleport.org/api" : y,
                g = n.apiVersion,
                b = void 0 === g ? 1 : g,
                _ = n.embeds,
                x =
                  void 0 === _
                    ? "city:country,city:admin1_division,city:timezone/tz:offsets-now,city:urban_area"
                    : _;
              r(this, e), (0, c["default"])(this);
              var k = "string" == typeof o ? document.querySelector(o) : o;
              return (
                this.setupInput(k),
                (0, f["default"])(this, {
                  maxItems: u,
                  geoLocate: h,
                  apiRoot: v,
                  apiVersion: b,
                  itemTemplate: d,
                  embeds: x,
                  results: [],
                  _activeIndex: 0,
                  _cache: {},
                  _query: this.el.value,
                  value: s,
                }),
                this.value && this.value.title
                  ? (this.query = this.value.title)
                  : this.query &&
                    this.fetchResults(function () {
                      (t.value = t.getResultByTitle(t.query)),
                        t.emit("change", t.value);
                    }),
                (this.getCities = (0, m["default"])(this.getCities, 200)),
                this
              );
            }
            return (
              o(e, [
                {
                  key: "query",
                  get: function () {
                    return this._query;
                  },
                  set: function (e) {
                    return e === this._query
                      ? e
                      : ((this._query = e),
                        (this.el.value = e),
                        void this.emit("querychange", e));
                  },
                },
                {
                  key: "activeIndex",
                  get: function () {
                    return this._activeIndex;
                  },
                  set: function (e) {
                    var t = this.list.childNodes[this._activeIndex];
                    t && t.classList.remove("is-active"),
                      (this._activeIndex = e);
                    var n = this.list.childNodes[e];
                    n && n.classList.add("is-active");
                  },
                },
                {
                  key: "loading",
                  set: function (e) {
                    this.container.classList.toggle("spinner", e);
                  },
                },
              ]),
              o(
                e,
                [
                  {
                    key: "destroy",
                    value: function () {
                      this.el.off("input", this.oninput),
                        this.el.off("keydown", this.onkeydown),
                        this.el.off("focus", this.onfocus),
                        this.el.off("blur", this.onblur),
                        this.el.off("click", this.onclick),
                        this.el.classList.remove(_);
                      var e = this.container.parentNode;
                      e.replaceChild(
                        this.el.parentNode.removeChild(this.el),
                        this.container
                      );
                    },
                  },
                  {
                    key: "clear",
                    value: function () {
                      (this.results = []), this.selectByIndex(0);
                    },
                  },
                  {
                    key: "setupInput",
                    value: function (e) {
                      if (!(e && e instanceof HTMLInputElement))
                        throw new Error("Invalid element given");
                      e.insertAdjacentHTML("beforebegin", b),
                        Object.defineProperty(this, "container", {
                          value: e.previousSibling,
                        }),
                        Object.defineProperty(this, "list", {
                          value: this.container.firstChild,
                        });
                      var t = this.container.insertBefore(
                        e.parentNode.removeChild(e),
                        this.list
                      );
                      t.classList.add(_),
                        Object.defineProperty(this, "el", {
                          enumerable: !0,
                          value: t,
                        }),
                        this.el.on("input", this.oninput.bind(this)),
                        this.el.on("keydown", this.onkeydown.bind(this)),
                        this.el.on("focus", this.onfocus.bind(this)),
                        this.el.on("blur", this.onblur.bind(this)),
                        this.el.on("click", this.onclick.bind(this)),
                        this.list.on("mousedown", this.onlistclick.bind(this));
                    },
                  },
                  {
                    key: "onlistclick",
                    value: function (e) {
                      var t = [].indexOf.call(
                        this.list.children,
                        e.target.closest(".tp-ac__item")
                      );
                      this.selectByIndex(t);
                    },
                  },
                  {
                    key: "onclick",
                    value: function () {
                      this.el.select();
                    },
                  },
                  {
                    key: "onfocus",
                    value: function () {
                      this.renderList();
                    },
                  },
                  {
                    key: "onblur",
                    value: function () {
                      this.list.innerHTML = "";
                    },
                  },
                  {
                    key: "oninput",
                    value: function () {
                      var e = this;
                      (this._query = this.el.value),
                        this.fetchResults(function () {
                          return e.renderList();
                        });
                    },
                  },
                  {
                    key: "onkeydown",
                    value: function (e) {
                      var t = e.keyCode;
                      switch (
                        ([g.UP, g.DOWN].indexOf(t) !== -1 && e.preventDefault(),
                        t)
                      ) {
                        case g.BACK:
                          (this.value || 1 === this.query.length) &&
                            this.clear();
                          break;
                        case g.ENTER:
                          !this.value && this.query && e.preventDefault(),
                            this.selectByIndex(this.activeIndex);
                          break;
                        case g.TAB:
                          this.value || this.selectByIndex(this.activeIndex);
                          break;
                        case g.UP:
                          this.activeIndex = Math.max(0, this.activeIndex - 1);
                          break;
                        case g.DOWN:
                          this.activeIndex = Math.min(
                            this.results.length - 1,
                            this.activeIndex + 1
                          );
                      }
                    },
                  },
                  {
                    key: "selectByIndex",
                    value: function (e) {
                      this.activeIndex = e;
                      var t = this.value;
                      this.value = this.results[e] || null;
                      var n =
                        this.list.firstChild &&
                        this.list.firstChild.classList.contains("geolocate");
                      n && this.currentLocation(),
                        t === this.value ||
                          n ||
                          this.emit("change", this.value),
                        (this.list.innerHTML = ""),
                        (this.query = this.value ? this.value.title : "");
                    },
                  },
                  {
                    key: "wrapMatches",
                    value: function () {
                      var e =
                          arguments.length <= 0 || void 0 === arguments[0]
                            ? ""
                            : arguments[0],
                        t = e;
                      return (
                        this.query
                          .split(/[\,\s]+/)
                          .filter(function (e) {
                            return !!e;
                          })
                          .forEach(function (e) {
                            var n = new RegExp(
                              (0, y["default"])(e) + "(?![^<]*>|[^<>]*</)",
                              "gi"
                            );
                            t = t.replace(n, "<span>$&</span>");
                          }),
                        t
                      );
                    },
                  },
                  {
                    key: "renderList",
                    value: function () {
                      var e = this,
                        t =
                          arguments.length <= 0 || void 0 === arguments[0]
                            ? {}
                            : arguments[0],
                        n = t.geoLocate,
                        i = void 0 === n ? this.geoLocate : n,
                        r = this.results
                          .map(function (t) {
                            return x(e.itemTemplate(t));
                          })
                          .slice(0, this.maxItems)
                          .join("");
                      r || "" === this.query || this.value || (r = k),
                        "" === this.query && i && (r = $),
                        (this.list.innerHTML = r),
                        (this.activeIndex = 0);
                    },
                  },
                  {
                    key: "getResultByTitle",
                    value: function (e) {
                      return this.results && e
                        ? (0, p["default"])(this.results, function (t) {
                            return t.title.indexOf(e) !== -1;
                          })
                        : null;
                    },
                  },
                  {
                    key: "fetchResults",
                    value: function () {
                      var e = this,
                        t =
                          arguments.length <= 0 || void 0 === arguments[0]
                            ? function () {}
                            : arguments[0];
                      this.req && this.req.abort();
                      var n = this._cache[this.query];
                      return n
                        ? ((this.results = n), t())
                        : ((this.req = this.getCities(function (n) {
                            (e.results = e._cache[e.query] = n),
                              t(),
                              (e.loading = !1);
                          })),
                          void (this.loading = !0));
                    },
                  },
                  {
                    key: "currentLocation",
                    value: function () {
                      var e = this,
                        t = new XMLHttpRequest(),
                        n =
                          "location:nearest-cities/location:nearest-city/" +
                          (this.embeds ? "{" + this.embeds + "}" : "");
                      (this.loading = !0),
                        (this.oldPlaceholder = this.el.placeholder),
                        (this.el.placeholder = "Detecting location..."),
                        navigator.geolocation.getCurrentPosition(
                          function (i) {
                            var r = i.coords;
                            t.open(
                              "GET",
                              e.apiRoot +
                                "/locations/" +
                                r.latitude +
                                "," +
                                r.longitude +
                                "/?embed=" +
                                n
                            ),
                              t.setRequestHeader(
                                "Accept",
                                "application/vnd.teleport.v" +
                                  e.apiVersion +
                                  "+json"
                              ),
                              t.addEventListener("load", function () {
                                return e.parseLocation(JSON.parse(t.response));
                              }),
                              t.send();
                          },
                          function (t) {
                            var n = t.message;
                            (e.loading = !1),
                              (e.el.placeholder = n),
                              setTimeout(function () {
                                return (e.el.placeholder = e.oldPlaceholder);
                              }, 3e3);
                          },
                          {
                            timeout: 5e3,
                          }
                        );
                    },
                  },
                  {
                    key: "parseLocation",
                    value: function (e) {
                      var t = a["default"].parse(e),
                        n = t.embeddedArray("location:nearest-cities")[0];
                      n &&
                        ((this.results = [this.parseCity(n)]),
                        "nopick" === this.geoLocate
                          ? (this.el.focus(),
                            this.renderList({
                              geoLocate: !1,
                            }))
                          : this.selectByIndex(0)),
                        (this.loading = !1),
                        (this.el.placeholder = this.oldPlaceholder);
                    },
                  },
                  {
                    key: "getCities",
                    value: function (e) {
                      var t = this;
                      if (!this.query) return e([]);
                      var n =
                          "city:search-results/city:item/" +
                          (this.embeds ? "{" + this.embeds + "}" : ""),
                        i = new XMLHttpRequest(),
                        r = encodeURIComponent(this.query);
                      return (
                        i.open(
                          "GET",
                          this.apiRoot +
                            "/cities/?search=" +
                            r +
                            "&embed=" +
                            n +
                            "&limit=" +
                            this.maxItems
                        ),
                        i.setRequestHeader(
                          "Accept",
                          "application/vnd.teleport.v" +
                            this.apiVersion +
                            "+json"
                        ),
                        i.addEventListener("load", function () {
                          var n = a["default"]
                            .parse(JSON.parse(i.response))
                            .embeddedArray("city:search-results")
                            .map(function (e) {
                              return t.parseCity(e);
                            });
                          e(n);
                        }),
                        i.send(),
                        i
                      );
                    },
                  },
                  {
                    key: "parseCity",
                    value: function (e) {
                      var t =
                        e.embedded("location:nearest-city") ||
                        e.embedded("city:item");
                      (t.country = t.embedded("city:country")),
                        (t.admin1_division = t.embedded(
                          "city:admin1_division"
                        )),
                        (t.timezone = t.embedded("city:timezone")),
                        (t.urban_area = t.embedded("city:urban_area"));
                      var n = t.full_name,
                        i = t.name,
                        r = t.geoname_id,
                        o = t.population,
                        s = t.location.latlon,
                        a = s.latitude,
                        u = s.longitude,
                        c = e.matching_full_name,
                        l = void 0 === c ? n : c,
                        d = {
                          title: l,
                          name: i,
                          geonameId: r,
                          latitude: a,
                          longitude: u,
                          population: o,
                        };
                      if (
                        (t.country &&
                          (0, f["default"])(d, {
                            country: t.country.name,
                          }),
                        t.admin1_division)
                      ) {
                        var p = t.admin1_division,
                          h = p.name,
                          y = p.geonames_admin1_code;
                        (0, f["default"])(d, {
                          admin1Division: h,
                          admin1DivisionCode: y,
                        });
                      }
                      if (t.timezone) {
                        var v = t.timezone.embedded("tz:offsets-now");
                        (0, f["default"])(d, {
                          tzOffsetMinutes: v.total_offset_min,
                        });
                      }
                      if (t.urban_area) {
                        var m = t.urban_area,
                          g = m.slug,
                          b = m.name,
                          _ = m.ua_id,
                          x = m.teleport_city_url;
                        (0, f["default"])(d, {
                          uaName: b,
                          uaId: _,
                          uaCityUrl: x,
                          uaSlug: g,
                        });
                      }
                      return d;
                    },
                  },
                ],
                [
                  {
                    key: "init",
                    value: function (t) {
                      var n =
                          arguments.length <= 1 || void 0 === arguments[1]
                            ? {}
                            : arguments[1],
                        i =
                          "string" == typeof t || t instanceof HTMLInputElement
                            ? (0, f["default"])(n, {
                                el: t,
                              })
                            : t;
                      return new e(i);
                    },
                  },
                ]
              ),
              e
            );
          })();
          (n["default"] = j), (t.exports = n["default"]);
        },
        {
          "classlist-polyfill": 2,
          "core-js/library/fn/array/find": 3,
          "core-js/library/fn/object/assign": 4,
          "core-js/library/fn/regexp/escape": 5,
          debounce: 33,
          "element-closest": 34,
          halfred: 35,
          minivents: 39,
        },
      ],
      2: [
        function (e, t, n) {
          /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
          "document" in window.self &&
            ("classList" in document.createElement("_") &&
            (!document.createElementNS ||
              "classList" in
                document.createElementNS("http://www.w3.org/2000/svg", "g"))
              ? !(function () {
                  "use strict";
                  var e = document.createElement("_");
                  if (
                    (e.classList.add("c1", "c2"), !e.classList.contains("c2"))
                  ) {
                    var t = function (e) {
                      var t = DOMTokenList.prototype[e];
                      DOMTokenList.prototype[e] = function (e) {
                        var n,
                          i = arguments.length;
                        for (n = 0; n < i; n++)
                          (e = arguments[n]), t.call(this, e);
                      };
                    };
                    t("add"), t("remove");
                  }
                  if (
                    (e.classList.toggle("c3", !1), e.classList.contains("c3"))
                  ) {
                    var n = DOMTokenList.prototype.toggle;
                    DOMTokenList.prototype.toggle = function (e, t) {
                      return 1 in arguments && !this.contains(e) == !t
                        ? t
                        : n.call(this, e);
                    };
                  }
                  e = null;
                })()
              : !(function (e) {
                  "use strict";
                  if ("Element" in e) {
                    var t = "classList",
                      n = "prototype",
                      i = e.Element[n],
                      r = Object,
                      o =
                        String[n].trim ||
                        function () {
                          return this.replace(/^\s+|\s+$/g, "");
                        },
                      s =
                        Array[n].indexOf ||
                        function (e) {
                          for (var t = 0, n = this.length; t < n; t++)
                            if (t in this && this[t] === e) return t;
                          return -1;
                        },
                      a = function (e, t) {
                        (this.name = e),
                          (this.code = DOMException[e]),
                          (this.message = t);
                      },
                      u = function (e, t) {
                        if ("" === t)
                          throw new a(
                            "SYNTAX_ERR",
                            "An invalid or illegal string was specified"
                          );
                        if (/\s/.test(t))
                          throw new a(
                            "INVALID_CHARACTER_ERR",
                            "String contains an invalid character"
                          );
                        return s.call(e, t);
                      },
                      c = function (e) {
                        for (
                          var t = o.call(e.getAttribute("class") || ""),
                            n = t ? t.split(/\s+/) : [],
                            i = 0,
                            r = n.length;
                          i < r;
                          i++
                        )
                          this.push(n[i]);
                        this._updateClassName = function () {
                          e.setAttribute("class", this.toString());
                        };
                      },
                      l = (c[n] = []),
                      f = function () {
                        return new c(this);
                      };
                    if (
                      ((a[n] = Error[n]),
                      (l.item = function (e) {
                        return this[e] || null;
                      }),
                      (l.contains = function (e) {
                        return (e += ""), u(this, e) !== -1;
                      }),
                      (l.add = function () {
                        var e,
                          t = arguments,
                          n = 0,
                          i = t.length,
                          r = !1;
                        do
                          (e = t[n] + ""),
                            u(this, e) === -1 && (this.push(e), (r = !0));
                        while (++n < i);
                        r && this._updateClassName();
                      }),
                      (l.remove = function () {
                        var e,
                          t,
                          n = arguments,
                          i = 0,
                          r = n.length,
                          o = !1;
                        do
                          for (e = n[i] + "", t = u(this, e); t !== -1; )
                            this.splice(t, 1), (o = !0), (t = u(this, e));
                        while (++i < r);
                        o && this._updateClassName();
                      }),
                      (l.toggle = function (e, t) {
                        e += "";
                        var n = this.contains(e),
                          i = n ? t !== !0 && "remove" : t !== !1 && "add";
                        return i && this[i](e), t === !0 || t === !1 ? t : !n;
                      }),
                      (l.toString = function () {
                        return this.join(" ");
                      }),
                      r.defineProperty)
                    ) {
                      var d = {
                        get: f,
                        enumerable: !0,
                        configurable: !0,
                      };
                      try {
                        r.defineProperty(i, t, d);
                      } catch (p) {
                        p.number === -2146823252 &&
                          ((d.enumerable = !1), r.defineProperty(i, t, d));
                      }
                    } else r[n].__defineGetter__ && i.__defineGetter__(t, f);
                  }
                })(window.self));
        },
        {},
      ],
      3: [
        function (e, t, n) {
          e("../../modules/es6.array.find"),
            (t.exports = e("../../modules/$.core").Array.find);
        },
        {
          "../../modules/$.core": 11,
          "../../modules/es6.array.find": 29,
        },
      ],
      4: [
        function (e, t, n) {
          e("../../modules/es6.object.assign"),
            (t.exports = e("../../modules/$.core").Object.assign);
        },
        {
          "../../modules/$.core": 11,
          "../../modules/es6.object.assign": 30,
        },
      ],
      5: [
        function (e, t, n) {
          e("../../modules/es7.regexp.escape"),
            (t.exports = e("../../modules/$.core").RegExp.escape);
        },
        {
          "../../modules/$.core": 11,
          "../../modules/es7.regexp.escape": 31,
        },
      ],
      6: [
        function (e, t, n) {
          t.exports = function (e) {
            if ("function" != typeof e)
              throw TypeError(e + " is not a function!");
            return e;
          };
        },
        {},
      ],
      7: [
        function (e, t, n) {
          t.exports = function () {};
        },
        {},
      ],
      8: [
        function (e, t, n) {
          var i = e("./$.ctx"),
            r = e("./$.iobject"),
            o = e("./$.to-object"),
            s = e("./$.to-length"),
            a = e("./$.array-species-create");
          t.exports = function (e) {
            var t = 1 == e,
              n = 2 == e,
              u = 3 == e,
              c = 4 == e,
              l = 6 == e,
              f = 5 == e || l;
            return function (d, p, h) {
              for (
                var y,
                  v,
                  m = o(d),
                  g = r(m),
                  b = i(p, h, 3),
                  _ = s(g.length),
                  x = 0,
                  k = t ? a(d, _) : n ? a(d, 0) : void 0;
                _ > x;
                x++
              )
                if ((f || x in g) && ((y = g[x]), (v = b(y, x, m)), e))
                  if (t) k[x] = v;
                  else if (v)
                    switch (e) {
                      case 3:
                        return !0;
                      case 5:
                        return y;
                      case 6:
                        return x;
                      case 2:
                        k.push(y);
                    }
                  else if (c) return !1;
              return l ? -1 : u || c ? c : k;
            };
          };
        },
        {
          "./$.array-species-create": 9,
          "./$.ctx": 12,
          "./$.iobject": 17,
          "./$.to-length": 25,
          "./$.to-object": 26,
        },
      ],
      9: [
        function (e, t, n) {
          var i = e("./$.is-object"),
            r = e("./$.is-array"),
            o = e("./$.wks")("species");
          t.exports = function (e, t) {
            var n;
            return (
              r(e) &&
                ((n = e.constructor),
                "function" != typeof n ||
                  (n !== Array && !r(n.prototype)) ||
                  (n = void 0),
                i(n) && ((n = n[o]), null === n && (n = void 0))),
              new (void 0 === n ? Array : n)(t)
            );
          };
        },
        {
          "./$.is-array": 18,
          "./$.is-object": 19,
          "./$.wks": 28,
        },
      ],
      10: [
        function (e, t, n) {
          var i = {}.toString;
          t.exports = function (e) {
            return i.call(e).slice(8, -1);
          };
        },
        {},
      ],
      11: [
        function (e, t, n) {
          var i = (t.exports = {
            version: "1.2.6",
          });
          "number" == typeof __e && (__e = i);
        },
        {},
      ],
      12: [
        function (e, t, n) {
          var i = e("./$.a-function");
          t.exports = function (e, t, n) {
            if ((i(e), void 0 === t)) return e;
            switch (n) {
              case 1:
                return function (n) {
                  return e.call(t, n);
                };
              case 2:
                return function (n, i) {
                  return e.call(t, n, i);
                };
              case 3:
                return function (n, i, r) {
                  return e.call(t, n, i, r);
                };
            }
            return function () {
              return e.apply(t, arguments);
            };
          };
        },
        {
          "./$.a-function": 6,
        },
      ],
      13: [
        function (e, t, n) {
          t.exports = function (e) {
            if (void 0 == e) throw TypeError("Can't call method on  " + e);
            return e;
          };
        },
        {},
      ],
      14: [
        function (e, t, n) {
          var i = e("./$.global"),
            r = e("./$.core"),
            o = e("./$.ctx"),
            s = "prototype",
            a = function (e, t, n) {
              var u,
                c,
                l,
                f = e & a.F,
                d = e & a.G,
                p = e & a.S,
                h = e & a.P,
                y = e & a.B,
                v = e & a.W,
                m = d ? r : r[t] || (r[t] = {}),
                g = d ? i : p ? i[t] : (i[t] || {})[s];
              d && (n = t);
              for (u in n)
                (c = !f && g && u in g),
                  (c && u in m) ||
                    ((l = c ? g[u] : n[u]),
                    (m[u] =
                      d && "function" != typeof g[u]
                        ? n[u]
                        : y && c
                        ? o(l, i)
                        : v && g[u] == l
                        ? (function (e) {
                            var t = function (t) {
                              return this instanceof e ? new e(t) : e(t);
                            };
                            return (t[s] = e[s]), t;
                          })(l)
                        : h && "function" == typeof l
                        ? o(Function.call, l)
                        : l),
                    h && ((m[s] || (m[s] = {}))[u] = l));
            };
          (a.F = 1),
            (a.G = 2),
            (a.S = 4),
            (a.P = 8),
            (a.B = 16),
            (a.W = 32),
            (t.exports = a);
        },
        {
          "./$.core": 11,
          "./$.ctx": 12,
          "./$.global": 16,
        },
      ],
      15: [
        function (e, t, n) {
          t.exports = function (e) {
            try {
              return !!e();
            } catch (t) {
              return !0;
            }
          };
        },
        {},
      ],
      16: [
        function (e, t, n) {
          var i = (t.exports =
            "undefined" != typeof window && window.Math == Math
              ? window
              : "undefined" != typeof self && self.Math == Math
              ? self
              : Function("return this")());
          "number" == typeof __g && (__g = i);
        },
        {},
      ],
      17: [
        function (e, t, n) {
          var i = e("./$.cof");
          t.exports = Object("z").propertyIsEnumerable(0)
            ? Object
            : function (e) {
                return "String" == i(e) ? e.split("") : Object(e);
              };
        },
        {
          "./$.cof": 10,
        },
      ],
      18: [
        function (e, t, n) {
          var i = e("./$.cof");
          t.exports =
            Array.isArray ||
            function (e) {
              return "Array" == i(e);
            };
        },
        {
          "./$.cof": 10,
        },
      ],
      19: [
        function (e, t, n) {
          t.exports = function (e) {
            return "object" == typeof e ? null !== e : "function" == typeof e;
          };
        },
        {},
      ],
      20: [
        function (e, t, n) {
          var i = Object;
          t.exports = {
            create: i.create,
            getProto: i.getPrototypeOf,
            isEnum: {}.propertyIsEnumerable,
            getDesc: i.getOwnPropertyDescriptor,
            setDesc: i.defineProperty,
            setDescs: i.defineProperties,
            getKeys: i.keys,
            getNames: i.getOwnPropertyNames,
            getSymbols: i.getOwnPropertySymbols,
            each: [].forEach,
          };
        },
        {},
      ],
      21: [
        function (e, t, n) {
          var i = e("./$"),
            r = e("./$.to-object"),
            o = e("./$.iobject");
          t.exports = e("./$.fails")(function () {
            var e = Object.assign,
              t = {},
              n = {},
              i = Symbol(),
              r = "abcdefghijklmnopqrst";
            return (
              (t[i] = 7),
              r.split("").forEach(function (e) {
                n[e] = e;
              }),
              7 != e({}, t)[i] || Object.keys(e({}, n)).join("") != r
            );
          })
            ? function (e, t) {
                for (
                  var n = r(e),
                    s = arguments,
                    a = s.length,
                    u = 1,
                    c = i.getKeys,
                    l = i.getSymbols,
                    f = i.isEnum;
                  a > u;

                )
                  for (
                    var d,
                      p = o(s[u++]),
                      h = l ? c(p).concat(l(p)) : c(p),
                      y = h.length,
                      v = 0;
                    y > v;

                  )
                    f.call(p, (d = h[v++])) && (n[d] = p[d]);
                return n;
              }
            : Object.assign;
        },
        {
          "./$": 20,
          "./$.fails": 15,
          "./$.iobject": 17,
          "./$.to-object": 26,
        },
      ],
      22: [
        function (e, t, n) {
          t.exports = function (e, t) {
            var n =
              t === Object(t)
                ? function (e) {
                    return t[e];
                  }
                : t;
            return function (t) {
              return String(t).replace(e, n);
            };
          };
        },
        {},
      ],
      23: [
        function (e, t, n) {
          var i = e("./$.global"),
            r = "__core-js_shared__",
            o = i[r] || (i[r] = {});
          t.exports = function (e) {
            return o[e] || (o[e] = {});
          };
        },
        {
          "./$.global": 16,
        },
      ],
      24: [
        function (e, t, n) {
          var i = Math.ceil,
            r = Math.floor;
          t.exports = function (e) {
            return isNaN((e = +e)) ? 0 : (e > 0 ? r : i)(e);
          };
        },
        {},
      ],
      25: [
        function (e, t, n) {
          var i = e("./$.to-integer"),
            r = Math.min;
          t.exports = function (e) {
            return e > 0 ? r(i(e), 9007199254740991) : 0;
          };
        },
        {
          "./$.to-integer": 24,
        },
      ],
      26: [
        function (e, t, n) {
          var i = e("./$.defined");
          t.exports = function (e) {
            return Object(i(e));
          };
        },
        {
          "./$.defined": 13,
        },
      ],
      27: [
        function (e, t, n) {
          var i = 0,
            r = Math.random();
          t.exports = function (e) {
            return "Symbol(".concat(
              void 0 === e ? "" : e,
              ")_",
              (++i + r).toString(36)
            );
          };
        },
        {},
      ],
      28: [
        function (e, t, n) {
          var i = e("./$.shared")("wks"),
            r = e("./$.uid"),
            o = e("./$.global").Symbol;
          t.exports = function (e) {
            return i[e] || (i[e] = (o && o[e]) || (o || r)("Symbol." + e));
          };
        },
        {
          "./$.global": 16,
          "./$.shared": 23,
          "./$.uid": 27,
        },
      ],
      29: [
        function (e, t, n) {
          "use strict";
          var i = e("./$.export"),
            r = e("./$.array-methods")(5),
            o = "find",
            s = !0;
          o in [] &&
            Array(1)[o](function () {
              s = !1;
            }),
            i(i.P + i.F * s, "Array", {
              find: function (e) {
                return r(this, e, arguments.length > 1 ? arguments[1] : void 0);
              },
            }),
            e("./$.add-to-unscopables")(o);
        },
        {
          "./$.add-to-unscopables": 7,
          "./$.array-methods": 8,
          "./$.export": 14,
        },
      ],
      30: [
        function (e, t, n) {
          var i = e("./$.export");
          i(i.S + i.F, "Object", {
            assign: e("./$.object-assign"),
          });
        },
        {
          "./$.export": 14,
          "./$.object-assign": 21,
        },
      ],
      31: [
        function (e, t, n) {
          var i = e("./$.export"),
            r = e("./$.replacer")(/[\\^$*+?.()|[\]{}]/g, "\\$&");
          i(i.S, "RegExp", {
            escape: function (e) {
              return r(e);
            },
          });
        },
        {
          "./$.export": 14,
          "./$.replacer": 22,
        },
      ],
      32: [
        function (e, t, n) {
          function i() {
            return new Date().getTime();
          }
          t.exports = Date.now || i;
        },
        {},
      ],
      33: [
        function (e, t, n) {
          var i = e("date-now");
          t.exports = function (e, t, n) {
            function r() {
              var l = i() - u;
              l < t && l > 0
                ? (o = setTimeout(r, t - l))
                : ((o = null), n || ((c = e.apply(a, s)), o || (a = s = null)));
            }
            var o, s, a, u, c;
            return (
              null == t && (t = 100),
              function () {
                (a = this), (s = arguments), (u = i());
                var l = n && !o;
                return (
                  o || (o = setTimeout(r, t)),
                  l && ((c = e.apply(a, s)), (a = s = null)),
                  c
                );
              }
            );
          };
        },
        {
          "date-now": 32,
        },
      ],
      34: [
        function (e, t, n) {
          !(function (e) {
            (e.matches =
              e.matches ||
              e.mozMatchesSelector ||
              e.msMatchesSelector ||
              e.oMatchesSelector ||
              e.webkitMatchesSelector),
              (e.closest =
                e.closest ||
                function (e) {
                  for (var t = this; t && !t.matches(e); ) t = t.parentElement;
                  return t;
                });
          })(Element.prototype);
        },
        {},
      ],
      35: [
        function (e, t, n) {
          var i = e("./lib/parser"),
            r = e("./lib/resource"),
            o = !1;
          t.exports = {
            parse: function (e) {
              return new i().parse(e, o);
            },
            enableValidation: function (e) {
              o = null == e || e;
            },
            disableValidation: function () {
              o = !1;
            },
            Resource: r,
          };
        },
        {
          "./lib/parser": 37,
          "./lib/resource": 38,
        },
      ],
      36: [
        function (e, t, n) {
          "use strict";

          function i() {
            arguments.length >= 1
              ? (this._array = arguments[0])
              : (this._array = []);
          }
          (i.prototype.array = function () {
            return this._array;
          }),
            (i.prototype.isEmpty = function (e) {
              return 0 === this._array.length;
            }),
            (i.prototype.push = function (e) {
              var t = this._array.slice(0);
              return t.push(e), new i(t);
            }),
            (i.prototype.pop = function () {
              var e = this._array.slice(0, this._array.length - 1);
              return new i(e);
            }),
            (i.prototype.peek = function () {
              if (this.isEmpty()) throw new Error("can't peek on empty stack");
              return this._array[this._array.length - 1];
            }),
            (t.exports = i);
        },
        {},
      ],
      37: [
        function (e, t, n) {
          "use strict";

          function i() {}

          function r(e, t, n) {
            if (null == e) return e;
            var i = o(e._links, t, n.push("_links")),
              r = s(i),
              c = a(e._embedded, t, n.push("_embedded")),
              l = new b(i, r, c, t);
            return u(e, l), (l._original = e), l;
          }

          function o(e, t, n) {
            return (
              (e = c(e, f, t, n)),
              (null != e && null != e.self) ||
                y("Resource does not have a self link", t, n),
              e
            );
          }

          function s(e) {
            return e ? e.curies : [];
          }

          function a(e, t, n) {
            var i = c(e, h, t, n);
            return null == i
              ? i
              : (Object.keys(i).forEach(function (e) {
                  i[e] = i[e].map(function (i) {
                    var o = null != t ? [] : null,
                      s = r(i, o, n.push(e));
                    return (s._original = i), s;
                  });
                }),
                i);
          }

          function u(e, t) {
            Object.keys(e).forEach(function (n) {
              "_links" !== n && "_embedded" !== n && (t[n] = e[n]);
            });
          }

          function c(e, t, n, i) {
            if (null == e) return e;
            var r = {};
            return (
              Object.keys(e).forEach(function (o) {
                r[o] = l(o, e[o], t, n, i);
              }),
              r
            );
          }

          function l(e, t, n, i, r) {
            return d(t)
              ? t.map(function (t) {
                  return n(e, t, i, r);
                })
              : [n(e, t, i, r)];
          }

          function f(e, t, n, i) {
            if (!p(t))
              throw new Error(
                "Link object is not an actual object: " +
                  t +
                  " [" +
                  typeof t +
                  "]"
              );
            var r = m(t);
            return (
              Object.keys(x).forEach(function (t) {
                null == r[t] &&
                  (x[t].required &&
                    y("Link misses required property " + t + ".", n, i.push(e)),
                  null != x[t].defaultValue && (r[t] = x[t].defaultValue));
              }),
              r.deprecation &&
                v(
                  "Warning: Link " +
                    g(i.push(e)) +
                    " is deprecated, see " +
                    r.deprecation
                ),
              r.templated !== !0 && r.templated !== !1 && (r.templated = !1),
              n
                ? (r.href &&
                    r.href.indexOf("{") >= 0 &&
                    !r.templated &&
                    y(
                      'Link seems to be an URI template but its "templated" property is not set to true.',
                      n,
                      i.push(e)
                    ),
                  r)
                : r
            );
          }

          function d(e) {
            return "[object Array]" === Object.prototype.toString.call(e);
          }

          function p(e) {
            return "object" == typeof e;
          }

          function h(e, t) {
            return t;
          }

          function y(e, t, n) {
            t &&
              t.push({
                path: g(n),
                message: e,
              });
          }

          function v(e) {
            "undefined" != typeof console &&
              "function" == typeof console.log &&
              console.log(e);
          }

          function m(e) {
            var t = {};
            return (
              Object.keys(e).forEach(function (n) {
                t[n] = e[n];
              }),
              t
            );
          }

          function g(e) {
            for (var t = "$.", n = 0; n < e.array().length; n++)
              t += e.array()[n] + ".";
            return (t = t.substring(0, t.length - 1));
          }
          var b = e("./resource"),
            _ = e("./immutable_stack"),
            x = {
              href: {
                required: !0,
                defaultValue: null,
              },
              templated: {
                required: !1,
                defaultValue: !1,
              },
              type: {
                required: !1,
                defaultValue: null,
              },
              deprecation: {
                required: !1,
                defaultValue: null,
              },
              name: {
                required: !1,
                defaultValue: null,
              },
              profile: {
                required: !1,
                defaultValue: null,
              },
              title: {
                required: !1,
                defaultValue: null,
              },
              hreflang: {
                required: !1,
                defaultValue: null,
              },
            };
          (i.prototype.parse = function (e, t) {
            var n = t ? [] : null;
            return r(e, n, new _());
          }),
            (t.exports = i);
        },
        {
          "./immutable_stack": 36,
          "./resource": 38,
        },
      ],
      38: [
        function (e, t, n) {
          "use strict";

          function i(e, t, n, i) {
            (this._links = e || {}),
              this._initCuries(t),
              (this._embedded = n || {}),
              (this._validation = i || []);
          }

          function r(e, t) {
            return null != e ? e[t] : null;
          }

          function o(e, t, n) {
            n = n || 0;
            var i = r(e, t);
            return null != i && i.length >= 1 ? i[n] : null;
          }
          (i.prototype._initCuries = function (e) {
            if (((this._curiesMap = {}), e)) {
              this._curies = e;
              for (var t = 0; t < this._curies.length; t++) {
                var n = this._curies[t];
                this._curiesMap[n.name] = n;
              }
            } else this._curies = [];
            this._preResolveCuries();
          }),
            (i.prototype._preResolveCuries = function () {
              this._resolvedCuriesMap = {};
              for (var e = 0; e < this._curies.length; e++) {
                var t = this._curies[e];
                if (t.name)
                  for (var n in this._links)
                    "curies" !== n && this._preResolveCurie(t, n);
              }
            }),
            (i.prototype._preResolveCurie = function (e, t) {
              var n = (this._links[t], t.split(/:(.+)/)),
                i = n[0];
              if (e.name === i)
                if (e.templated && n.length >= 1) {
                  var r = e.href.replace(/(.*){(.*)}(.*)/, "$1" + n[1] + "$3");
                  this._resolvedCuriesMap[r] = t;
                } else this._resolvedCuriesMap[e.href] = t;
            }),
            (i.prototype.allLinkArrays = function () {
              return this._links;
            }),
            (i.prototype.linkArray = function (e) {
              return r(this._links, e);
            }),
            (i.prototype.link = function (e, t) {
              return o(this._links, e, t);
            }),
            (i.prototype.hasCuries = function (e) {
              return this._curies.length > 0;
            }),
            (i.prototype.curieArray = function (e) {
              return this._curies;
            }),
            (i.prototype.curie = function (e) {
              return this._curiesMap[e];
            }),
            (i.prototype.reverseResolveCurie = function (e) {
              return this._resolvedCuriesMap[e];
            }),
            (i.prototype.allEmbeddedResourceArrays = function () {
              return this._embedded;
            }),
            (i.prototype.embeddedResourceArray = function (e) {
              return r(this._embedded, e);
            }),
            (i.prototype.embeddedResource = function (e, t) {
              return o(this._embedded, e, t);
            }),
            (i.prototype.original = function () {
              return this._original;
            }),
            (i.prototype.validationIssues = function () {
              return this._validation;
            }),
            (i.prototype.allLinks = i.prototype.allLinkArrays),
            (i.prototype.allEmbeddedArrays = i.prototype.allEmbeddedResources =
              i.prototype.allEmbeddedResourceArrays),
            (i.prototype.embeddedArray = i.prototype.embeddedResourceArray),
            (i.prototype.embedded = i.prototype.embeddedResource),
            (i.prototype.validation = i.prototype.validationIssues),
            (t.exports = i);
        },
        {},
      ],
      39: [
        function (e, t, n) {
          t.exports = function (e) {
            var t = {},
              n = [];
            (e = e || this),
              (e.on = function (e, n, i) {
                (t[e] = t[e] || []).push([n, i]);
              }),
              (e.off = function (e, i) {
                e || (t = {});
                for (
                  var r = t[e] || n, o = (r.length = i ? r.length : 0);
                  o--;

                )
                  i == r[o][0] && r.splice(o, 1);
              }),
              (e.emit = function (e) {
                for (
                  var i,
                    r = t[e] || n,
                    o = r.length > 0 ? r.slice(0, r.length) : r,
                    s = 0;
                  (i = o[s++]);

                )
                  i[0].apply(i[1], n.slice.call(arguments, 1));
              });
          };
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});
//# sourceMappingURL=teleport-autocomplete.min.js.map

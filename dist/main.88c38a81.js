// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.lastLi');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{ logo: 'A', logoType: 'text', url: 'https://www.acfun.cn' }, { logo: '#iconCN_bilibiliB', logoType: 'icon', url: 'https://www.bilibili.com' }];
var removeUrl = function removeUrl(url) {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var load = function load() {
    $siteList.find('li:not(.lastLi)').remove();
    hashMap.forEach(function (node, index) {
        if (node.logoType === 'text') {
            console.log(index);
            var $li = $('\n                <li>\n                    <div class="site">\n                        <div class="logo">' + node.logo + '</div>\n                        <div class="link">' + removeUrl(node.url) + '</div>\n                        <div class="close">\n                            <svg class="icon">\n                                <use xlink:href="#iconguanbi"></use>\n                            </svg>\n                        </div>\n                    </div>\n                </li>').insertBefore($lastLi);
            $li.on('click', '.close', function (e) {
                e.stopPropagation();
                var flag = confirm('确定吗？');
                if (flag) {
                    hashMap.splice(index, 1);
                    load();
                }
            });
            $li.on('click', function () {
                window.location.href = node.url;
            });
        } else if (node.logoType === 'icon') {
            var _$li = $('\n            <li>\n                <div class="site">\n                    <div class="logo">\n                        <svg class="icon">\n                            <use xlink:href="' + node.logo + '"></use>\n                        </svg>\n                    </div>\n                    <div class="link">' + removeUrl(node.url) + '</div>\n                    <div class="close">\n                            <svg class="icon">\n                                <use xlink:href="#iconguanbi"></use>\n                            </svg>\n                        </div>\n                </div>\n            </li>').insertBefore($lastLi);
            _$li.on('click', '.close', function (e) {
                e.stopPropagation();
                var flag = confirm('确定吗？');
                if (flag) {
                    hashMap.splice(index, 1);
                    load();
                }
            });
            _$li.on('click', function () {
                window.location.href = node.url;
            });
        }
    });
};
load();
$('.addButton').on('click', function () {
    var url = window.prompt('请输入你要添加的网址');
    if (url === '') {
        alert('您还没有输入网址');
    } else if (url.indexOf('https') !== 0) {
        url = 'https://' + url;
        hashMap.push({
            logo: removeUrl(url)[0].toUpperCase(),
            logoType: 'text',
            url: url
        });
        load();
    }
});

window.onbeforeunload = function () {
    var string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
    var key = e.key;
    for (var i = 0; i < hashMap.length; i++) {
        if (key === removeUrl(hashMap[i].url)[0]) {
            window.location.href = hashMap[i].url;
            break;
        }
    }
});
},{}]},{},[6], null)
//# sourceMappingURL=main.88c38a81.map
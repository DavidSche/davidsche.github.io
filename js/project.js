/**
 * Created by DavidChe on 2017/9/8.
 */
var icons, keyCode, keyCodes;
$(document).ready(function () {
    icons = {
        jquery: 'icon-jquery',
        vue: 'icon-vuejs',
        echarts: 'icon-echart',
        layui: 'icon-layer',
        css3: 'icon-css',
        handlebars: 'icon-qishihorseman1',
        vue: 'icon-vuejs',
        bootstrap: 'icon-bootstrap',
        webpack: 'icon-webpack1',
        mintui: 'icon-yezi',
        gulp: 'icon-gulp',
        elementUi: 'icon-element'
    };
    document.getElementById("keycode").onkeyup = function (e) {
        if (window.event)//如果window.event对象存在，就以此事件对象为准
            e = window.event;
        var code = e.charCode || e.keyCode;
        if (code == 13) {
            search();
        }
    }

    ajaxData();
});

function loadKeyCodes() {

    $(keyCodes).each(function (index, key) {
        var $span = $("<span>").html(key).click(function () {
            search(key);
        });
        $('#keyCodes').append($span);
    });
}

function search(_keyCode) {

    keyCode = _keyCode || $("#keycode").val();
    keyCode = keyCode == "ALL"?"":keyCode;
    if(_keyCode)$("#keycode").val(keyCode);
    ajaxData();
}

function ajaxData() {

    $(".projects-markdown").html("");
    $(".no-result").hide();

    $.ajax({
        url: "project/9cf.md?v=1",
        success: function (data) {

            data = $(marked(data));
            if(!keyCodes) {
                keyCodes = data[0].innerText.split(',');
                keyCodes[0] ='ALL';
                loadKeyCodes();
            }
            var $item, num = 0;
            $("li", data[2]).each(function (index, item) {
                $item = $(item);

                if (keyCode && $item[0].innerText.toLowerCase().indexOf(keyCode.toLowerCase()) == -1)
                    return;

                var $img = $("img:eq(0)", $item);
                var imgPath = $img.attr("src");
                $img.attr({"src": '', "data-original": imgPath});
                $("img:eq(1)", $item).attr("tag", 1);

                $("#con" + num % 4).append($item);
                num++;
                //使用技术
                var $div = $("div:eq(0)", $item);
                //console.log($div);
                var technology = $div.html().split(',');
                $div.addClass("div-technology").html("");
                $div.append("<span style='font-size:13px;'>使用技术：</span>");
                $(technology).each(function (index, item) {
                    var icon = icons[item];
                    $div.append($("<i>").attr("class", "icon iconfont " + icon).attr("title", item));
                });
            });

            if(num == 0){
                $(".no-result").show();
                return;
            }

            $(".projects-markdown li a").attr("target", "_blank");
            $(".projects-markdown li").click(function () {
                var href = $(this).find("a").attr("href");
                window.open(href);
            });

            $(".projects-markdown li").each(function (index, item) {
                var i = $("<i class='icon iconfont icon-github1' />").css({"float": "right"});
                var a_url = $("p:eq(0) a", $(this)).attr("href");
                $(item).append(i);
                var strArray = a_url.split("/")
                var s1 = strArray[2].split(".")[0];
                var s2 = strArray[3];
                $(".icon-github1", $(this)).attr("href", "https://github.com/" + s1 + "/" + s2);
                //跳转到git页面
                $(".icon-github1", $(this)).click(function () {
                    var href = $(this).attr("href")
                    window.open(href);
                    return false;
                })
            })
            //仿懒加载效果
            $("#projectsRow img").scrollLoad(function () {
                $(this).attr("src", $(this).attr("data-original")).on("load", function () {
                    $(this).addClass("img-loding");
                })
            })
            //跳转到md文件
            $("#project-edit-link").click(function () {
                $(this).attr("href", "https://github.com/DavidSche/davidsche.github.io/edit/master/project/" + "9cf.md");
            })

        }
    })
}




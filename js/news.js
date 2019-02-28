/**
 * Created by DavidChe on 2017/7/12.
 */
var urlParam;
$(document).ready(function () {
    //$("html").niceScroll();
    marked.setOptions({
        gfm: true
    });
    //获取url中的参数日期，初始化日期是写死的
    urlParam = getHrefDate() ;
    //初始化加载周刊列表
    getListData(urlParam);
    //初始化加载最新一期周刊内容，
    //getContentData(urlParam);
    //编辑周刊内容的icon链接
    $("#news-edit-link").attr("href","https://github.com/DavidSche/davidsche.github.io/edit/master/news/"+urlParam+".md");

    //MORE按钮点击显示更多-弹窗
    $(".markdown-list-more-btn").click(function(){
        $(".markdown-list-more-body").removeClass("hide").addClass("show");
    });
    //关闭按钮隐藏弹窗
    $(".markdown-list-more-close-btn").click(function(){
        $(this).parent().parent().removeClass("show").addClass("hide");
    });

});
/**
 * 获取链接中的参数日期
 * @returns {*}
 */
function getHrefDate(){
    var winHref = window.location.href;
    if(winHref.indexOf("#")>=0){
        return winHref.substring(winHref.indexOf("#")+1,winHref.length);
    }else{
        return "";
    }
}
/**
 * 获取采风列表
 * @param urlParam
 */
function getListData(){
    $.ajax({
        url: "news/index.md",
        success: function (data) {
            $(".markdown-content-body").addClass("active");
            $(".markdown-list-body,.markdown-list-more-show").html(marked(data));

            $(".markdown-list-body a,.markdown-list-more-show a").click(function(){
                urlParam = $(this).attr("href").replace("#","");
                getContentData(urlParam);
            });
            if(urlParam)
                getContentData(urlParam);
            else
                $(".markdown-list-body a:eq(0)").click();

            $(".markdown-list-more-show a").click(function(){
                $(".markdown-list-more-body").removeClass("show").addClass("hide");
            });
        }
    });
}
/**
 * 获取采风内容
 * @param urlParam
 */
function getContentData(urlParam){
    $.ajax({
        url: "news/"+urlParam+".md?v="+Math.random(),
        success: function (data) {
            $(".markdown-content-body").html(marked(data));
            $(".markdown-content-body a").attr("target","_blank");
            $(".markdown-body.markdown-content-body ul li").click(function(){
                var href = $(this).find("a").attr("href");
                window.open(href);
            });
            $(".markdown-content-body").addClass("active");

            $(".markdown-list-body a").removeClass("active");
            $(".markdown-list-body a[href='#"+urlParam+"'").addClass("active")

        }
    });
    $(".markdown-content-body").removeClass("active");

    Pace.restart();
}

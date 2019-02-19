/**
 * Created by DavidChe on 2017/7/12.
 */
$(document).ready(function () {
    marked.setOptions({
        gfm: true
    });
    //获取url中的参数日期，初始化日期是写死的
    var urlParam = getHrefDate() ;
    //初始化加载 入职注意事项，
    getContentData(urlParam);
    if(urlParam == "dailySpecification"){
        $(".doc-menu li").removeClass("active");
        $(".doc-menu li:eq(1)").addClass("active");
    }
    if(urlParam == "bugSuperviseScheme"){
        $(".doc-menu li").removeClass("active");
        $(".doc-menu li:eq(2)").addClass("active");
    }
    if(urlParam == "qualitySupervision"){
        $(".doc-menu li").removeClass("active");
        $(".doc-menu li:eq(3)").addClass("active");
    }
    if(urlParam == "cultivate"){
        $(".doc-menu li").removeClass("active");
        $(".doc-menu li:eq(4)").addClass("active");
    }
    if(urlParam == "staticPage"){
        $(".doc-menu li").removeClass("active");
        $(".doc-menu li:eq(5)").addClass("active");
    }
    if(urlParam == "chartTool"){
        $(".doc-menu li").removeClass("active");
        $(".doc-menu li:eq(6)").addClass("active");
    }
    if(urlParam == "questionnaire"){
        $(".doc-menu li").removeClass("active");
        $(".doc-menu li:eq(7)").addClass("active");
    }
    $(".doc-menu li a").click(function(){
        var hrefUrl = $(this).attr("href");
        urlParam = hrefUrl.substring(hrefUrl.indexOf("#")+1,hrefUrl.length);
        getContentData(urlParam);
        console.log(urlParam);
        $(".doc-menu li").removeClass("active");
        $(this).parent().addClass("active");

        //编辑内容的icon链接
        $("#doc-edit-link").attr("href","https://github.com/DavidSche/davidsche.github.io/edit/master/doc/"+urlParam+".md");

    });

    //编辑内容的icon链接
    $("#doc-edit-link").attr("href","https://github.com/DavidSche/davidsche.github.io/edit/master/doc/"+urlParam+".md");

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
        return "rules";
    }
}
/**
 * 获取周刊内容
 * @param urlParam
 */
function getContentData(urlParam){
    $.ajax({
        url: "doc/"+urlParam+".md?v="+Math.random(),
        success: function (data) {
            $(".markdown-body").html(marked(data));
            $(".markdown-content-body").addClass("active");
            
             $(".markdown-body.markdown-content-body a").attr("target","blank");

        }
    });

    Pace.restart();

    $(".markdown-content-body").removeClass("active");
}

/**
 * Created by DavidChe on 2017/12/12.
 */
var data;   //存储所有数据
var icons;  //存储所用技术icon
var arr=[]; //存储企业名称
var type;   //存储项目类别

$(function () {
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

    getJson();//解析json

    //模糊查询
    horsey(document.querySelector('#hy'), {
        source: [{ list:arr }]
    });

    //input点击Enter键搜索内容
    $("#hy").keydown(function(event){
        if(event.keyCode==13){
            projectList();
        }
    });
});

//解析json
function getJson() {
    $.getJSON('./js/project.json',function (res) {
        data = res;
        //将企业名称放入数组中
        $.each(data,function (idx,obj) {
            arr.push(obj.name);
        })
        projectList();
    })
}

//点击搜索按钮
function search() {
    projectList();
}

//点击关键字
$("#keyCodes span").click(function () {
    $("#keyCodes span").removeClass("active");
    $(this).addClass("active");
    type = $(this).text();
    projectList();
 });

//遍历列表
function projectList() {
    var html = '',
        num = 0,
        inputValue = $("#hy").val();
    $(".procon").html('');
    $(".no-result").hide();
    $.each(data,function(idx,obj){

        if(inputValue && obj.name.indexOf(inputValue) == -1)
            return;

       if(type && type != 'ALL' && obj.type.indexOf(type) == -1)
           return;

        //使用技术icon
        var iconsName = obj.technology.split(',');
        var iconHtml = "";
        $(iconsName).each(function (index, item) {
            var icon = icons[item];
            iconHtml += "<i class='icon iconfont "+ icon +" ' title='"+ item +"'></i>";
        });

        //github url
        var gitUrl;
        var url = obj.url,
            strArray = url.split("/"),
            s1 = strArray[2].split(".")[0],
            s2 = strArray[3],
            s3 = strArray[3].split(".")[0],
            s4 = strArray[4];
        var appUrl = url.indexOf("./phone.html?url=");
        if(appUrl == 0){
            gitUrl = '<a class="icon iconfont icon-github1 fr" target="_blank"  href="'+"https://github.com/" + s3 + "/" + s4+'"></a>';
        }else {
            gitUrl = '<a class="icon iconfont icon-github1 fr" target="_blank"  href="'+"https://github.com/" + s1 + "/" + s2+'"></a>';
        }

        //拼写html
        html = '<div class="project-box" type="'+obj.type+'">'+
            '<a href="'+obj.url+'" target="_blank" class="clearfix">'+
            '<div class="project-href">'+
            '<div class="shade"></div>'+
            '<img src="'+obj.img+'" alt="'+obj.name+'" data-original="'+obj.img+'">'+
            '</div>'+
            '<div class="projects-content">'+
            '<h3 class="h3-title">'+obj.name+'</h3>'+
            '<p class="p-con">'+obj.txt+'</p>'+
            '</a>'+
            '<div class="div-technology" id="divTechnology">'+
            '<label>使用技术：</label>'+ iconHtml +
            '</div>'+
            '<div class="clearfix">'+
            '<span class="fl">'+obj.time+'</span>'+gitUrl+
            '</div>'+
            '</div>'+
            '</div>';
        ;

        $("#con" + num % 4).append(html);
        num++;

        //仿懒加载效果
        $("#projectsRow img").scrollLoad(function () {
            $(this).addClass("img-loding");
            $(this).attr("src", $(this).attr("data-original")).on("load", function () {
                 
            })
        })
    });
    if(!num)
        $(".no-result").show();
}


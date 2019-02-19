/**
 * Created by ruyinjuan on 2018/09/07.
 */

$(function(){
    getJson();
});

//解析json
function getJson() {
    $.getJSON('timeline.json',function (res) {
        initTimeAxis(res);
        initTimeAxis2(res);
    })
}

/**
 * 时间轴数据展示
 *
 * @param {} data 时间轴数据对象
 */
function initTimeAxis(data){
    var html = "";
    $.each(data.items,function(i,obj){
        html += '<div class="cntl-state cntl-animate">';
        if(obj.items.length > 0){
            html += '<div class="cntl-content">';
            $.each(obj.items,function(j,infoObj){
                html += '<div class="cntl-date-box">';
                html += '<i class="icon-right"></i>';
                html += '<h4>' + infoObj.date + '</h4>';
                html += '<a href="'+infoObj.url+'" target="_blank"><p class="title">' + infoObj.title + '</p></a>';
                html += '<p>'+infoObj.intro+'</p>';
                html += '</div>';
            });
            html += '</div>';
            html += '<div class="cntl-image">';
            $.each(obj.items,function(j,infoObj){
                if(j==0){
                    html += '<div class="cntl-img-box active"><img src="'+infoObj.image+'"></div>';
                }else{
                    html += '<div class="cntl-img-box"><img src="'+infoObj.image+'"></div>';
                }
            });
            html += '</div>';
        }
        html += '<div class="cntl-icon cntl-center">'+obj.year+'</div>';
        html += '</div>';
    });
    $('#datalist').html(html);



    $(".cntl-date-box").hover(function(){
        var index = $(this).index();
        $(this).parent().siblings().find(".cntl-img-box").removeClass("active");
        $(this).parent().siblings().find(".cntl-img-box").eq(index).addClass("active");
    });
}

function initTimeAxis2(data){
    var html = "";
    html += '<div class="clearfix year">';
    html += '<i class="year-line"></i>';
    html += '<ul class="clearfix">';
    $.each(data.items,function(i,obj){
        html += '<li><span><i></i></span>' + obj.year + '</li>';
    });
    html += '</ul>';
    html += '</div>';
    $.each(data.items,function(i,obj){
        html += '<div class="year-item clearfix">';
        if(obj.items.length > 0){
            $.each(obj.items,function(j,infoObj){
                if(j==0){
                    html += '<div class="item-box active">';
                }else{
                    html += '<div class="item-box">';
                }
                html += '<div class="item-content">';
                html += '<div class="icon-circle"><i></i><span>' + infoObj.date + '</span></div>';
                html += '<div class="item-main">';
                html += '<h3 class="title"><a href="' + infoObj.url + '" target="_blank"><span>' + infoObj.title + '</span></a></h3>';
                html += '<div class="clearfix detail-box">';
                html += '<div class="imgs-box fr">';
                html += '<a href="' + infoObj.url + '" target="_blank" class="img"><img src="' + infoObj.image + '"/></a>';
                html += '<a href="' + infoObj.url + '" target="_blank" class="img"><img src="' + infoObj.image + '"/></a>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            });
        }
        html += '</div>';
    });
    $('#datalist').html(html);

    $(".year li:eq(0)").addClass("active");
    $(".item-box:eq(0)").addClass("active");
    $(".year-item:eq(0)").show();

    console.log(document.body.offsetWidth);
    var offsetwidth = document.body.offsetWidth;
    var ind = 0;
    $(".year li").click(function(){
        var index = $(this).index();
        var leftcss = parseFloat($(".tl-box .year ul").css("left"));
        if(offsetwidth < 800){
            if(index > ind){
                $(".tl-box .year ul").css({"left" : (leftcss-69.5*(index-ind))+"px"});
            }else if(index < ind){
                $(".tl-box .year ul").css({"left" : (leftcss+69.5*(ind-index))+"px"});
            }
        }else{
            if(index > ind){
                $(".tl-box .year ul").css({"left" : (leftcss-117.5*(index-ind))+"px"});
            }else if(index < ind){
                $(".tl-box .year ul").css({"left" : (leftcss+117.5*(ind-index))+"px"});
            }
        }
        ind = index;
        $(".year li").removeClass("active");
        $(this).addClass("active");
        $(".year-item").hide();
        $(".year-item:eq("+index+")").show();
        $(".item-box").removeClass("active");
        $(".year-item:eq("+index+") .item-box:eq(0)").addClass("active");
    });

    $(".item-box .title").hover(function(){
        $(".item-box").removeClass("active");
        $(this).parent().parent().parent().addClass("active");
    });
}
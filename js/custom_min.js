var $head = $("#ha-header");
$(".ha-waypoint").each(function (b) {
    var a = $(this), c = a.data("animateDown"), d = a.data("animateUp");
    a.waypoint(function (e) {
        if (e === "down" && c) {
            $head.attr("class", "ha-header " + c)
        } else {
            if (e === "up" && d) {
                $head.attr("class", "ha-header " + d)
            }
        }
    }, {offset: "100%"})
});

$(document).ready(function () {
    new Ractive({
        el: '#filter_container',
        template: '#teamRTemp',
        data: {
            teams: app.teams
        }
    });


    //$("html").niceScroll();
    /*$(".scroller").getNiceScroll().resize();
    $(".flexslider").flexslider({
        animation: "fade", start: function (b) {
            $("body").removeClass("loading")
        }
    });*/
    $("span.mask").hover(function () {
        $(this).siblings("a img").addClass("hovering");
        $(this).parent().siblings(".portfolio-title").css({"height":"40px"}).children("h4").stop().animate({top: -20}, 350)
    }, function () {
        $(this).siblings("a img").removeClass("hovering");
        $(this).parent().siblings(".portfolio-title").css({"height":"20px"}).children("h4").stop().animate({top: 0}, 350)
    });
    $("a[href*=#]:not([href=#])").click(function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") || location.hostname == this.hostname) {
            var b = $(this.hash);
            var hashName=this.hash;
            b = b.length ? b : $("[name=" + this.hash.slice(1) + "]");
            if (b.length) {
                $("html,body").animate({scrollTop: b.offset().top}, 500,null,function () {
                    location.hash = hashName;
                });
                return false
            }
        }
    });

    $(".scrollLoading").scrollLoading();
});

function vaildateNet(){

    $("#priInfo").attr({href:"",target:"_self"});
}

$(function () {
    bannerBG();
    var b = $("#filter_container");
    b.isotope({itemSelector: ".element"});
    var a = $("#filter_header .option-set"), c = a.find("a");
    var teams = {
        "*":'前端团队总共五个组，我们有的擅长CSS3、H5，有的擅长前端框架库的运用，也有全栈工程师，充分利用每一个成员的能力，为同一个目的而努力。',
        ".pro1": '我们主要负责应用平台部分项目的的前端工作，我们爱好学习，我们钻研新技术，我们能快速完成领导给予的任务。',
        ".pro2": '我们是积极，团结，友爱，乐于分享，让你安全感十足的团队。',
        ".pro3": '更好，更快，更小，精益求精',
        ".pro4": '面向对象面向君，不负代码不负卿',
        ".pub": '面对挑战，我们有强行带走胜利的决心，fighting...'
    };
    c.click(function () {
        var h = $(this);
        if (h.hasClass("selected")) {
            return false
        }
        var f = h.parents(".option-set");
        f.find(".selected").removeClass("selected");
        h.addClass("selected");
        var d = {}, e = f.attr("data-option-key"), g = h.attr("data-option-value");
        g = g === "false" ? false : g;
        d[e] = g;
        $("#tramIntro").html(teams[g]);
        if (e === "layoutMode" && typeof changeLayoutMode === "function") {
            changeLayoutMode(h, d)
        } else {
            b.isotope(d)
        }
        return false
    })
});


function bannerBG(){
    particlesJS("rank-banner", {
        particles: {
            number: {
                value: 40,
                density: {
                    enable: !0,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100
                }
            },
            opacity: {
                value: .3,
                random: !1,
                anim: {
                    enable: !1,
                    speed: 1,
                    opacity_min: .1,
                    sync: !1
                }
            },
            size: {
                value: 20,
                random: !0,
                anim: {
                    enable: !1,
                    speed: 30,
                    size_min: .1,
                    sync: !1
                }
            },
            line_linked: {
                enable: !0,
                distance: 150,
                color: "#ffffff",
                opacity: .2,
                width: 1
            },
            move: {
                enable: !0,
                speed: 4,
                direction: "none",
                random: !0,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {
                    enable: !1,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: !1,
                    mode: "grab"
                },
                onclick: {
                    enable: !1,
                    mode: "push"
                },
                resize: !0
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                }
            }
        },
        retina_detect: !0
    });
}
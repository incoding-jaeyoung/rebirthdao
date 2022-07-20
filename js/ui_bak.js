'use strict';
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// JavaScript Document
var heroHeight;
var heroImgHeight;
$(document).ready(function () {
    $('body').imagesLoaded().done(function (instance) {
        console.log('image loaded!!')
        mobileProxy()
        init();
        headerScroll();
        navTrigger();
        sectionTween();
    });
});

function commonTween() {
    $('.slide-down').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.from(text, 1, {
            y: -50,
            opacity: 0,
            //            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.slide-up').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.from(text, 1, {
            y: 80,
            opacity: 0,
            //            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.over-text-wrap').each(function (e) {
        $(this).find(' > *').addClass('over-text').wrapInner('<span class="over-text-con"></span>')
        let text = $(this).find('.over-text-con')
        const textmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        textmotion.to(text, 0.5, {
            y: 0,
            stagger: 0.3,
            opacity: 1,
            //            ease: "power2.inOut",
            onComplete: function () {

            }
        })
    })
}

function mobileProxy() {
    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () {
            //pc
        },
        "(max-width:768px)": function () {
            ScrollTrigger.defaults({
                scroller: "#wrapper",
            });

        },

    })
}


function sectionTween() {
    gsap.config({
        nullTargetWarn: false
    });
    // index page
    if (document.querySelector(".index-section")) {
        commonTween()
        ScrollTrigger.matchMedia({
            "(min-width:769px)": function () {
                //pc
                gsap.from($(".section-01 .bg img"), {
                    scrollTrigger: {
                        trigger: ".section-01 .bg",
                        start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "100% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                        toggleActions: "restart pause pause pause",
                    },
                    transform: 'translateY(50%) scale(1.1)',
                    opacity: 0,
                    y: '50%',
                })
                const section01 = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".section-01",
                        start: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "300% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                        //                    markers: true,
                        pin: true,
                        //                    pinSpacing:false,
                        toggleActions: "play none reverse pause",
                    },
                });
                section01.from($(".section-01 dt"), {
                        y: '50px',
                        opacity: 0,
                    }, 'slogan')
                    .from($(".section-01 dd"), {
                        y: '50px',
                        opacity: 0,
                    }, 'slogan+=0.5')
                    .from($(".section-01 dd"), {}, 'slogan+=1')
            },
            "(max-width:768px)": function () {
                //mobile
                const section01 = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".section-01",
                        start: "0% 50%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "50% 50%", // 앞 : 객체 , 뒤 : 페이지 전체
                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                        //                            markers: true,
                        //                            pin:true,
                        //                    pinSpacing:false,
                        toggleActions: "play none reverse pause",
                    },
                });
                section01.from($(".section-01 dt"), {
                        y: '50px',
                        opacity: 0,
                    })
                    .from($(".section-01 dd"), {
                        y: '50px',
                        opacity: 0,
                    })
            },

        })




        const section02 = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-02",
                start: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "300% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
                scrub: 1, //스크롤에 반응 (없으면 자동재생)
                //                    markers: true,
                pin: true,
                //                    pinSpacing:false,
                toggleActions: "restart pause pause pause",
            },
        });
        section02.from($(".slogan"), {
                scale: 0,
                opacity: 0,
            }, 'slogan')
            .from($(".section-02 .des"), {
                scale: 0,
                opacity: 0,
            }, 'slogan+=0.2')
            .from($(".section-02 .des"), {}, 'slogan+=0.5')

        ScrollTrigger.matchMedia({
            "(min-width:769px)": function () {
                //pc
                gsap.to($(".hero-image img"), {
                    scrollTrigger: {
                        trigger: ".hero-image img",
                        start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "100% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                        //                    markers: true,
                        //                    pin:true,
                        //                    pinSpacing:false,
                        toggleActions: "restart pause pause pause",
                    },
                    filter: 'blur(0px)',

                })
                gsap.to($(".hero-image"), {
                    scrollTrigger: {
                        trigger: ".hero-image img",
                        start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "100% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                        //                    markers: true,
                        //                    pin:false,
                        //                    pinSpacing:false,
                        toggleActions: "restart pause pause pause",
                    },
                    scale: 1,
                })

            },
            "(max-widt:768px)": function () {
                //mobile
            },

        })


        heroHeight = $(".section-04 .hero-image").height();
        heroImgHeight = $(".section-04 .hero-image img").height() - 1;
        var heroImgMove = heroImgHeight - heroHeight
        const section04 = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-04",
                start: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "300% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
                scrub: 1, //스크롤에 반응 (없으면 자동재생)
                //                    markers: true,
                pin: true,
                toggleActions: "restart pause pause pause",
            },
        });
        section04.to(".section-04 .hero-image img", {
                duration: 3,
                y: -heroImgMove,
                overwrite: "auto",
                delay: 1,
            }, 'move')
            .from(".section-04 .article-01 .row", {
                y: "50%",
                opacity: 0,
                overwrite: "auto",

            }, 'move')
            .to(".section-04 .article-01 .row", {
                y: "-50%",
                opacity: 0,
                delay: 1,
            }, 'move+=0.5')
            .from(".section-04 .article-02 .row", {
                y: "50%",
                opacity: 0,
                delay: 1,
            }, 'move+=1')
            .to(".section-04 .article-02 .row", {
                delay: 2,
            }, 'move+=2.5')
            .to(".section-04 .article-02 .row", {}, 'move+=3.5')

        const section03 = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-03",
                start: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "300% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
                scrub: 1, //스크롤에 반응 (없으면 자동재생)
                //                    markers: true,
                pin: true,
                //                    pinSpacing:false,
                toggleActions: "restart pause pause pause",
            },
        });
        //            section03.from(".section-03 .bg", {
        //                opacity:0,
        //            },'ess')
        section03.from(".section-03 .ess dt", {
                opacity: 0,
                y: '-100%',
            }, 'ess')
            .from(".section-03 .ess dd", {
                opacity: 0,
                y: '100%',
            }, 'ess')
            .from(".section-03 .text-bot", {
                opacity: 0,
                y: '100%',
            }, 'ess')
            .to(".section-03 .ess", {
                opacity: 0,
                scale: 0.5,
            }, "+=0.3")
            .from(".section-03 .ico-contents", {
                opacity: 0,
                scale: 0.5,
            })
            .from(".section-03 .ico-contents", {}, "+=0.3")

        gsap.from($(".section-03 .bg"), {
            scrollTrigger: {
                trigger: ".section-03",
                start: "50% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "50% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                    markers: true,
                toggleActions: "play pause reverse pause",
                //                    pin:true,
            },
            //                opacity:0,
        })




        return;
    }

    // battery page
    if (document.querySelector(".battery")) {
        $('body').css({
            'overflowY': 'hidden'
        })
        vanadiumAnimation()
        commonTween()
        console.log('page battery !')

        gsap.to($('.loading'), 0, {
            y: '-100%',
            //            delay:5,
            onComplete: function () {
                $('body,html').removeClass('fixed');
                var line1 = $('.line1');
                var line2 = $('.line2');

                var line1Spans = $('.line1 > span');
                var line2Spans = $('.line2 > span');
                // Set tweens
                TweenMax.set([line1, line2], {
                    x: -100
                })
                TweenMax.set([line1Spans, line2Spans], {
                    alpha: 0
                })
                // Tween values
                var tl = new TimelineMax();
                tl.add(
                    TweenMax.to(line1, 2, {
                        onStart: function () {},
                        x: 0,
                    }),
                    "start"
                )
                tl.add(
                    TweenMax.to(line2, 2, {
                        x: 0,
                        onComplete: function () {

                        }
                    }),
                    "start+=1"
                )
                tl.add(
                    TweenMax.staggerTo(line1Spans, 2, {
                        alpha: 1,
                    }, .05),
                    "start"
                )
                tl.add(
                    TweenMax.staggerTo(line2Spans, 2, {
                        alpha: 1,

                    }, .05),
                    "start+=1"
                )
                tl.add(
                    gsap.to($(".vanadium-img"), 0.5, {
                        opacity: 1,
                        delay: 2,
                        onComplete: function () {
                            $('body').css({
                                'overflow': 'auto'
                            })
                            titleScroll()
                            batteryAnimation()

                        }
                    }),
                    "start"
                )

            },
            ease: "power2.in",
        })






        function titleScroll() {
            const section01 = gsap.timeline({
                scrollTrigger: {
                    trigger: ".section-01",
                    start: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                    end: "300% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                    scrub: 1, //스크롤에 반응 (없으면 자동재생)
                    //                markers: true,
                    pin: true,
                    //                    pinSpacing:false,
                    toggleActions: "restart pause reverse pause",
                },
            });
            ScrollTrigger.matchMedia({
                "(min-width:769px)": function () {
                    //pc
                    section01.to($(".vanadium-title .row"), {
                            z: -1000,
                            opacity: 0.5,
                            x: '70%',
                            rotationY: '-40deg',
                            opacity: 0,
                            duration: 3,
                            ease: "power2.in",
                        }, 'move')
                        .to($(".vanadium-img #animation"), {
                            x: '-810px',
                            scale: 1.05,
                            duration: 4,
                            y: 0,
                        }, 'move')

                        .to($(".vanadium-text dl dt"), {
                            opacity: 1,
                            y: 0,
                            ease: "power2.out",
                        }, '-=2')
                        .to($(".vanadium-text dl dd"), {
                            opacity: 1,
                            y: 0,
                            ease: "power2.out",
                        }, '-=1.5')
                        .to($(".vanadium-text dl dd"), {})
                },
                "(max-width:768px)": function () {
                    //mobile
                    section01.to($(".vanadium-title .row"), {
                            z: -1000,
                            opacity: 0.5,
                            x: '70%',
                            rotationY: '-40deg',
                            opacity: 0,
                            duration: 3,
                            ease: "power2.in",
                        }, 'move')
                        .to($(".vanadium-img #animation"), {
                            x: '-56%',
                            scale: 1,
                            duration: 4,
                            y: 0,
                        }, 'move')

                        .to($(".vanadium-text dl dt"), {
                            opacity: 1,
                            y: 0,
                            ease: "power2.out",
                        }, '-=2')
                        .to($(".vanadium-text dl dd"), {
                            opacity: 1,
                            y: 0,
                            ease: "power2.out",
                        }, '-=1.5')
                        .to($(".vanadium-text dl dd"), {})
                },

            })



        }


    }

    // company page
    if (document.querySelector(".company")) {
        console.log('page company !')
        commonTween()
        var visual = gsap.timeline();

        visual.to($('.section-01'), 2, {
                backgroundSize: "110%",
                backgroundPosition: "50% auto",
                ease: Sine.easeOut,
            }, 'visual')
            .to($('.section-01 dl dt').eq(0).find('.over-text-con'), 0.8, {
                y: 0,
                opacity: 1,
                ease: "power4.out",
            }, 'visual')
            .to($('.section-01 dl dt').eq(1).find('.over-text-con'), 0.8, {
                y: 0,
                opacity: 1,
                ease: "power4.out",
            }, "visual+=0.3")
            .to($('.section-01 dl dd').find('.over-text-con'), 1, {
                delay: 0.1,
                y: 0,
                opacity: 1,
                ease: "power4.out",
            }, "-=1")


        const section02 = gsap.timeline({
            scrollTrigger: {
                trigger: ".section-02",
                start: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 50%", // 앞 : 객체 , 뒤 : 페이지 전체
                scrub: 1, //스크롤에 반응 (없으면 자동재생)
                //                    markers: true,
                //                    pin:true,
                //                    pinSpacing:false,
                toggleActions: "restart pause pause pause",
            },
        });
        section02.from($(".slogan"), {
                scale: 0,
                opacity: 0,
            })
            .from($(".section-02 .des"), {
                scale: 0,
                opacity: 0,
            })

    }

}

function headerScroll() {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#header').outerHeight();
    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 0);

    function hasScrolled() {
        var st = $(window).scrollTop();
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
        if (st == 0) {
            $('header').addClass('nav-default')
        } else {
            $('header').removeClass('nav-default')
        }
    }
}

function navTrigger() {
    $('.navTrigger').on('click', function () {
        $('body').toggleClass('fixed');
        $(this).toggleClass('active');
        $('.m-gnb').toggleClass('active')
        if ($('.m-gnb').hasClass('active')) {
            $('header').addClass('mob-head-fixed')
            gsap.to($('.m-gnb'), 0.2, {
                x: 0,
            })
            gsap.to($('.m-gnb dl > *'), 0.4, {
                stagger: 0.1,
                delay: 0.2,
                y: 0,
                opacity: 1,
            })
        } else {
            $('header').removeClass('mob-head-fixed')
            gsap.to($('.m-gnb'), 0.2, {
                x: "-100%",
                onComplete: function () {
                    gsap.to($('.m-gnb dl > *'), 0.2, {
                        y: 20,
                        opacity: 0,
                    })
                }
            })
        }
    });
}

function init() {
    $('video').on('inview', function (event, visible) {
        if (visible == true) {
            $(this)[0].play();
        } else {
            $(this)[0].pause();
        }
    });
    $('#header .gnb a').on('mouseover', function () {
        $(this).addClass('over')
        gsap.to($(this).find('span'), 0.3, {
            width: "100%"
        });
    })
    $('#header .gnb>ul>li>a').on('mouseover', function () {
        $(this).addClass('over')
        gsap.to($(this).find('span'), 0.1, {
            width: "100%"
        });
        const subNav = $(this).next();
        const subNavOther = $(this).parent().siblings('li').find('ul');
        gsap.to(subNav, 0.3, {
            y: -20,
            opacity: 1,
            onComplete: function () {
                subNav.addClass('active');
            }
        })
        gsap.to(subNavOther, 0.3, {
            y: 0,
            opacity: 0,
            onComplete: function () {
                subNavOther.removeClass('active');
            }
        })
    })
    $('#header .gnb a').on('mouseleave', function () {
        $(this).removeClass('over')
        gsap.to($(this).find('span'), 0.3, {
            width: "0%"
        });
    })
    $('#header').on('mouseleave', function () {
        gsap.to('#header .gnb > ul > li > ul', 0.3, {
            y: 0,
            opacity: 0,
            onComplete: function () {
                $('#header .gnb>ul>li>ul').removeClass('active');
            }
        });
    })

}

function openLayer(selector, href) {
    var flag = selector,
        target = href;
    flag = $(flag);
    flag.load(href, function () {
        $(this).show();
        $(this).find('.modal').show().addClass('scroll')
        $('.overlay').show();
        //        $('body').css('overflow','hidden');
    });
    //    $('body').addClass('scroll')
    return false;
}

function closeLayer(no) {
    var no = no;
    if (no) {
        $('#popup' + no).removeClass('show').hide().removeAttr('style');
    } else {
        $('.popup-wrap').empty()
        $('.popup-wrap').removeAttr('style').hide();
        $('.overlay').hide().removeAttr('style');
        //        $('body').css('overflow','').removeAttr('style');
    }
    //    $('body').removeClass('fixed')
}

function openModal(number) {
    $('.overlay').show();
    $('.modal-inside' + '.' + number).show();
    return false;
}

function closeModal(no) {
    $('.overlay').hide();
    $('.modal-inside').hide();
}

function vanadiumAnimation() {
    const canvas = document.getElementById("animation");
    const context = canvas.getContext("2d");

    canvas.width = 1024;
    canvas.height = 512;
    //    canvas.width = 1920;
    //    canvas.height = 960;

    const frameCount = 130;
    const currentFrame = index => (
        `../img/vanadium/${(index + 1).toString().padStart(4, '0')}.png`
    );

    const images = []
    const cloud = {
        frame: 0
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }

    images[0].onload = render;

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[cloud.frame], 0, 0);
    }

    var vanadium = gsap.timeline({
        scrollTrigger: {
            trigger: '.vanadium-img',
            scrub: 1,
            start: "0% 0%",
            end: "300% 0%",
            //            pin:true,
            //            markers: true,

            //                toggleActions: "play complete reverse reset",
        }

    });
    vanadium.to(cloud, {
        frame: frameCount - 1,
        snap: "frame",
        onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
        onStart: function () {},
        onReverseStart: function () {
            //                gsap.to($('.top-visual .bg .cloud-black'),0,{opacity:1})
            //                $(".vanadium-img .last-frame").hide();
        },
        onComplete: function () {
            //                gsap.to($('.top-visual .bg .cloud-black'),.5,{opacity:0})
            //                gsap.to(".top-visual .contact", 0.5, {
            //                    transform: " translateX(0%)",
            //                })
            //                $(".vanadium-img .last-frame").show();
        },
        onReverseComplete: function () {
            //                $('.top-visual .bg').hide();
            //                gsap.to(".top-visual .contact", 0.5, {
            //                    transform: " translateX(-100%)",
            //                })
        },
    })
}
var flag = false;

function batteryAnimation() {

    const canvas = document.getElementById("battery-animation");
    const context = canvas.getContext("2d");

    //    canvas.width = '1704';
    //    canvas.height = 916;
    canvas.width = 800;
    canvas.height = 430;

    const frameCount = 60;
    const currentFrame = index => (
        `../img/battery/${(index + 1).toString().padStart(4, '0')}.png`
    );

    const images = []
    const cloud = {
        frame: 0
    };

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
    }

    images[0].onload = render;

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[cloud.frame], 0, 0);
    }



    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () {
            //pc
            var battery = gsap.timeline({
                scrollTrigger: {
                    trigger: '.section-02 .battery-block',
                    scrub: 1,
                    start: "100% 100%",
                    end: "300% 100%",
                    pin: true,
                    //                                markers: true,
                    //            pinSpacing:false,
                    //                toggleActions: "play complete reverse reset",
                }

            });
            battery.to(cloud, {
                    frame: frameCount - 1,
                    snap: "frame",
                    onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
                    onReverseStart: function () {
                        //                gsap.to($('.top-visual .bg .cloud-black'),0,{opacity:1})
                    },
                    onComplete: function () {
                        if (flag == false) {
                            flag = true;
                            batteryInfo()

                        }

                    },
                }, 'battery')
                .to($(".section-02 .batteryText.text-01"), {
                    y: -80,
                    opacity: 0,
                }, 'battery')
                .from($(".section-02 .batteryText.text-02"), {
                    y: 80,
                    opacity: 0,
                }, '-=0.3')
        },
        "(max-width:768px)": function () {
            //mobile
            var battery = gsap.timeline({
                scrollTrigger: {
                    trigger: '.section-02 .battery-block',
                    scrub: 1,
                    start: "100% 100%",
                    end: "300% 100%",
                    pin: true,
                    //                                markers: true,
                    //            pinSpacing:false,
                    //                toggleActions: "play complete reverse reset",
                }

            });
            battery.to(cloud, {
                    frame: frameCount - 1,
                    snap: "frame",
                    onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
                    onReverseStart: function () {
                        //                gsap.to($('.top-visual .bg .cloud-black'),0,{opacity:1})
                    },
                    onComplete: function () {
                        if (flag == false) {
                            flag = true;
                            batteryInfo()

                        }

                    },
                }, 'battery')
                .to($(".section-02 .batteryText.text-01"), {
                    y: ' -50%',
                    opacity: 0,
                }, '-=0.6')
                .from($(".section-02 .batteryText.text-02"), {
                    y: 80,
                    opacity: 0,
                }, '-=0.25')
        },

    })

}

function batteryInfo() {
    gsap.to(".section-02 #battery-animation", 1.5, {
        y: -200,
        scrollTrigger: {
            trigger: ".section-02 .battery-detial ul",
            start: "80px 80%", // 앞 : 객체 , 뒤 : 페이지 전체
            end: "80px 80%", // 앞 : 객체 , 뒤 : 페이지 전체
            //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
            //                        markers: true,
            toggleActions: "play none reverse none",

        },
        ease: 'power4.out'
    })
    $('.up-slide').each(function (e) {
        gsap.from($(this), 1, {
            y: 80,
            opacity: 0,
            scrollTrigger: {
                trigger: $(this),
                start: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                //                    markers: true,
                toggleActions: "play none reverse none",
            },
            ease: 'power1.out'
        })
    })
    $('.left-slide').each(function (e) {
        gsap.from($(this), 0.5, {
            x: '-2000px',
            opacity: 0,
            scrollTrigger: {
                trigger: $(this),
                start: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                stagger: 0.3,
                //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                //                    markers: true,
                toggleActions: "play none reverse none",
            },
            ease: 'Expo.easeOut'
        })
    })
    //    $('.section-04 ul li').each(function (e) {
    const batteryInfoani = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-03 .battery-info",
            start: "0% 40%", // 앞 : 객체 , 뒤 : 페이지 전체
            end: "0% 40%", // 앞 : 객체 , 뒤 : 페이지 전체
            //                scrub:1, //스크롤에 반응 (없으면 자동재생)
            //                    markers: true,
            //                    pin:".section-01",
            //                    pinSpacing:false,
            toggleActions: "play none reverse none",
        },
    });
    batteryInfoani.from('.section-03 ul li .line', 0.5, {
            transform: 'scaleX(0)',
            stagger: 0.2,
            ease: 'power4.out'
        }, 'info')
        .from('.section-03 ul li dl', 0.5, {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power4.out'
        }, 'info+=0.2')
    //    })

    $('.battery-charge').hover(function () {
        gsap.to(".battery-charge .charge span", 0.1, {
            opacity: 1,
            stagger: 0.02,
            ease: 'power2.out'
        })
    }, function () {
        var tl = gsap.timeline();
        tl.to(".battery-charge .charge span", 0, {
                opacity: 1,
                ease: 'power2.out'
            })
            .to(".battery-charge .charge span", 0.2, {
                delay: 0.2,
                opacity: 0,
                ease: 'power2.out'
            })
    })
    $('.up-slide-stagger').each(function (e) {
        var stagger = $('.up-slide-stagger').find('> *')
        gsap.from(stagger, 0.5, {
            y: 80,
            opacity: 0,
            stagger: 0.1,
            scrollTrigger: {
                trigger: $(this),
                start: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play none none none",
            },
            ease: 'power1.out'
        })
    })


    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () {
            //pc
            const benefit = gsap.timeline({
                scrollTrigger: {
                    trigger: '.side-image',
                    start: "50% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                    end: "50% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                    //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                    //                    markers: true,
                    toggleActions: "play none reverse none",
                },
            });
            benefit.from($('.side-image .right img'), 0.5, {
                    x: '100%',
                    ease: 'power1.out',
                }, 'battery')
                .from($('.side-image .left img'), 0.5, {
                    x: '-100%',
                    ease: 'power1.out',
                }, 'battery')
                .to($('.ess-benefit').find('> *'), 0.5, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'power1.out'
                })
        },
        "(max-width:768px)": function () {
            //mobile
            const benefit = gsap.timeline({
                scrollTrigger: {
                    trigger: '.side-image',
                    start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                    end: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                    //                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                    //                    markers: true,
                    toggleActions: "play none reverse none",
                },
            });
            benefit.from($('.side-image .right img'), 0.5, {
                    x: '100%',
                    ease: 'power1.out',
                }, 'battery')
                .from($('.side-image .left img'), 0.5, {
                    x: '-100%',
                    ease: 'power1.out',
                }, 'battery')
                .to($('.ess-benefit').find('> *'), 0.5, {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    ease: 'power1.out'
                })
        },

    })


    gsap.to(".section-05 .number", 1, {
        scrollTrigger: {
            trigger: ".section-05 .number",
            start: "0% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
            end: "100% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
            //          scrub: 1, //스크롤에 반응 (없으면 자동재생)
            //          markers: true,
            toggleActions: "play none reverse none",

        },
        onStart: function () {
            counter()
        },
        scale: 1,
        opacity: 1,
    })

}

function counter() {
    var counter = {
        var: 0
    };
    var tal = document.getElementById("cx1");

    TweenMax.to(counter, 3, {
        var: 1000000,
        onUpdate: function () {
            tal.innerHTML = numberWithCommas(Math.ceil(counter.var));
        },
        ease: 'Power4.easeOut'
    });

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
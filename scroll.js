(function (w) {
    w.scroll = function (navs,callback) {
        // var  navs = document.getElementById("wrap");
        var  navsList= navs.children[1];
        transformCss(navsList,'translateZ',0.01);
        var beginTime = 0;
        var beginValue = 0;
        var endTime = 0;
        var endValue = 0;
        var disTime = 0;
        var disValue= 0;

        //  元素初始位置
        var eleY = 0;
        //手指初始位置
        var startY =0;
        navs.addEventListener("touchstart",function (event) {
            var touch = event.changedTouches[0];
            startY = touch.clientY;
            eleY = transformCss(navsList,"translateY");
            beginTime = new Date().getTime();
            beginValue = eleY;
            disValue = 0;
            if(callback&&callback['start']){
                callback['start']();
            }


        });
        navs.addEventListener("touchmove",function (event) {
            if(callback&&callback['move']){
                callback['move']();
            }
            var touch = event.changedTouches[0];
            var nowY = touch.clientY;
            var dis =  nowY -startY;
            var minY = document.documentElement.clientHeight-navsList.offsetHeight
            transformCss(navsList,"translateY",eleY+dis);
            var translateY = eleY+dis;
            if(translateY>0){
                var scale = 1-translateY/document.documentElement.clientHeight
//           console.log(scale)
                translateY =translateY*scale;
//           console.log(translateY)

            }else if(translateY<minY){
                var  over  = minY-translateY;
                var scale = 1- over/document.documentElement.clientHeight
//              console.log(scale)
                translateY =  minY -over*scale;
//            console.log(translateY)


            }
            transformCss(navsList,"translateY",translateY);
            endTime = new Date().getTime();
            endValue = translateY;
            disTime = endTime-beginTime;
            disValue = endValue -beginValue;
        });

        navs.addEventListener("touchend",function (event) {
            var touch = event.changedTouches[0];
            var speed = disValue/(endTime-beginTime);
            var minY = document.documentElement.clientHeight-navsList.offsetHeight
            var target = transformCss(navsList,"translateY")+speed*100;
            var bezier = '';
//           console.log(speed);
            if(target>0){
                target = 0;

                bezier = 'cubic-bezier(0,1.85,.81,1.71)'
            }else if (target<minY){
                target = minY;
                bezier = 'cubic-bezier(0,1.85,.81,1.71)'
            }

            navsList.style.transition = '.5s '+bezier;
            transformCss(navsList,"translateY",target);
            if(callback&&callback['end']){
                callback['end']();
            }

        })

    }
})(window)
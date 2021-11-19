var nextSlide = document.querySelector('.next-btn');
nextSlide.onclick = function(){
    var ImageOut = document.querySelector('.curent-slide');
    var ImageIn = document.querySelector('.curent-slide').nextElementSibling;
    var DotActive = document.querySelector('.carousel-dot-item.active');
    var NextDotActive = DotActive.nextElementSibling;
    if(ImageIn != null){
        ImageOut.classList.add('go-out-left');
        ImageIn.classList.add('come-in-right');
        ImageIn.classList.add('curent-slide');
        document.querySelector('.go-out-left').addEventListener("webkitAnimationEnd",function(){
            document.querySelector('.go-out-left').classList.remove('curent-slide');
            document.querySelector('.go-out-left').classList.remove('go-out-left');
        });
        document.querySelector('.come-in-right').addEventListener("webkitAnimationEnd",function(){
            document.querySelector('.come-in-right').classList.remove('come-in-right');
        });
        //Dot
        DotActive.classList.remove('active');
        DotActive.nextElementSibling.classList.add('active');
    }
    else{
        document.querySelector('.curent-slide').classList.add('go-out-left');
        document.querySelector('.main-carousel-item:first-child').classList.add('come-in-right');
        document.querySelector('.main-carousel-item:first-child').classList.add('curent-slide');   
        document.querySelector('.go-out-left').addEventListener("webkitAnimationEnd",function(){
            document.querySelector('.go-out-left').classList.remove('curent-slide');
            document.querySelector('.go-out-left').classList.remove('go-out-left');
        });
        document.querySelector('.come-in-right').addEventListener("webkitAnimationEnd",function(){
            document.querySelector('.come-in-right').classList.remove('come-in-right');
        });
        //Dot
        document.querySelector('.carousel-dot-item.active').classList.remove('active');
        document.querySelector('.carousel-dot-item').classList.add('active');
    }
}
var prevSlide = document.querySelector('.prev-btn');
prevSlide.onclick = function(){
    var ImageOut = document.querySelector('.curent-slide');
    var ImageIn = document.querySelector('.curent-slide').previousElementSibling;
    if(ImageIn != null){
        ImageOut.classList.add('go-out-right');
        ImageIn.classList.add('come-in-left');
        ImageIn.classList.add('curent-slide');
        document.querySelector('.come-in-left').addEventListener("webkitAnimationEnd",function(){
            document.querySelector('.come-in-left').classList.remove('come-in-left');
        });
        document.querySelector('.go-out-right').addEventListener("webkitAnimationEnd",function(){
            document.querySelector('.go-out-right').classList.remove('curent-slide');
            document.querySelector('.go-out-right').classList.remove('go-out-right');
        });
    }
    else{
        ImageOut.classList.add('go-out-right');
        document.querySelector('.main-carousel-item:last-child').classList.add('come-in-left');
        document.querySelector('.main-carousel-item:last-child').classList.add('curent-slide');
        document.querySelector('.go-out-right').addEventListener("webkitAnimationEnd",function(){
            document.querySelector('.go-out-right').classList.remove('curent-slide');
            document.querySelector('.go-out-right').classList.remove('go-out-right');
        });
        document.querySelector('.come-in-left').addEventListener("webkitAnimationEnd",function(){
            document.querySelector('.come-in-left').classList.remove('come-in-left');
        });
    }
}
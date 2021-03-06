//(require 'jquery)

/* comments */
var kd_disqus_thread=$('#disqus_thread');
var ds_label=$('.ds-thread');

$('.disqus_label').click(function(){
    kd_disqus_thread.show();
    ds_label.hide();
});

$('.ds-label').click(function(){
    kd_disqus_thread.hide();
    ds_label.show();
});

/* navigate */
window.kd_toc = $('#text-table-of-contents ul li');
window.kd_n = 0;
window.kd_tmp = kd_n;
window.kd_head = $('div[id*=\'text-orgheadline\']');
$(window).scroll(function () {
    //kd_str=\"#orgheadline\" + kd_n.toString();
    //var top1=kd_head.find(kd_str).offset().top;
    var startPoint=0;
    var endPoint=kd_head.length-1;
    var offsetValue=window.pageYOffset+20;
    if(kd_head.eq(kd_tmp)[0].offsetTop>offsetValue || offsetValue>kd_head.eq(((kd_tmp+1)>(kd_head.length-1)?(kd_tmp.length-1):(kd_tmp+1)))[0].offsetTop){
        while((startPoint+1) < endPoint){
            if(kd_head.eq(Math.floor((startPoint+endPoint)/2))[0].offsetTop > offsetValue){
                endPoint = Math.floor((startPoint+endPoint)/2);
            }
            else if(kd_head.eq(Math.floor((startPoint+endPoint)/2))[0].offsetTop < offsetValue){
                startPoint = Math.floor((startPoint+endPoint)/2);
            }
            else{
                break;
            }
        }
        if(offsetValue>kd_head.eq(kd_head.length-1)[0].offsetTop){
            kd_n=kd_head.length-1;
        }
        else{
            kd_n = startPoint;
        }

        kd_toc.eq(kd_tmp).children('a').css('color', '#ffff00');
        kd_tmp = kd_n;
        kd_toc.eq(kd_tmp).children('a').css('color', '#22ff22');
        //kd_n = parseInt(kd_str.slice(-1));
    }
});

/* floating card */
function popupActivate (evt) {
    var boundBox = evt.target.getBoundingClientRect();
    var coordX = boundBox.left;
    var coordY = boundBox.top;
    balloon.style.position="fixed";
    balloon.style.left= coordX.toString() + "px";
    balloon.style.top= (coordY + 30).toString() + "px";

    if(evt.target.firstChild.parentNode.nextSibling.tagName == "SUP"){
        var footRef = evt.target.nextSibling.childNodes[0].id;
        var docNode = document.getElementById("fn."+footRef.slice(5));
        var nodeNew = docNode.parentNode.parentNode.cloneNode(true);
        balloon.replaceChild(nodeNew,balloon.lastChild);
        balloon.style.visibility="visible";
    }
    if(balloon.getBoundingClientRect().right > window.innerWidth){
        balloon.style.width=(window.innerWidth-coordX-5).toString()+"px";
    }
}

function popupOff(evt) {
    balloon.style.visibility="hidden";
}

function ls_init () {

    // create balloon element, insert as first child of refNode
    function createBalloon (refNode) {
        // create balloon element to display info
        balloon = document.createElement("div");
        balloon.style.visibility="hidden";
        balloon.style.position="fixed";
        balloon.style.top=".5ex";
        balloon.style.left=".5ex";
        balloon.style.padding=".5ex";
        balloon.style.textAlign="left";
        balloon.style.border="solid thin green";
        balloon.style.borderRadius="1ex";
        balloon.style.backgroundColor="hsla(240,80%,50%,0.8)";
        balloon.style.boxShadow="3px 3px 8px black";
        balloon.style.zIndex="341";
        balloon.innerHTML="<p>tips</p>";
        // insert into DOM
        refNode.insertBefore(balloon, refNode.firstChild);
    }

    var myList = document.querySelectorAll(".underline");

    // assign handler to hot hoover elements
    if ( myList.length > 0 ) {
        for (var ii = 0; ii < myList.length; ii++) {
            var myNode = myList[ii];
            myNode.addEventListener("mouseover", popupActivate , false);
            myNode.addEventListener("mouseout", popupOff , false);
        }
    }

    createBalloon(document.body);
}

var balloon;

ls_init();

/* change style*/

$('.post-meta').insertAfter('.title').css('margin-bottom','15px').css('text-align','center');

if(window.innerHeight > document.body.clientHeight){
    $('.container').addClass("centerVertical");
}
else{
    $('.container').removeClass("centerVertical");
}

$(window).resize(function(){
    if(window.innerHeight > $('.container').height()){
        $('.container').addClass("centerVertical");
    }
    else{
        $('.container').removeClass("centerVertical");
    }
});

/* editable */


/* backgroundImage */

$(document).ready(function(){
    $("button").on('click', function(){
        console.log('clicked!');
        $(".pop-up").toggleClass("hide");
    });
});

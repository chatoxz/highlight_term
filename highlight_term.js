var $ = window.jQuery;

//css
var sheet = document.createElement('style');
sheet.innerHTML = "";

$('document').ready(function(){
    //lowercase the array
    icim_dictionary = icim_dictionary.map(element => {
        return element.toLowerCase();
    });

    //check the number of messages and if it changes check all the messages again
    var n_messages = $("[class^=_message_]").length;
    var interval = setInterval(function(){
        //If inside the message tab, check the messages
        if (window.location.href.indexOf('/inbox') > 0) {
            //console.log(n_messages != $("[class^=_messageDivider_]").length);
            if(n_messages != $("[class^=_message_]").length) {
                n_messages = $("[class^=_message_]").length;
                //console.log("inside /inbox");
                check_messages();
            }
        }
        //If inside the REPLIES tab, check the replies
        if (window.location.href.indexOf('/replies') > 0) {
            check_replies();
        }

        //If inside the POSTS tab, check the replies
        if (window.location.href.indexOf('/archive') > 0) {
            check_posts();
        }
    }, 5000);
});



//SCROLL TO THE MESSAGE WHEN CLICKING ON THE MATCHED TERM
$(document).on("click",".term_match", function(){
    var index = [].indexOf.call($(".term_match." + $(this).text().trim()), $(this)[0]);
    var scrollTo = $(".message_selected." + $(this).text().trim())[index].offsetTop;
    $("[class^=_messages_]")[0].scrollTo({ top: scrollTo - 70, behavior: 'smooth'});
});

function check_messages(){
    console.log("Checking for Harm to Minors messages");
    if($("#highlight_box span").length > 0 ){ $("#highlight_box span").html("Checking") };
    var words = '';
    var messages_body = $("[class^=_messageBody_]");
    //search for the terms in the messages
    icim_dictionary.forEach(function(dictionary_item) {
        messages_body.each(function(i, obj) {
            if($(this).text().toLowerCase().includes(dictionary_item)){
                //$(this).siblings().addClass("message_selected");
                if(!$(this).hasClass('message_selected.' + dictionary_item.trim())){
                    $(this).addClass('message_selected ' + dictionary_item.trim());
                }
                //$("[class^='_message_']:contains(" + dictionary_item + "), [class^='_message_']:contains(" + dictionary_item.toLowerCase() + ") ").find("[class^=_messageBody_] p").addClass('message_selected ' + dictionary_item.trim());
                if( $("." + dictionary_item.trim() ).length > 0 ){
                    words += ' - <a class= "term_match ' + dictionary_item.trim() + '">' + dictionary_item.trim() + '</a>';
                }
                //Add the box at the top of the messages container
                if($("#highlight_box").length == 0){
                    $("[class^=_conversationList_]").parents('[class^="_wrapper_"]:first').prepend("<div id='highlight_box' class='MuiTabs-root '><div>" + icon_messages + "<span>Checking</span></div></div>");
                }
                if(words.length > 0){
                    $("#highlight_box span").html(words.trim());
                }else{
                    $("#highlight_box span").html("Clean!");
                }
            }
        });
    });
}

//var icon_messages = '<svg class="message_icon MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch" focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="MessageIcon"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path></svg>';
var icon_messages = '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSvgIcon-root css-1shn170" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocationSearchingIcon" tabindex="-1" title="LocationSearching"><path d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>';

/*REPLIES CODE REPLIES CODE REPLIES CODE REPLIES CODE REPLIES CODE REPLIES CODE REPLIES CODE REPLIES CODE REPLIES CODE REPLIES CODE REPLIES CODE REPLIES CODE REPLIES CODE */
function check_replies(){
    var replies = $(".MuiTableBody-root tr td:nth-child(6n-1)");
    var words = '';
    //search for the terms in the replies
    icim_dictionary.forEach(function(item) {
        replies.each(function(i, obj) {
            if($(this).html().toLowerCase().includes(item.toLowerCase())){
                $(this).addClass('message_selected ' + item.trim());
            }
        });
        if( $("." + item.trim() ).length > 0 ){
            words += ' - <a class= "term_match_replies">' + item + '</a>';
        }
        //Add the box at the top of the messages container
        if($("#highlight_box").length == 0){
            $(".MuiToolbar-gutters .MuiFormControl-root").prepend("<div id='highlight_box' class='MuiTabs-root'><div>" + icon_messages + "<span>Checking</span></div></div>");
        }
        if(words.length > 0){
            $("#highlight_box span").html(words.trim());
        }else{
            $("#highlight_box span").html("Clean!");
        }
    });
}

/*POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE POSTS CODE */
function check_posts(){
    console.log("Checking posts");
    var posts = $("[class*=_postWrapper_]");
    var words = [];
    //loop around the dictionary
    icim_dictionary.forEach(function(dictionary_item) {
        //loop around the posts to compare
        posts.each(function(i, obj) {
            //if matches found highlight post
            if($(this).find("section:not([class*=_postBlogName])").text().toLowerCase().includes(dictionary_item)){
                if(!$(this).hasClass('post_selected.' + dictionary_item.trim())){
                    $(this).addClass('post_selected ' + dictionary_item.trim());                   
                }
                //add term found to the list
                if( $("." + dictionary_item.trim() ).length > 0 ){
                    words += ' - <a class="term_match_post ' + dictionary_item.trim() + '">' + dictionary_item.trim() + '</a>';
                }
            }
        });

        //Add the box at the top of the messages container
        if($("#highlight_box").length == 0){
            $(".MuiGrid-root.MuiGrid-item:last").prepend("<div id='highlight_box' class='MuiTabs-root'><div>" + icon_messages + "<span>Checking</span><span></span></div></div>");
        }
        //add list(words) to the top bar
        if(words.length > 0){
            $("#highlight_box span:first").html(words.trim());
        }else{
            $("#highlight_box span:first").html("Clean!");
        }
    });
}

//scroll to the posts when clicking the term on the top bar
$(document).on("click",".term_match_post", function(){
    console.log("go to posts");
    var index = [].indexOf.call($(".term_match_post." + $(this).text().trim()), $(this)[0]);
    var scrollTo = $(".post_selected." + $(this).text().trim())[index].offsetTop;
    window.scrollTo({ top: scrollTo - 30, behavior: 'smooth'}); // 'smooth' 'instant'

    $($(".post_selected." + $(this).text().trim())[index]).addClass("highlight");
    setTimeout(function () {
        $($(".post_selected." + $(this).text().trim())[index]).removeClass('highlight');
    }, 3100);
});

//common css
sheet.innerHTML += " .MuiToolbar-gutters .MuiFormControl-root { display: flex; width: 1000px; flex-direction: row; flex-wrap: wrap; justify-content: space-between; } ";
sheet.innerHTML += " .message_icon { margin-right: 5px;  } ";
sheet.innerHTML += " [class^=._messageDivider_] { margin: 0px }; ";
sheet.innerHTML += " .term_match, .term_match_replies, .term_match_post { text-decoration: none !important; } ";
sheet.innerHTML += " .message_selected,.message_selected p, .highlight_word { background-color: orange !important; color: black !important; } ";
sheet.innerHTML += " .post_selected { border: 1px solid red; } ";
//sheet.innerHTML += " .post_selected [class*=_textPostWrapper_]{ background-color: orange !important; color: black !important; } ";
sheet.innerHTML += " #highlight_box{ text-align: center; color:white; margin-bottom: 5px; border-radius: 5px; padding-top: 15px; max-width: 1050px; margin: auto; } ";
sheet.innerHTML += " #highlight_box span { cursor: pointer; vertical-align: super; } ";
//highligh briefly the post when scrolling to them
sheet.innerHTML += " @keyframes highlight { 0% { background: #ffff99; } 100% { background: none; } } ";
sheet.innerHTML += " .highlight { animation: highlight 3s; } ";

document.body.appendChild(sheet);

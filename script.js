/**
 * Created by Kuba9000 on 20.10.2017.
 */
document.addEventListener("DOMContentLoaded", function () {

    $('.main').fadeIn(3000);

    getQuote();
    $('.trigger').click(function () {
        getQuote();
    });

    var prefix = "https://cors-anywhere.herokuapp.com/";
    var tweetLink = "https://twitter.com/intent/tweet?text=";
    var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

    function getQuote() {
        $.getJSON(quoteUrl, createTweet);
        $.getJSON(prefix + quoteUrl, createTweet);
        $.ajaxSetup({cache: false});
    }

    function createTweet(input) {
        var data = input[0];

        var quoteText = $(data.content).text().trim();
        var quoteAuthor = data.title;

        if (!quoteAuthor.length) {
            quoteAuthor = "Unknown author";
        }
        var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;
        if (tweetText.length > 140) {
            getQuote();
        } else {
            var tweet = tweetLink + encodeURIComponent(tweetText);
            $('.quote').text(quoteText);
            $('.author').text("Author: " + quoteAuthor);
            $('.tweet').attr('href', tweet);
        }

    }
    
});
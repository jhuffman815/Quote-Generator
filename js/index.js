/* Twitter widgets.js script*/
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
  return t;
}(document, "script", "twitter-wjs"));

/*Parameters for the Share Dialog in Facebook SDk*/
var fbShareDialogParams = {
  method: 'share',
  display: 'popup',
  mobile_iframe: true,
  href: 'https://github.com/jhuffman815/Quote-Generator',
  picture: 'https://res.cloudinary.com/maribelduran/image' +
    '/upload/v1472088347/Random%20Quote%20Generator/up-in-the-clouds-1500x997_wg6jaw.jpg',
  description: 'Read inspirational quotes and share with friends on Facebook and Twitter.',
  caption: 'BY JEWELL HUFFMAN',
  quote: '',
};

$(document).ready(function() {
  newQuoteGenerator();
  $("#getNewQuote").click(newQuoteGenerator);
  $("#button-share-facebook").click(function() {
    FB.ui(fbShareDialogParams, function(response) {});
  });
});

var background_images = [
  'https://cdn.magdeleine.co/wp-content/uploads/2018/10/cat-3591380.jpg',
  'https://cdn.magdeleine.co/wp-content/uploads/2016/12/2015-12-03-Roman-Drits-002.jpg',
  'https://cdn.magdeleine.co/wp-content/uploads/2016/07/photo-1431613577022-9c5376ba6404.jpeg',
  'https://cdn.magdeleine.co/wp-content/uploads/2018/12/christmas_lights_on_spruce.jpg',
  'https://cdn.magdeleine.co/wp-content/uploads/2018/08/beautiful-blooming-bouquet-1083822.jpg',
  'https://cdn.magdeleine.co/wp-content/uploads/2014/12/644.jpg',
  'https://cdn.magdeleine.co/wp-content/uploads/2017/04/waterfall-52878.jpg',
  'https://cdn.magdeleine.co/wp-content/uploads/2014/12/Quignone.jpg',
  'https://cdn.magdeleine.co/wp-content/uploads/2019/08/10721251253_4c335904bb_o.jpg',
  'https://magdeleine.co/photo-by-anton-strogonoff-n-1383/',
  'https://cdn.magdeleine.co/wp-content/uploads/2018/11/flowers-1819175.jpg'
];

function newQuoteGenerator() {
  var url = "https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?"

  $.getJSON(url,
    function(jsonp) {
      var new_quoteText = jsonp.quoteText;
      var new_quoteAuthor = jsonp.quoteAuthor;
      if (new_quoteAuthor == "") {
        new_quoteAuthor = "Unknown Author";
      }
      updateIntentTweetURL(new_quoteText, new_quoteAuthor);
      updateFBShareQuote(new_quoteText, new_quoteAuthor);

      //update quote text
      $("blockquote").animate({
          opacity: 0
        }, 1000,
        function() {
          $(this).animate({
            opacity: 1
          }, 1000);
          $("#quote").html(new_quoteText);
        });

      //update quote author
      $("#quote_author").animate({
          opacity: 0
        }, 1000,
        function() {
          $(this).animate({
            opacity: 1
          }, 1000);
          $(this).html(new_quoteAuthor);
        });
    })
};

function updateIntentTweetURL(new_quote, new_author) {
  var hashtag = "&hashtags=inspirationalquotes";
  var url = "https://twitter.com/intent/tweet?text=" + '"' + new_quote + '"' + ' -' + new_author + hashtag;
  var encoded_url = encodeURI(url);
  $("#button-share-tweet").attr("href", encoded_url);
};

function updateFBShareQuote(new_quote, new_author) {
  fbShareDialogParams.quote = '"' + new_quote + '"' + ' -' + new_author;
}

function getRandomBackgroundImage(min, max) {
  var index = Math.floor(Math.random() * (max - min)) + min;
  var url = 'url(' + background_images[index] + ')';
  return url;
}

var background_image_url = getRandomBackgroundImage(0, background_images.length);
$("body").css('background-image', background_image_url);
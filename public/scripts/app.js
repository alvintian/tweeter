$(function() {
  composeButton();
  $("form[name='tweetForm']").on("submit", function(event) {
    event.preventDefault();
    var comment = $("textarea[name='text']").val();
    if (comment == "" || comment.length > 140) {
      $("#error_message").show().html("too much or zero input");
    } else {
      $("#error_message").html("").hide()
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: function() {
          loadTweets();
        }
      });
      $("textarea[name='text']").val("");
      $(".counter").text(140);
    }
  });
});

//copied this function from the internet
function calculateSince(datetime) {
  let tTime = new Date(datetime);
  let cTime = new Date();
  let sinceMin = Math.round((cTime - tTime) / 60000);
  let since = "";
  if (sinceMin == 0) {
    let sinceSec = Math.round((cTime - tTime) / 1000);
    if (sinceSec < 10)
      since = 'less than 10 seconds ago';
    else if (sinceSec < 20)
      since = 'less than 20 seconds ago';
    else
      since = 'half a minute ago';
  } else if (sinceMin == 1) {
    let sinceSec = Math.round((cTime - tTime) / 1000);
    if (sinceSec == 30)
      since = 'half a minute ago';
    else if (sinceSec < 60)
      since = 'less than a minute ago';
    else
      since = '1 minute ago';
  } else if (sinceMin < 45)
    since = sinceMin + ' minutes ago';
  else if (sinceMin > 44 && sinceMin < 60)
    since = 'about 1 hour ago';
  else if (sinceMin < 1440) {
    let sinceHr = Math.round(sinceMin / 60);
    if (sinceHr == 1)
      since = 'about 1 hour ago';
    else
      since = 'about ' + sinceHr + ' hours ago';
  } else if (sinceMin > 1439 && sinceMin < 2880)
    since = '1 day ago';
  else {
    let sinceDay = Math.round(sinceMin / 1440);
    since = sinceDay + ' days ago';
  }
  return since;
};

function createTweetElement(tweet) {
  let $tweet = $('<article>').addClass('tweet');

  let $header = $('<header>');
  let $logo = $('<img>').addClass('logo').attr("src", tweet.user.avatars.small);
  let $h2 = $('<h2>').addClass('header').text(tweet.user.name);
  let $name = $('<div>').attr("name", "userName").text(tweet.user.handle);

  let $oldTweet = $('<p>').attr("name", "oldTweets").text(tweet.content.text);

  let $footer = $('<div>').attr("name", "footer").text(calculateSince(tweet.created_at));
  let $flag = $('<img>').addClass('flagLogo').attr("src", "/images/flag.png");
  let $count = $('<div>').addClass('totLikes').text(tweet.count);
  let $reTweet = $('<img>').addClass('reTweetLogo').attr("src", "/images/reTweet.png");
  let $thumbsUp = $('<img>').addClass('thumbsUpLogo').attr("src", "/images/thumbsUp.png");

  $footer.append($flag, $reTweet, $count, $thumbsUp);
  $header.append($logo, $h2, $name);
  $tweet.append($header, $oldTweet, $footer);

  $thumbsUp.on('click', function() {
    tweet.count = parseInt(tweet.count) + 1;
    $.ajax({
      url: '/tweets/likes',
      method: 'POST',
      data: {
        id: tweet._id,
        count: tweet.count
      },
    });
  });

  return $tweet;
}

function renderTweets(tweets) {
  $(function() {
    $("section.allTweets").text("");
    for (let i = 0; i < tweets.length; i++) {
      let newestTweet = createTweetElement(tweets[i]);
      $("section.allTweets").prepend(newestTweet);
    }
  });
}

function loadTweets() {
  $.ajax({
    url: "http://localhost:8080/tweets",
    method: 'GET',
    success: function(morePostsHtml) {
      renderTweets(morePostsHtml);
    }
  });
}

function composeButton() {
  $(".compose").on("click", function() {
    $(".new-tweet").toggle(200);
    $("textarea").focus();
  });
}

loadTweets();
  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
  const data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }, {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }, {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }];


  $(function() {
    compButton();
    $("form[name='tweetForm']").on("submit", function(event) {
      event.preventDefault();
      //  console.log($(this).serialize());
      var comment = $("textarea[name='text']").val();
      if (comment == "" || comment.length > 140) {
        $("#error_message").show().html("too much or zero input");
      } else {
        $("#error_message").html("").hide();
        $.ajax({
          url: '/tweets',
          method: 'POST',
          data: $(this).serialize(),
          success: function(morePostsHtml) {
            loadTweets();
          }
        });
      }
    });
  });

  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    let $header = $('<header>');
    let $logo = $('<img>').addClass('logo').attr("src", tweet.user.avatars.small);
    let $h2 = $('<h2>').addClass('header').text(tweet.user.name);
    let $name = $('<div>').attr("name", "userName").text(tweet.user.handle);
    let $oldTweet = $('<p>').attr("name", "oldTweets").text(tweet.content.text);
    let $footer = $('<div>').attr("name", "footer").text(tweet.created_at);
    $header.append($logo, $h2, $name);
    $tweet.append($header, $oldTweet, $footer);
    return $tweet;
  }

  function renderTweets(tweets) {
    $(function() {
      $("section.allTweets").text("");
      for (let i = 0; i < tweets.length; i++) {
        var test = createTweetElement(tweets[i]);
        $("section.allTweets").append(test);
      }
    });
  }

  function loadTweets() {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: 'GET',
      success: function(morePostsHtml) {
        console.log(morePostsHtml);
        renderTweets(morePostsHtml);
      }
    });
  }

  function compButton() {
    $(".compose").on("click", function() {
      $(".new-tweet").toggle(200);
      $("textarea").focus();
    });
  }

  loadTweets();
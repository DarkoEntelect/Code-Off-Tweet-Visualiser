twitterVisApp.controller("homeController", ["$scope", "$sce", "$interval", function ($scope, $sce, $interval) {
    $scope.tweetList = [];
    $scope.mentionList = [];

    function populateTpl(tweets) {
        for (var i = 0, lgth = tweets.length; i < lgth ; i++) {
            var tweetText = tweets[i].tweet;
            var tweetAuthor = tweets[i].author;
            tweets[i].tweet = $sce.trustAsHtml(tweetText);
            tweets[i].author = $sce.trustAsHtml(tweetAuthor);
            insertIntoTweetArray(tweets[i]);
        }

        if (!$scope.$$phase) $scope.$apply();
    }

    function populateMentions(tweets) {
        for (var i = 0, lgth = tweets.length; i < lgth ; i++) {
            var tweetText = tweets[i].tweet;
            var tweetAuthor = tweets[i].author;
            tweets[i].tweet = $sce.trustAsHtml(tweetText);
            tweets[i].author = $sce.trustAsHtml(tweetAuthor);
            insertIntoMentionArray(tweets[i]);
        }

        if (!$scope.$$phase) $scope.$apply();
    }

    function repopulateTweets(tweets) {
        for (var i = 0, lgth = tweets.length; i < lgth ; i++) {
            if (!doesExist(tweets[i])) {
                insertIntoTweetArray(tweets[i], true);
            }
        }

        if (!$scope.$$phase) $scope.$apply();
    }

    function repopulateMentions(tweets) {
        for (var i = 0, lgth = tweets.length; i < lgth ; i++) {
            if (!doesMentionExist(tweets[i])) {
                insertIntoMentionArray(tweets[i], true);
            }
        }

        if (!$scope.$$phase) $scope.$apply();
    }

    function insertIntoTweetArray(tweet, isFollowUp) {
        if (!isFollowUp) {
            $scope.tweetList.push(tweet);
        }
        else {
            $scope.tweetList.unshift(tweet);
        }
    }

    function insertIntoMentionArray(tweet, isFollowUp) {
        if (!isFollowUp) {
            $scope.mentionList.push(tweet);
        }
        else {
            $scope.mentionList.unshift(tweet);
        }
    }

    function doesExist(tweet) {
        var retval = false;
        for (var d = 0; d < $scope.tweetList.length; d++) {
            var curVal = $scope.tweetList[d];
            if (curVal.tid === tweet.tid) {
                retval = true;
                break;
            }
        }

        return retval;
    }

    function doesMentionExist(tweet) {
        var retval = false;
        for (var d = 0; d < $scope.mentionList.length; d++) {
            var curVal = $scope.mentionList[d];
            if (curVal.tid === tweet.tid) {
                retval = true;
                break;
            }
        }

        return retval;
    }

    var configProfile = {
        "profile": { "screenName": 'jsinsa' },
        "domId": 'jsinsa_profile',
        "dataOnly": true,
        "customCallback": populateTpl,
        "lang": 'en'
    };

    var followupCall = {
        "profile": { "screenName": 'jsinsa' },
        "dataOnly": true,
        "customCallback": repopulateTweets,
        "lang": 'en'
    };

    var mentionsConfig = {
        "id": '472497070914297856',
        "dataOnly": true,
        "customCallback": populateMentions,
        "lang": 'en'
    };

    var mentionsFollowup = {
        "id": '472497070914297856',
        "dataOnly": true,
        "customCallback": repopulateMentions,
        "lang": 'en'
    };

    function addRandomAnimation() {
        var classList = [
            "bounce",
"flash",
"pulse",
"rubberBand",
"shake",
"headShake",
"swing",
"tada",
"wobble",
"jello",
"bounceIn",
"bounceInDown",
"bounceInLeft",
"bounceInRight",
"bounceInUp",
"bounceOut",
"bounceOutDown",
"bounceOutLeft",
"bounceOutRight",
"bounceOutUp",
"fadeIn",
"fadeInDown",
"fadeInDownBig",
"fadeInLeft",
"fadeInLeftBig",
"fadeInRight",
"fadeInRightBig",
"fadeInUp",
"fadeInUpBig",
"fadeOut",
"fadeOutDown",
"fadeOutDownBig",
"fadeOutLeft",
"fadeOutLeftBig",
"fadeOutRight",
"fadeOutRightBig",
"fadeOutUp",
"fadeOutUpBig",
"flipInX",
"flipInY",
"flipOutX",
"flipOutY",
"lightSpeedIn",
"lightSpeedOut",
"rotateIn",
"rotateInDownLeft",
"rotateInDownRight",
"rotateInUpLeft",
"rotateInUpRight",
"rotateOut",
"rotateOutDownLeft",
"rotateOutDownRight",
"rotateOutUpLeft",
"rotateOutUpRight",
"hinge",
"rollIn",
"rollOut",
"zoomIn",
"zoomInDown",
"zoomInLeft",
"zoomInRight",
"zoomInUp",
"zoomOut",
"zoomOutDown",
"zoomOutLeft",
"zoomOutRight",
"zoomOutUp",
"slideInDown",
"slideInLeft",
"slideInRight",
"slideInUp",
"slideOutDown",
"slideOutLeft",
"slideOutRight",
"slideOutUp"
        ];
        var tweetItems = $(".tweet-list-item").slice(0, 6);
        var mentionItems = $(".mention-list-item").slice(0, 6);
        var randomTweet = Math.floor((Math.random() * 5));
        var randomMention = Math.floor((Math.random() * 5));
        var classLength = classList.length;
        var randomTweetClass = Math.floor((Math.random() * classLength));
        var randomMentionClass = Math.floor((Math.random() * classLength));

        $.each(classList, function (i, v) {
            tweetItems.removeClass(v);
            mentionItems.removeClass(v);
        });

        tweetItems.eq(randomTweet).addClass(classList[randomTweetClass]);
        mentionItems.eq(randomMention).addClass(classList[randomMentionClass]);

        if (!$scope.$$phase) $scope.$apply();
    }

    twitterFetcher.fetch(configProfile);
    twitterFetcher.fetch(mentionsConfig);

    $interval(function () {
        twitterFetcher.fetch(followupCall);
        twitterFetcher.fetch(mentionsFollowup);
    }, 5000);

    $interval(function () {
        addRandomAnimation();
    }, 1500);
}]);
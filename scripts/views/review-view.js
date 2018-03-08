'strict';

var app = app || {};

(function (module) {
  const reviewView = {};

  function reset() {
    $('.container').hide();
    $('.menu').slideUp(350);
  }

  reviewView.initReview = function (ctx) {
    reset();
    $('.user-review').show();
    $('#review-list').empty();
    $('#review-submit-form').empty();

    let reviewSubmitForm = $('#review-submit-form').append('<div class="post-review-container"><h3>Write your review</h3><form id="review-create-form"><input type="text" name="username" placeholder="User Name" required><textarea name="review" id="review" cols="50" rows="10"></textarea><button class="button" type="submit">Submit</button></form></div>');

    module.Review.all.map((review, index) => {
      review.index = index + 1;
      $('#review-list').append(review.toHtml());
      if(index === 0){
        reviewSubmitForm;
      }
    });

    //show only the first header
    $('.table-header').hide();
    $('#1').show();

    $('#review-create-form').on('submit', function(event) {
      event.preventDefault();
      let review = {
        username: event.target.username.value,
        review: event.target.review.value,
      }
      console.log(review.published_on);
      module.Review.create(review);
    })

  }

  reviewView.initUpdateReview = (ctx) => {
    reset();
    $('.update').show();
    $('').empty();

    $('#update-btn').on('click', function(event){
      event.preventDefault();
      let review = {
        review_id: ctx.review_id,
        username: $('#update-username').val(),
        review: $('#update-review').val() || ctx.review,
        published_on: $('#update-published_on').val() || ctx.published_on,
      };
      module.Review.updateReview(review);

    });
    $('#cancel-btn').on('click', function(event){
      event.preventDefault();
      app.Review.cancel();
    });

  };

  module.reviewView = reviewView;

})(app);
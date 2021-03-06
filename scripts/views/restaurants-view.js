'use strict';

var app = app || {};

$(document).ready(function() {
  $('.cross').hide();
  $('.menu').hide();
  $('.hamburger').click(function() {
    $('.menu').slideToggle('fast', function() {
      $('.hamburger').hide();
      $('.cross').show();
    });
  });
  $('.cross').click(function() {
    $('.menu').slideToggle('fast', function() {
      $('.cross').hide();
      $('.hamburger').show();
    });
  });
});

(function (module){

  const restaurantsView = {};

  function reset() {
    $('.container').hide();
    $('.menu').slideUp(350);
  }

  restaurantsView.initView = function (ctx) {
    reset();
    $('.home-view').show();
    $('#home-list').empty();
    module.KC.filter.map(rest => {
      $('#home-list').append(rest.toHtml())});
  }

  restaurantsView.initDetail = function (ctx) {
    reset();
    $('.detail-view').show();
    $('#restaurant-detail').empty();

    let counter = 0;
    module.KC.one.map(rest => {
      $('#restaurant-detail').append(rest.toHtml1());
      if(counter !== 0 && rest.inspection_date === module.KC.one[counter-1].inspection_date){
        $(`.${rest.violation_record_id}`).hide();
      }
      counter++;
    })
    restaurantsView.makeMap();
  };

  function resetCanvas() {
    $('#myChart').remove();
    $('#canvasContainer').append('<canvas id="myChart"><canvas>');
  }

  restaurantsView.makeMap = function(){
    resetCanvas();
    let chartKC = [];
    chartKC = module.KC.one.filter((a, b, c) => c.findIndex(a2 => a.inspection_date === a2.inspection_date) === b);

    chartKC.sort(function(a, b){
      var dateA=new Date(a.inspection_date), dateB=new Date(b.inspection_date)
      return dateA-dateB
    });

    let restDates = [];
    let restScore = [];
    let restName = chartKC.inspection_business_name;
    chartKC.forEach(function(element) {
      restName = element.inspection_business_name;
      restDates.push(new Date(element.inspection_date).toDateString('en-US'));
      restScore.push(element.inspection_score);
    });

    let ctxMap = document.getElementById('myChart');
    let chart = new Chart(ctxMap, {
      type: 'bar',
      data: {
        labels:restDates,
        datasets: [{
          label: 'Total violation points',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data:restScore,
        }]
      },
      options: {}
    });
  };

  module.restaurantsView = restaurantsView;
})(app);
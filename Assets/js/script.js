const localeSettings = {};
dayjs.locale(localeSettings);

$(function () {
  const today = dayjs().format('H');
  function currentTime() {
    const dateEl = $('#date');
    const timeEl = $('#time');
    const date = dayjs().format('MMMM DD, YYYY');
    const time = dayjs().format('hh:mm A');
    dateEl.text(date);
    timeEl.text(time);
  }

  function textInput() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }

  function colorHours() {
    $('.time-block').each(function() {
      const hours = parseInt(this.id);
      $(this).toggleClass('past', hours < today);
      $(this).toggleClass('present', hours === today);
      $(this).toggleClass('future', hours > today);
    });
  }
  
  function updateColor() {
    $('.time-block').each(function() {
      const hours = parseInt(this.id);
      if (hours == today) {
        $(this).removeClass('past future').addClass('present');
      } else if (hours < today) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  textInput(); 
  colorHours();         
  updateColor();
  setInterval(currentTime, 1000);
});
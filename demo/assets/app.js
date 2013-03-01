$(document).ready(function() {
  $('.inane_list').stickySections();
  $('.div_list').stickySections();
  $('.table_list').stickySections({sectionSelector: '.header', placeholder:'<tr><th>&nbsp;</th><th>&nbsp;</th></tr>'});
})

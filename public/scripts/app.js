// Input Lock
$("input").blur(function() {
  $("#signup-form input").each(function() {
    $this = $(this);
    if (this.value != "") {
      $this.addClass("focused");
      $("input + label + span").css({ opacity: 1 });
    } else {
      $this.removeClass("focused");
      $("input + label + span").css({ opacity: 0 });
    }
  });
});

$("#signup-form .field:first-child input").blur(function() {
  $("#signup-form .field:first-child input").each(function() {
    $this = $(this);
    if (this.value != "") {
      $this.addClass("focused");
      $(".field:first-child input + label + span").css({ opacity: 1 });
    } else {
      $this.removeClass("focused");
      $(".field:first-child input + label + span").css({ opacity: 0 });
    }
  });
});

$("#signup-form .field:nth-child(2) input").blur(function() {
  $("#signup-form .field:nth-child(2) input").each(function() {
    $this = $(this);
    if (this.value != "") {
      $this.addClass("focused");
      $(".field:nth-child(2) input + label + span").css({ opacity: 1 });
    } else {
      $this.removeClass("focused");
      $(".field:nth-child(2) input + label + span").css({ opacity: 0 });
    }
  });
});

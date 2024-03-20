function htmlEncode(c) {
  return $("<div/>").text(c).html();
}
$(function () {
  $("#generate").click(function () {
    $(".qr-code").attr(
      "src",
      "https://chart.googleapis.com/chart?cht=qr&chl=" +
        htmlEncode($("#content").val()) +
        "&chs=250x250&chld=L|0"
    ),
      $("#URL").css("display", "block"),
      $("#URL").attr(
        "href",
        "https://chart.googleapis.com/chart?cht=qr&chl=" +
          htmlEncode($("#content").val()) +
          "&chs=250x250&chld=L|0"
      );
  });
}),
  $(function () {
    $("#URL").click(function () {
      window.location =
        "https://chart.googleapis.com/chart?cht=qr&chl=" +
        htmlEncode($("#content").val()) +
        "&chs=250x250&chld=L|0";
    });
  });

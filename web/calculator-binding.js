$(function() {
    var calculator = new Calculator();

    $(".calculator [data-bind]").on("click", function() {
		calculator.enter($(this).attr("data-bind"));
		$('.calculator .display').val(calculator.display());	
    });
});

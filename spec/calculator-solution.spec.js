describe("Calculator", function() {
        var calculator;

        beforeEach(function() {
                calculator = new Calculator();
        });

        var executeTest = function(testData) {
                var inputs = testData[0].split('');
                var expectedOutput = testData[1];
                describe("when entering '" + inputs.join("' then '") + "'", function() {
                        beforeEach(function() {
                                inputs.forEach(function(c) {
                                        calculator.enter(c);
                                });
                        });
                        it("should display " + expectedOutput, function() {
                                expect(calculator.display()).toEqual(expectedOutput);
                        });
                });
        };

        var exceptionRaised = function(testData) {
                testData.forEach(function(input) {
                        describe("when entering '" + input + "'", function() {
                                it("should throw an error", function() {
                                        expect(function() {
                                                calculator.enter(input);
                                        }).toThrow();
                                });
                        });
                });
        };

        describe("Entering single digits", function() {
                [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
                ["9", "9"]
                ].forEach(executeTest);
        });

        describe("Entering multiple digits", function() {
                [
                ["123", "123"],
                ["11000", "11000"],
                ["002", "2"],
                ["8762429", "8762429"]
                ].forEach(executeTest);
        });

        describe("Operations", function() {
                [
                ["1+1=", "2"],
                ["15+28=", "43"],
                ["34+6-10=", "30"],
                ["15+28=", "43"],
                ["3*5=", "15"],
                ["24/4=", "6"],
                ["2+4==", "6"],
                ["5-4++", "1"],
                ["1+2=-6=", "-3"],
                ["1+2=5+4=", "9"],
                ["1+2-", "3"],
                ["1+2*6+", "18"]
                ].forEach(executeTest);
        });

        describe("Backspace button", function() {
                [
                ["1b", "0"],
                ["123b", "12"],
                ["3453b12", "34512"],
                ["34b0+12=", "42"]
                ].forEach(executeTest);
        });

        describe("Clear button", function() {
                [
                ["123C", "0"],
                ["34+23C1-5=", "-4"],
                ["1+1=C", "0"]
                ].forEach(executeTest);
        });

        describe("+/- button", function() {
                [
                ["5!", "-5"],
                ["5!!", "5"],
                ["6+5!=", "1"],
                ["6+5=!", "-11"]
                ].forEach(executeTest);
        });

        describe("Input validation", function() {
                [
                [""],
                ["123"],
                "acdefghijklmnopqrstuvwxyz".split(''),
                "ABDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
                "$#@^&(){}[]\\:<>?~,".split('')
                ].forEach(exceptionRaised);
        });
});

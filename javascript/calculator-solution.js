var Calculator = function() {
        var accumulator, entry, stored_operation, display;

        var ops = {
                identity: function(a, b) { return b === null ? a : b; },
                add: function(a, b) { return a + b; },
                subtract: function(a, b) { return a - b; },
                multiply: function(a, b) { return a * b },
                divide: function(a, b) { return a / b }
        };

        var update_current_state = function(accumulatorValue, entryValue, nextOperation) {
                accumulator = accumulatorValue;
                entry = entryValue;
                stored_operation = nextOperation;
                update_display(accumulator);
        };

        var wrap_op = function(op) {
                return function() {
                        update_current_state(stored_operation(accumulator, entry), 0, op);
                };
        };

        var update_display = function(result) {
                display = result.toString();
        };

        var validate_input = function(input) {
                if (!input.match('^[C+=\\-*/b\\!|0-9]$')) {
                        throw {
                                name: 'InvalidArgument',
                                        message: 'Input not valid: ' + ch
                        };
                }
        };

        var buttons = {
                '+': wrap_op(ops.add),
                '-': wrap_op(ops.subtract),
                '*': wrap_op(ops.multiply),
                '/': wrap_op(ops.divide),
                '!': function() {
                        if (entry === null) {
                                update_display(accumulator *= -1);
                        } else {
                                update_display(entry *= -1);
                        }
                },
                'C': function() {
                        update_current_state(0, null, ops.identity);
                },
                '=': function() {
                        update_current_state(stored_operation(accumulator, entry), null, ops.identity);
                },
                'b': function() {
                        var result = (entry && entry.toString().length > 0) ? entry.toString().slice(0, -1) : '';
                        if (result.length > 0) {
                                entry = parseInt(result, 10);
                        } else {
                                entry = 0;
                        }
                        update_display(entry);
                },
                digit: function(ch) {
                        entry = entry || "";
                        entry = parseInt(entry.toString() + ch.toString(), 10);
                        update_display(entry);
                }
        };

        this.enter = function(ch) {
                validate_input(ch);
                var act = buttons[ch] || buttons.digit;
                act(ch);
        };

        this.display = function() {
                return display;
        };

        this.enter('C');
};

var clc = require("cli-color");
var _ = require("underscore");

var startSymbol = String.fromCharCode(10033);
var doneSymbol = String.fromCharCode(10004);
var failedSymbol = String.fromCharCode(10008);
var warnSymbol = String.fromCharCode(9991);
var toSymbol = String.fromCharCode(10132);
var quoteSymbol = String.fromCharCode(10073);

/**
 * Default mode uses colors and font decoration.
 * TEXT mode can be used when the output is a file, to avoid crappy chars.
 */
var CONZOLE_MODE = process.env.CONZOLE_MODE,
    CONZOLE_MODE_TEXT = "TEXT";


/**
 * Indentation related settings
 */
var customIndent,
    defaultIndent = {
        title: 0,
        quote: 1,
        message: 1,
        start: 1,
        warn: 2,
        done: 2,
        failed: 2,
        fromTo: 0
    };

var conzole = {
    indent: function(nbSpaces) {
        customIndent = nbSpaces;

        return this;
    },
    title: function() {
        var text = getArgumentsAsString(arguments);

        if (isTextMode()) {
            console.log(getIndentSpaces("title"), text.toUpperCase());
            console.log(getIndentSpaces("title"), drawLine(text.length));
        } else {
            console.log(getIndentSpaces("title"), clc.blue.underline.bold(text));
        }

        return this;
    },
    quote: function() {
        var text = getArgumentsAsString(arguments);

        if (isTextMode()) {
            console.log(getIndentSpaces("quote"), quoteSymbol, text);
        } else {
            console.log(getIndentSpaces("quote"), clc.blackBright.bold(quoteSymbol), clc.blackBright.italic(text));
        }

        return this;
    },
    message: function() {
        console.log(getIndentSpaces("message"), getArgumentsAsString(arguments));
        return this;
    },
    start: function() {
        var text = getArgumentsAsString(arguments);

        if (isTextMode()) {
            console.log(getIndentSpaces("start"), startSymbol, text);
        } else {
            console.log(getIndentSpaces("start"), clc.magenta.bold(startSymbol), clc.magenta(text));
        }

        return this;
    },
    warn: function() {
        var text = getArgumentsAsString(arguments);

        if (isTextMode()) {
            console.log(getIndentSpaces("warn"), warnSymbol, text);
        } else {
            console.log(getIndentSpaces("warn"), clc.yellow.bold(warnSymbol), clc.yellow(text));
        }

        return this;
    },
    done: function() {
        var text = getArgumentsAsString(arguments);

        if (isTextMode()) {
            console.log(getIndentSpaces("done"), doneSymbol, text);
        } else {
            console.log(getIndentSpaces("done"), clc.green.bold(doneSymbol), clc.green(text));
        }

        return this;
    },
    failed: function() {
        var text = getArgumentsAsString(arguments);

        if (isTextMode()) {
            console.log(getIndentSpaces("failed"), failedSymbol, text);
        } else {
            console.error(getIndentSpaces("failed"), clc.red.bold(failedSymbol), clc.red(text));
        }

        return this;
    },
    fromTo: function(from, to) {

        if (isTextMode()) {
            console.log(getIndentSpaces("fromTo"), from, toSymbol, to);
        } else {
            console.log(getIndentSpaces("fromTo"), from, clc.whiteBright.bold(toSymbol), to);
        }

        return this;
    },
    ln: function() {
        console.log("");
        return this;
    },
    clear: function() {
        console.log(clc.reset);
    }
};

conzole.log = conzole.debug = conzole.message;

module.exports = conzole;

/**
 * Transform a list of arguments to string (object are stringified)
 *
 * @param  {object} args, the list of arguments
 *
 * @return {String}       the generated string
 */
function getArgumentsAsString(args) {
    var response = [];

    _.each(args, function(arg) {
        if (typeof arg === "object") {
            response.push(JSON.stringify(arg));
        } else {
            response.push(arg);
        }
    });
    return response.join(" ");
}

/**
 * Get the indentation spaces for the given message level.
 *
 * @param  {String} level, the message level (function name)
 *
 * @return {String} the number of spaces used to indent the message
 */
function getIndentSpaces(level) {
    var result = "";
    for (var i = getNbIndentSpaces(level) - 1; i >= 0; i--) {
        result += " ";
    }
    // Once indent spaces are computed reset the possible
    // custom indent for next call
    resetIndent();

    return result;
}

/**module.exports
 * Get the number of indentation spaces for the given level or
 * the custom one if set with "indent()"
 *
 * @param  {String} level, the message level (function name)
 *
 * @return {String} the number of spaces used to indent the message
 */
function getNbIndentSpaces(level) {
    return (customIndent ? customIndent : defaultIndent[level]);
}

function resetIndent() {
    customIndent = undefined;
}

function isTextMode() {
    return CONZOLE_MODE === CONZOLE_MODE_TEXT;
}

function drawLine(length) {
    var line = [];

    for (var i = length; i >= 0; i--) {
        line.push("-");
    };

    return line.join("");
}

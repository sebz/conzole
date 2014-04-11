var clc = require("cli-color");

var startSymbol = String.fromCharCode(10033);
var doneSymbol = String.fromCharCode(10004);
var failedSymbol = String.fromCharCode(10008);
var warnSymbol = String.fromCharCode(9991);
var toSymbol = String.fromCharCode(10132);
var quoteSymbol = String.fromCharCode(10073);

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
        console.log(getIndentSpaces("title"), clc.blue.underline.bold(Array.prototype.slice.call(arguments).join(" ")));
        return this;
    },
    quote: function() {
        console.log(getIndentSpaces("quote"), clc.blackBright.bold(quoteSymbol), clc.blackBright.italic(Array.prototype.slice.call(arguments).join(" ")));
        return this;
    },
    message: function() {
        console.log(getIndentSpaces("message"), Array.prototype.slice.call(arguments).join(" "));
        return this;
    },
    start: function() {
        console.log(getIndentSpaces("start"), clc.magenta.bold(startSymbol), clc.magenta(Array.prototype.slice.call(arguments).join(" ")));
        return this;
    },
    warn: function() {
        console.log(getIndentSpaces("warn"), clc.yellow.bold(warnSymbol), clc.yellow(Array.prototype.slice.call(arguments).join(" ")));
        return this;
    },
    done: function() {
        console.log(getIndentSpaces("done"), clc.green.bold(doneSymbol), clc.green(Array.prototype.slice.call(arguments).join(" ")));
        return this;
    },
    failed: function() {
        console.error(getIndentSpaces("failed"), clc.red.bold(failedSymbol), clc.red(Array.prototype.slice.call(arguments).join(" ")));
        return this;
    },
    fromTo: function(from, to) {
        console.log(getIndentSpaces("fromTo"), from, clc.whiteBright.bold(toSymbol), to);
        return this;
    },
    ln: function() {
        console.log("");
        return this;
    },
    clear: function() {
        console.log(clc.reset);
    },
};

conzole.log = conzole.debug = conzole.message;

module.exports = conzole;

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

/**
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

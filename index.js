var startSymbol = String.fromCharCode(10033);
var doneSymbol = String.fromCharCode(10004);
var failedSymbol = String.fromCharCode(10006);
var toSymbol = String.fromCharCode(10132);
var quoteSymbol = String.fromCharCode(10077);

module.exports = {
    start: function() {
        console.log(" ", startSymbol, Array.prototype.slice.call(arguments).join(" "));
    },
    done: function() {
        console.log("  ", doneSymbol, Array.prototype.slice.call(arguments).join(" "));
    },
    failed: function() {
        console.error("  ", failedSymbol, Array.prototype.slice.call(arguments).join(" "));
    },
    quote: function() {
        console.error("  ", quoteSymbol, Array.prototype.slice.call(arguments).join(" "));
    }
};

var conzole = require("./lib/index");

conzole.clear();
conzole.ln();
conzole.title("We are about to do something");
conzole.quote("It will be something!");
conzole.message("Get ready...");
conzole.start("Starting something");
conzole.failed("Something failed");
conzole.warn("Something did not fail, but that was close");
conzole.done("Something finished");

conzole.ln();

// From To messages
conzole.fromTo("Something from here", "there");

conzole.ln();

// Custom indention
conzole.indent(10).message("Overriding the default indentation");
conzole.indent(10).fromTo("From 1", "10");

conzole.ln();

// Chaining
conzole.title("Chaining demo").indent(4).quote("We are chaining calls").indent(6).message("Look, I'm chained").ln();

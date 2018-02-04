const page = require('webpage').create();
const detectPhantom = require('./detect-phantom');

page.onConsoleMessage = (msg) => {
    console.log(msg);
};

page.open('about:blank', function () {
    Object.keys(detectPhantom).forEach((test) => {
        if(page.evaluate(detectPhantom[test])) {
            console.log(`PhantomJS detected via ${test}`);
        }
    });
    phantom.exit();
});



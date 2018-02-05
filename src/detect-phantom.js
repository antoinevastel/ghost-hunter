module.exports = function() {
    /*
        Tests not working anymore: Function.prototype.bind
        indexOfString(err.stack, 'phantomjs') > -1
        plugins.length == 0
        Close to Safari since it uses Webkit, thus ideally someone that'd try to hide should try to fake safari
     */

    function testUserAgent() {
        return /PhantomJS/.test(window.navigator.userAgent);
    }

    function testPhantomProperties() {
           return 'callPhantom' in window || '_phantom' in window || 'phantom' in window || 'WebPage' in window;
    }

    function testNullError() {
        try{
            null[0]();
        } catch(e) {
            return /null is not an object \(evaluating 'null\[0\]'\)/.test(e.message) &&
                e.filename === undefined &&
                e.lineNumber === undefined &&
                e.description === undefined &&
                e.number === undefined &&
                e.columnNumber === undefined;
        }
        return true;
    }

    function testPlugins() {
        return window.navigator.plugins && window.navigator.plugins.length === 2 && (
                    /Shockwave Flash/.test(window.navigator.plugins[1].name) ||
                    /Shockwave Flash/.test(window.navigator.plugins[0].name)
                ) && (
                    /IcedTea-Web Plugin \(using IcedTea-Web/.test(window.navigator.plugins[0].name) ||
                    /IcedTea-Web Plugin \(using IcedTea-Web/.test(window.navigator.plugins[1].name)
                )
    }

    function testEtsl() {
        return !/Firefox|AppleWebkit/.test(window.navigator.userAgent) &&
                window.eval.toString().length === 37;
    }

    function testLanguages() {
        // https://developer.mozilla.org/fr/docs/Web/API/NavigatorLanguage/languages
        return !/Trident|MSIE|Edge/.test(window.navigator.userAgent) &&
            navigator.languages === undefined;
    }

    function testWebsocket() {
        try {
            new WebSocket("itsgonnafail");
        } catch (e) {
            return /SyntaxError: DOM Exception 12/.test(e.message);
        }
        return false;
    }

    function testScreenMediaQuery() {
        return !window.matchMedia('(min-width: '+(screen.availWidth-1)+'px)').matches;
    }

    function testStackOverflow() {
        let depth = 0;
        let errorMessage = '';
        let errorName= '';
        let errorStacklength = 0;

        function iWillBetrayYouWithMyLongName() {
            try {
                depth++;
                iWillBetrayYouWithMyLongName();
            } catch (e) {
                errorMessage = e.message;
                errorName = e.name;
                errorStacklength = e.stack.toString().length;
            }
        }

        iWillBetrayYouWithMyLongName();

        return errorName === 'RangeError' &&
            errorMessage === 'Maximum call stack size exceeded.' &&
            errorStacklength > 20*depth;
    }

    function testWindowHeight() {
        return window.outerHeight - window.innerHeight < 0;
    }

    return {
        userAgent: testUserAgent,
        phantomProperties: testPhantomProperties,
        nullError: testNullError,
        plugins: testPlugins,
        etsl: testEtsl,
        languages: testLanguages,
        websocket: testWebsocket,
        screenMediaQuery: testScreenMediaQuery,
        stackOverflow: testStackOverflow,
        windowHeight: testWindowHeight
    }
}();
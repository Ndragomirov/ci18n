before( function () {
    var dictionary = {
        "foo": "foo",
        "bar": "bar"
    };

    window.chrome = window.chrome || {};
    window.chrome.i18n = {
        getMessage: function ( key ) {
            return dictionary[key];
        }
    };
} )

describe( "i18n", function () {

    describe( "#replacei18nMessage", function () {
        it( "should replace __MSG_foo__ to foo in '__MSG_foo__ and __MSG_bar__'", function () {
            i18n.replacei18nMessage( "__MSG_foo__ and __MSG_bar__" ).should.equal( "foo and bar" );
        } )
    } )

    describe( "#replace", function () {
        it( "should replace element's html", function () {
            var el = document.createElement( 'div' );
            el.innerHTML = "<p>hello,</p><span>__MSG_foo__</span>";
            i18n.replace( el );
            el.innerHTML.should.equal( "<p>hello,</p><span>foo</span>" )
        } )

        it( "should replace element's attributes", function () {
            var el = document.createElement( 'div' );
            el.setAttribute( "i18n-foo", "__MSG_foo__" );
            el.setAttribute( "i18n-bar", "__MSG_bar__" );
            el.setAttribute( "i18n-foo-and-bar", "__MSG_foo__ and __MSG_bar__" );
            i18n.replace( el );
            el.getAttribute( "i18n-foo" ).should.equal( "foo" );
            el.getAttribute( "i18n-bar" ).should.equal( "bar" );
            el.getAttribute( "i18n-foo-and-bar" ).should.equal( "foo and bar" );
        } )
    } )

    describe( "#observe", function () {
        beforeEach( function () {
            i18n.observe();
        } )

        afterEach( function () {
            i18n.stop();
        } )

        it( "should auto replace elements html on dom node insert", function ( done ) {
            var el = document.createElement( 'div' )
                , sandbox = document.querySelector( "#sandbox" );

            el.innerHTML = "__MSG_foo__";
            sandbox.appendChild( el );

            setTimeout( function () {
                try {
                    el.innerHTML.should.equal( "foo" );
                    done();
                } catch (e) {
                    done( e );
                }
            }, 10 );
        } )

        it( "should auto replace elements attributes on change", function ( done ) {
            var el = document.createElement( 'div' )
                , sandbox = document.querySelector( "#sandbox" );

            el.setAttribute( "i18n-foo", "__MSG_foo__" );
            el.innerHTML = "__MSG_foo__";
            sandbox.appendChild( el );

            setTimeout( function () {
                try {
                    el.getAttribute( "i18n-foo" ).should.equal( "foo" );
                    done();
                } catch (e) {
                    done( e );
                }
            }, 10 );
        } )
    } )
} );
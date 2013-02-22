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

    describe( "#replace", function () {

        it( "should replace the `given` elements html", function () {
            var el = document.createElement( 'div' );
            el.innerHTML = "<p>hello,</p><span>__MSG_foo__</span>";
            i18n.replace( el );
            el.innerHTML.should.equal( "<p>hello,</p><span>foo</span>" )
        } )

        it( "should replace the `given` elements attributes", function () {
            var el = document.createElement( 'div' );
            el.setAttribute( "i18n-foo", "__MSG_foo__" );
            el.setAttribute( "i18n-bar", "__MSG_bar__" );
            el.setAttribute( "i18n-foo-and-bar", "__MSG_foo__ and __MSG_bar__" );
            i18n.replace( el );
            el.getAttribute( "i18n-foo" ).should.equal( "foo" );
            el.getAttribute( "i18n-bar" ).should.equal( "bar" );
            el.getAttribute( "i18n-foo-and-bar" ).should.equal( "foo and bar" );
        } )

        it( "should not replace text content inside `SCRIPT`, `STYLE`, `TEXTAREA` elements", function () {
            var tags = ["script", "style", "textarea"]
                , text = "__MSG_foo__";

            for ( var i = 0; i < tags.length; i++ ) {
                var el = document.createElement( tags[i] );
                el.textContent = text;
                i18n.replace( el );
                el.textContent.should.equal( "__MSG_foo__" );
            }

        } );
    } )

    describe( "#observe", function () {
        beforeEach( function () {
            i18n.observe( document.querySelector( "#sandbox" ) );
        } )

        afterEach( function () {
            i18n.stop();
        } )

        it( "should not replace elements html or attributes outside of the observable node", function ( done ) {
            var el = document.createElement( 'div' ),
                container = document.querySelector( '#outbox' );

            el.innerHTML = "__MSG_foo__";
            container.appendChild( el );

            setTimeout( function () {
                try {
                    el.innerHTML.should.not.equal( "foo" );
                    done();
                } catch (e) {
                    done( e );
                }
            }, 1 );
        } );

        it( "should auto replace elements text content and attributes on dom node insert", function ( done ) {
            var el = document.createElement( 'div' )
                , sandbox = document.querySelector( "#sandbox" );

            el.innerHTML = "__MSG_foo__";
            el.setAttribute( "i18n-foo", "__MSG_foo__" );

            sandbox.appendChild( el );

            setTimeout( function () {
                try {
                    el.innerHTML.should.equal( "foo" );
                    el.getAttribute( "i18n-foo" ).should.equal( "foo" );
                    done();
                } catch (e) {
                    done( e );
                }
            }, 1 );
        } )

        it( "should auto replace elements text content and attributes on change", function ( done ) {
            var el = document.createElement( 'div' )
                , sandbox = document.querySelector( "#sandbox" );

            sandbox.appendChild( el );
            setTimeout( function () {
                el.innerHTML = "__MSG_foo__";
                el.setAttribute( "i18n-bar", "__MSG_bar__" );

                setTimeout( function () {
                    try {
                        el.innerHTML.should.equal( "foo" );
                        el.getAttribute( "i18n-bar" ).should.equal( "bar" );
                        done();
                    } catch (e) {
                        done( e );
                    }
                }, 1 );
            }, 50 );
        } )
    } )
} );
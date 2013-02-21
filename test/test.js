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
        it( "should replace __MSG_foo__ to foo at string '__MSG_foo__'", function () {
            i18n.replacei18nMessage( "__MSG_foo__" ).should.equal( "foo" );
        } )

        it( "should replace __MSG_bar__ to bar at string '__MSG_bar__'", function () {
            i18n.replacei18nMessage( "__MSG_bar__" ).should.equal( "bar" );
        } )
    } )

    describe( "#replaceHTML", function () {
        it( "should replace element's html", function () {
            var el = document.createElement( 'div' );
            el.innerHTML = "<p>hello,</p><span>__MSG_foo__</span>";
            i18n.replaceHTML( el );
            el.innerHTML.should.equal( "<p>hello,</p><span>foo</span>" )
        } )
    } )

    describe( "#replaceHTML", function () {
        it( "should replace element's attributes", function () {
            var el = document.createElement( 'div' );
            el.setAttribute( "i18n-foo", "__MSG_foo__" );
            el.setAttribute( "i18n-bar", "__MSG_bar__" );
            i18n.replaceHTML( el );
            el.getAttribute( "i18n-foo" ).should.equal( "foo" );
            el.getAttribute( "i18n-bar" ).should.equal( "bar" );
        } )
    } )

    describe( "#observe", function () {
        it( "should auto replace elements html on dom node insert", function () {
            var el = document.createElement( 'div' )
                , sandbox = document.querySelector( "#sandbox" );

            el.innerHTML = "__MSG_foo__";
            sandbox.appendChild( el );
            el.innerHTML.should.equal( "foo" );
        } )
    } )

    describe( "#observe", function () {
        it( "should auto replace elements attributes on change", function () {

        } )
    } )
} );
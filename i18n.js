(function ( w ) {
    "use strict";
    var that = w.i18n = {};

    that.observeTarget = document.body;
    that.observer = null;
    that.config = {
        attributes: true,
        childList : true,
        subtree   : true
    };

    that.observe = function () {
        that._observe( that.mutationHandler );
    };

    that._observe = function ( fn ) {
        var MutationObserver = w.MutationObserver || w.WebKitMutationObserver;

        if ( MutationObserver ) {
            that.observer = new MutationObserver( fn );
            that.observer.observe( that.observeTarget, that.config );
        } else {
            throw new Error( "MutationObserver doesn't supported" );
        }
    };

    that.stop = function () {
        that.observer && that.observer.disconnect();
    };

    that.replace = function ( el ) {
        var textNodes = that.findTextNodes( el );
        var attributes = that.findAttributes( el );
        for ( var i = 0; i < textNodes.length; i++ ) {
            textNodes[i].nodeValue = that.replacei18nMessage( textNodes[i].nodeValue );
        }
        for ( var j = 0; j < attributes.length; j++ ) {
            attributes[j].value = that.replacei18nMessage( attributes[j].value );
        }
    };

    that.mutationHandler = function ( mutations ) {
        for ( var i = 0; i < mutations.length; i++ ) {

            var m = mutations[i];

            if ( m.type == "childList" ) {
                var addedNodes = m.addedNodes;

                for ( var j = 0; j < addedNodes.length; j++ ) {
                    that.replace( addedNodes[j] );
                }
            }
        }
    };

    that.replacei18nMessage = function ( text ) {
        var replace = function ( str, msg ) {
            return chrome.i18n.getMessage( msg );
        };

        return text.replace( /__MSG_([\w_]+)__/g, replace );
    };

    that.findAttributes = function ( el ) {
        var attrs = []
            , slice = [].slice;

        //element node
        if ( el.nodeType == 1 ) {
            if ( el.attributes ) {
                attrs = attrs.concat( slice.call( el.attributes, 0 ) );
            }

            for ( var child = el.firstChild; child != null; child = child.nextSibling ) {
                attrs = attrs.concat( that.findAttributes( child ) );
            }
        }

        return attrs;
    };

    that.findTextNodes = function ( el ) {
        var nodes = [];

        //text node
        if ( el.nodeType == 3 ) {
            return [el];
        }

        //element node
        if ( el.nodeType == 1 ) {
            for ( var child = el.firstChild; child != null; child = child.nextSibling ) {
                nodes = nodes.concat( that.findTextNodes( child ) );
            }
        }
        return nodes;
    };

})( window );
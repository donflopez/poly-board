Polymer({
    is: 'poly-board',

    listeners: {
        'board.track': 'track'
    },

    ready: function() {

        // This.$.board.style.display = 'none';
        console.dir( this.getEffectiveChildren() );
    },

    track: function( e ) {
        switch ( e.detail.state ) {
            case 'track':
                this._onTrack( e );
                break;
            case 'start':
                this._startHandle( e );
                break;
            case 'end':
                this._endHandle( e );
                break;
            default:
        }
    },

    _getCoords: function( e ) {
      this.el = e.target;
      this.computed = window.getComputedStyle( this.el );

      this.oX = this.x = parseInt( this.computed.left );
      this.oY = this.y = parseInt( this.computed.top );

      this.startX = e.detail.sourceEvent.screenX;
      this.startY = e.detail.sourceEvent.screenY;
    },

    _startHandle: function( e ) {
      e.preventDefault();
      this._getCoords( e );

    },

    _onTrack: function( e ) {
        e.preventDefault();

        var x = ( e.detail.sourceEvent.screenX - this.startX ),
            y = ( e.detail.sourceEvent.screenY - this.startY );

        this.x = x;
        this.y = y;

        this._apply();
    },

    _endHandle: function( e ) {
      e.preventDefault();
      this._savePosition();
    },

    _apply: function() {
      this.el.style.transform = 'translateX(' + this.x + 'px) translateY(' + this.y + 'px)';
    },

    _savePosition: function() {
      this.el.style.left = ( this.x + this.oX ) + 'px';
      this.el.style.top = ( this.y + this.oY ) + 'px';
      this.el.style.transform = 'translateX(0px) translateY(0px)';
    }

});

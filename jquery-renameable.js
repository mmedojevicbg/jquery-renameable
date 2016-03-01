(function(window, $){
    var Renameable = function(elem, options){
      this.elem = elem;
      this.$elem = $(elem);
      this.options = options;
      this.metadata = this.$elem.data('plugin-options');
    };
    Renameable.prototype = {
      defaults: {
      },
      init: function() {
        this.config = $.extend({}, this.defaults, this.options, this.metadata);
        var elem = this.$elem;
        this.$elem.dblclick(function(){
          var inputField = $('<input type="text" />');
          var offset = $(this).offset();
  	      $('body').append(inputField);
        	inputField.css("position", "absolute");
        	inputField.width($(this).width());
        	inputField.height($(this).height());
        	inputField.offset(offset);
          inputField.data('rel-field', $(this));
          inputField.focus();
          inputField.keypress(function (e) {
            var key = e.which;
            if(key == 13) {
                $(this).data('rel-field').text($(this).val());
                $(this).remove();
                elem.trigger('renamed');
                return false;
            }
          });
        });
        return this;
      }
    };
    Renameable.defaults = Renameable.prototype.defaults;
    $.fn.renameable = function(options) {
      return this.each(function() {
        new Renameable(this, options).init();
      });
    };
    window.Renameable = Renameable;
})(window, jQuery);
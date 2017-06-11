!(function (window, document) {

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  var Circle = function (obj) {
    this.el = obj.el || document.body;
    this.circles = [];
    this.num = obj.num || 5;
    this.minSize = obj.minSize || 30;
    this.maxSize = obj.maxSize || 100;
    this.outerSize = obj.outerSize || 0;
    this.changeSize = obj.changeSize 
    this.wrapper;
  }

  Circle.prototype = {
    init: function () {
      this.createWrapper();
      this.created();
    },
    created: function () {
      var that = this;
      for (var i = 0; i < this.num; i++) {
        (function () {
          var size = getRandom(that.maxSize, that.minSize);
          var circle = that.createdCircle(size);
          that.startCircle(circle);
        })();
      }
    },
    createWrapper: function () {
      var rad = parseInt(Math.random() * 100000);
      var id = 'canvasCircle_' + rad;
      this.wrapper = document.createElement('div');
      this.wrapper.id = id;
      this.wrapper.className = "canvas_wrapper";
      this.el.appendChild(this.wrapper);
    },
    createdCircle(size) {
      var circle = document.createElement('div');
      var clientSize = this.getClientSize();
      var left = this.getPos(clientSize.clientWidth - size);
      var top = this.getPos(clientSize.clientHeight - size);
      circle.size = size;
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = left + 'px';
      circle.style.top = top + 'px';
      this.wrapper.appendChild(circle);
      return circle;
    },
    getClientSize() {
      var body = document.body;
      return {
        clientWidth: body.clientWidth,
        clientHeight: body.clientHeight
      }
    },
    createStyle() {
      var style = document.createElement('style');
      style.innerHTML = '';
      document.head.appendChild(style);
    },
    getRandomTime() {
      return getRandom(3000, 8000);
    },
    startCircle: function (circle) {
      var that = this;
      var timer = null;
      var time = getRandom(1000, 4000);
      timer = setTimeout(function () {
        that.animate(circle);
        var fn = arguments.callee;
        setTimeout(function () {
          fn()
        }, that.getRandomTime());
      }, 0)
    },
    getPos (maxSize) {
      return getRandom(0 - this.outerSize, maxSize + this.outerSize);
    },
    animate: function (circle) {
      if (this.changeSize) {
        var size = getRandom(this.minSize, this.maxSize);
        circle.size = size;
      }
      var size = circle.size;
      var clientSize = this.getClientSize();
      var left = this.getPos(clientSize.clientWidth - size);
      var top = this.getPos(clientSize.clientHeight - size);
      circle.style.left = left + 'px';
      circle.style.top = top + 'px';
      circle.style.width = circle.style.height = size + 'px';
    }
  }


  window.Circle = Circle;

})(window, document);
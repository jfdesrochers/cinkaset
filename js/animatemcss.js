/* Supported animations:
  * `bounce`
  * `flash`
  * `pulse`
  * `rubberBand`
  * `shake`
  * `headShake`
  * `swing`
  * `tada`
  * `wobble`
  * `jello`
  * `bounceIn`
  * `bounceInDown`
  * `bounceInLeft`
  * `bounceInRight`
  * `bounceInUp`
  * `bounceOut`
  * `bounceOutDown`
  * `bounceOutLeft`
  * `bounceOutRight`
  * `bounceOutUp`
  * `fadeIn`
  * `fadeInDown`
  * `fadeInDownBig`
  * `fadeInLeft`
  * `fadeInLeftBig`
  * `fadeInRight`
  * `fadeInRightBig`
  * `fadeInUp`
  * `fadeInUpBig`
  * `fadeOut`
  * `fadeOutDown`
  * `fadeOutDownBig`
  * `fadeOutLeft`
  * `fadeOutLeftBig`
  * `fadeOutRight`
  * `fadeOutRightBig`
  * `fadeOutUp`
  * `fadeOutUpBig`
  * `flipInX`
  * `flipInY`
  * `flipOutX`
  * `flipOutY`
  * `lightSpeedIn`
  * `lightSpeedOut`
  * `rotateIn`
  * `rotateInDownLeft`
  * `rotateInDownRight`
  * `rotateInUpLeft`
  * `rotateInUpRight`
  * `rotateOut`
  * `rotateOutDownLeft`
  * `rotateOutDownRight`
  * `rotateOutUpLeft`
  * `rotateOutUpRight`
  * `hinge`
  * `rollIn`
  * `rollOut`
  * `zoomIn`
  * `zoomInDown`
  * `zoomInLeft`
  * `zoomInRight`
  * `zoomInUp`
  * `zoomOut`
  * `zoomOutDown`
  * `zoomOutLeft`
  * `zoomOutRight`
  * `zoomOutUp`
  * `slideInDown`
  * `slideInLeft`
  * `slideInRight`
  * `slideInUp`
  * `slideOutDown`
  * `slideOutLeft`
  * `slideOutRight`
  * `slideOutUp`
*/

function animateCleanup(element, animationName, callback) {
    var cleanfn = function(e) {
        try {
            element.classList.remove("animated");
            element.classList.remove(animationName);
            if (typeof(callback) === 'function') {
                callback(e);
            }
        } finally {
            element.removeEventListener("webkitAnimationEnd", cleanfn);
            element.removeEventListener("mozAnimationEnd", cleanfn);
            element.removeEventListener("MSAnimationEnd", cleanfn);
            element.removeEventListener("oanimationend", cleanfn);
            element.removeEventListener("animationend", cleanfn);
        }
    };
    element.addEventListener("webkitAnimationEnd", cleanfn);
    element.addEventListener("mozAnimationEnd", cleanfn);
    element.addEventListener("MSAnimationEnd", cleanfn);
    element.addEventListener("oanimationend", cleanfn);
    element.addEventListener("animationend", cleanfn);
}

function _animate(el, name, callback) {
    animateCleanup(el, name, callback);
    el.classList.add("animated");
    el.classList.add(name);
}

function animateTarget(name, callback) {
    return function(e) {
        _animate(e.target, name, callback);
        m.redraw.strategy("none");
    }
}

m.a = function (sel, opts, txt) {
    if ('animname' in opts) {
        var oldconfig = opts.config;
        opts.config = function(el, isinit, ctx) {
            if (!isinit) {
                _animate(el, opts.animname);
            }
            if (oldconfig) {
                oldconfig(el, isinit, ctx);
            }
        };
    }
    return m(sel, opts, txt);
};
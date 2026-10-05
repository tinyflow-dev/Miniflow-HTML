/* ==========================================================================
   Miniflow — letter splitting for the CSS hover animations.
   Each letter becomes a span with --i (its index); its wrapper gets
   --n (the letter count). All motion lives in css/styles.css.
   ========================================================================== */
(function () {
  'use strict';

  /** Replace el's text with one span per letter, numbered from start. Returns the count. */
  function split(el, className, start) {
    var chars = Array.from(el.textContent);
    el.textContent = '';
    chars.forEach(function (ch, i) {
      var span = document.createElement('span');
      span.className = className;
      span.style.setProperty('--i', start + i);
      span.textContent = ch;
      el.appendChild(span);
    });
    return chars.length;
  }

  // Button and project link labels
  document.querySelectorAll('.mf-roll').forEach(function (roll) {
    roll.style.setProperty('--n', split(roll, 'mf-roll__char', 0));
  });

  // Logo wordmark: "mini" and "flow" keep their own styling but share one count
  document.querySelectorAll('.mf-logo__wordmark').forEach(function (wordmark) {
    var n = 0;
    Array.from(wordmark.children).forEach(function (part) {
      n += split(part, 'mf-logo__letter', n);
    });
    wordmark.style.setProperty('--n', n);
  });
})();

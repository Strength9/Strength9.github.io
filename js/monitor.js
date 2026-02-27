/* ==========================================================================
   Strength 9 Design — Riker Monitoring
   Lightweight error tracking and heartbeat for static site
   ========================================================================== */

(function () {
  'use strict';

  var ENDPOINT = 'https://api.riker.strength9.com';
  var API_KEY = 'nxm_3dfdcd12ec0f85aca0e45fb12d5a09a9d15b0e1aac7f6a841190fcd89ac95271';
  var PROJECT_ID = 'db00d9df-0117-435d-b9ed-26333e8bf480';

  function send(payload) {
    var body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT + '/ingest', body);
    } else {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', ENDPOINT + '/ingest', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + API_KEY);
      xhr.send(body);
    }
  }

  function report(level, message, stack) {
    send({
      level: level,
      message: message,
      stack_trace: stack || '',
      metadata: {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      },
      source: 'website',
      project_id: PROJECT_ID
    });
  }

  // JS runtime errors
  window.onerror = function (msg, source, line, col, err) {
    report('error', msg, err && err.stack ? err.stack : source + ':' + line + ':' + col);
  };

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', function (e) {
    var msg = e.reason ? (e.reason.message || String(e.reason)) : 'Unhandled promise rejection';
    var stack = e.reason && e.reason.stack ? e.reason.stack : '';
    report('error', msg, stack);
  });

  // Heartbeat on page load
  send({
    level: 'info',
    message: 'heartbeat',
    metadata: {
      url: window.location.href,
      timestamp: new Date().toISOString()
    },
    source: 'website',
    project_id: PROJECT_ID
  });
})();

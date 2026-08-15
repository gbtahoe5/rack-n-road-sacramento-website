// RACK N ROAD — STORE FACTS (single source of truth)
// Edit THIS file only; every staged page reads from it.
// PRODUCTION (Olaf): replicate as a WP global (ACF options/shortcode partial)
// rendered server-side into BOTH visible text and LocalBusiness schema.
// OCT 1 SWITCHOVER: update address + hours HERE — one edit, every page follows.
window.RNR_FACTS = {
  sacramento: {
    name: "Rack N Road — Sacramento",
    phoneDisplay: "(916) 563-7333",
    phoneE164: "+19165637333",
    address1: "2021 Arden Way",
    cityStateZip: "Sacramento, CA 95825",
    // OWNER-CONFIRMED (Greg, Aug 2026):
    hoursHtml: "MON-SAT 9AM-5PM<br>SUN Closed"
  }
};
document.addEventListener('DOMContentLoaded', function () {
  var f = window.RNR_FACTS.sacramento;
  document.querySelectorAll('[data-rnr]').forEach(function (el) {
    var k = el.getAttribute('data-rnr');
    if (f[k] !== undefined) el.textContent = f[k];
  });
  document.querySelectorAll('[data-rnr-html]').forEach(function (el) {
    var k = el.getAttribute('data-rnr-html');
    if (f[k] !== undefined) el.innerHTML = f[k];
  });
});

const RNR_SERVICE_AREAS = ['Sacramento', 'Citrus Heights', 'Roseville', 'Rocklin', 'Lincoln', 'Granite Bay', 'Orangevale', 'Fair Oaks', 'Folsom', 'El Dorado Hills', 'Elk Grove', 'Davis', 'Auburn', 'Placerville'];

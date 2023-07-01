---
layout: layouts/base.njk
eleventyNavigation:
  key: watercolour
  order: 5
---

# watercolour

{% set js %}
{% include "./sketch.js" %}
{% endset %}

<script src="https://cdn.jsdelivr.net/npm/p5@1.6.0/lib/p5.js"></script>

<script >
  {{ js | safe }} 
</script>

Tip: you can right click to save it you like it! Reloading the page will generate a new one, just for you!

<div id="sketch"></div>

<!-- <button onclick="renderWatercolor()">Get a new watercolour!</button> -->

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

Inspired by [Tyler Hobbs' essay](https://tylerxhobbs.com/essays/2017/a-generative-approach-to-simulating-watercolor-paints) about simulating watercolour paint with generative art, Nathan and I spent some time with p5.js and this is what we came up with.

Reloading the page will generate a new one, just for you! Tip: you can right click to save it if you like it :)

<div id="sketch"></div>

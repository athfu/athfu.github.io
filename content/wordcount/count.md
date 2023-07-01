---
layout: layouts/base.njk
eleventyNavigation:
  key: word count
  order: 4
---

# word count

Will I [Hate Writing Less](https://www.sashachapin.com/course-info)? Only time (and this heatmap) will tell.

I built this fun and colourful heatmap to visualize how many words I write each day. Please note, the _real data_ begins on 2023-07-01. Mock data was used for the earlier days :)<br>

{% set data %}
{% include "./wordCount.json" %}
{% endset %}

{% set js %}
{% include "./heatmap.js" %}
{% endset %}

<script>
  const wordCountData = {{data | safe}};
</script>

<script >
  {{ js | jsmin | safe }} 
</script>

<svg id='heatmap' onload="drawHeatMap(wordCountData)">
  <style>
  @media (prefers-color-scheme: dark) {
    #tooltip-text {
      fill: #000000;
    }
    #tooltip-rect {
      fill: #ffffff;
      opacity: 0.9;
    }
    #monthLabel {
      fill: #ffffff;
    }
}
</style>

<g id="tooltip" visibility="hidden" >
<rect id='tooltip-rect' height="35" rx="3" ry="3"/>
<text id='tooltip-text' x="15" y="22">Tooltip</text>
</g>
</svg>

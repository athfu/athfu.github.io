---
title: colour palette
description: This is a post on my blog about building a colour palette generator.
date: 2023-07-24
tags: ["code", "art"]
---

I built a colour palette generator. It takes in a text prompt and outputs a six colour palette. To better visualize the colour palette in action, I use the colours to generate a <a href="/watercolour">watercolour</a>. If you like the palette, you can copy the hex codes. Try it out yourself, <a href="https://colour-palette.onrender.com/" target="_blank">here</a>.

{% image "../../public/img/barbie.png", "barbie", [], [300] %}
{% image "../../public/img/milk-tea.png", "milk-tea", [], [300] %}

<!-- {% image "../../public/img/colour-palette-demo.gif", "colour-palette-demo" %} -->

#### Technical details

Colour Palette is a React application written in Typescript, with an Express server. I'm feeding the prompt to an OpenAI model, _gpt-3.5-turbo_, for the colour palette generation. The watercolour code was written with P5.js.

#### Next steps

Short-term: Bugs 🐛 and polishing! If you've played around with it, you may have noticed some issues with the placeholder colours being repeated or not always updating. One common issue, the model doesn't always return six colours. It's interesting to see how varied the responses can be for the same prompt. I'll be adding more error handling and better prompting to alleviate as much of this as I can. I'm also curious to see how GPT-4 fairs over GPT-3.5 for this use case.

Long-term: It doesn't work _that_ well right now, especially if you're trying more abstract prompts. I'd like to fine-tune a model for this and see just how good an LLM can be with colours.

This has been a really fun project and I'm excited to see where else it can go. Stay tuned for more updates!

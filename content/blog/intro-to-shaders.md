---
title: intro to shaders
description: This is a post on my blog featuring shaders.
date: 2023-07-03
tags: ["art", "code", "shaders"]
---

I'm currently working through [The Book of Shaders](https://thebookofshaders.com/). Here are some demos playing with concepts I learned from the introductory chapters.

Let's just get a colour going. I'm aiming for Barbie™ pink, which according to [Encycolorpedia](https://encycolorpedia.com/e0218a) is comprised of 87.84% red, 12.94% green and 54.12% blue.

```
	gl_FragColor = vec4(0.8784,0.1294,0.5412,1.0);

```

<canvas class="glslCanvas" data-fragment="
#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;
void main() {
	gl_FragColor = vec4(0.8784,0.1294,0.5412,1.0);
}
" width="300" height="300"></canvas>

Playing around with time.

```
	gl_FragColor = vec4(abs(cos(u_time)),abs(sin(u_time)),abs(atan(u_time)),1.0);

```

<canvas class="glslCanvas" data-fragment="
#ifdef GL_ES
precision mediump float;
#endif
uniform float u_time;
void main() {
	gl_FragColor = vec4(abs(cos(u_time)),abs(sin(u_time)),abs(atan(u_time)),1.0);
}
" width="300" height="300"></canvas>

Playing around with the mouse position.

```
  vec2 mouse = gl_FragCoord.xy/u_mouse;
  gl_FragColor = vec4(mouse.x, mouse.y, 0.5, 1.0);
```

<canvas class="glslCanvas" data-fragment="
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec2 mouse = st/u_mouse;
  gl_FragColor = vec4(mouse.x, mouse.y, 0.5, 1.0);
}
" width="300" height="300"></canvas>

Playing around with mouse _and_ time.

```
  gl_FragColor = vec4(abs(cos(mouse.x)), abs(sin(u_time)), 0.5, 1.0);
```

<canvas class="glslCanvas" data-fragment="
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  vec2 mouse = gl_FragCoord.xy/u_mouse;
  gl_FragColor = vec4(abs(cos(mouse.x)), abs(sin(u_time)), 0.5, 1.0);
}
" width="300" height="300"></canvas>

Nolan had a nice demo for better understanding the canvas coordinates. This is using the [step](https://thebookofshaders.com/glossary/?search=step) interpolation to specify the edges.

```
  float green = step(0.7, st.x);
  float red = step(0.7, st.y);
  gl_FragColor = vec4(red, green, 0.5, 1.0);
```

<canvas class="glslCanvas" data-fragment="
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;  
  float red = step(0.7, st.y);
  float green = step(0.7, st.x); 
  gl_FragColor = vec4(red, green, 0.5, 1.0);
}
" width="300" height="300"></canvas>

This is using the [smoothstep](https://thebookofshaders.com/glossary/?search=smoothstep) function to specify lower and upper bounds for a smooooth transition.

```
  float red = smoothstep(0.65, 0.75, st.y);
  float green = smoothstep(0.65, 0.75, st.x);
  gl_FragColor = vec4(red, green, 0.5, 1.0);
```

<canvas class="glslCanvas" data-fragment="
#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;  
  float red = smoothstep(0.65, 0.75, st.y);
  float green = smoothstep(0.65, 0.75, st.x);
  gl_FragColor = vec4(red, green, 0.5, 1.0);
}
" width="300" height="300"></canvas>

<link type="text/css" rel="stylesheet" href="https://cdn.rawgit.com/patriciogonzalezvivo/glslGallery/gh-pages/build/glslGallery.css">
<script type="text/javascript" src="https://cdn.rawgit.com/patriciogonzalezvivo/glslGallery/gh-pages/build/glslGallery.js"></script>
<script type="text/javascript" src="https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/dist/GlslCanvas.js"></script>

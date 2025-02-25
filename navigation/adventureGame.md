---
layout: base
title: Adventure Game
permalink: /gamify/adventureGame
---

<div id="gameContainer">
    <div id="promptDropDown" class="promptDropDown" style="z-index: 9999"></div>
    <canvas id='gameCanvas'></canvas>
</div>


<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/adventureGame/GameControl.js';
    const path = "{{site.baseurl}}";
    new GameControl(path).start();
</script>

(function () {
  "use strict";

  const scenes = window.AGENT_SCENES;
  if (!Array.isArray(scenes) || scenes.length !== 12) {
    throw new Error("Expected exactly 12 local scenes.");
  }

  const $ = (id) => document.getElementById(id);
  const controls = {
    previous: $("previous"), play: $("play"), next: $("next"), replay: $("replay"),
    stop: $("stop"), scene: $("scene-select"), speed: $("speed"),
    captions: $("captions-toggle"), motion: $("motion-toggle"), contrast: $("contrast-toggle")
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let timer = null;
  let playing = false;
  let sceneButtons = [];

  function motionIsOff() {
    return controls.motion.checked || reducedMotion.matches;
  }

  function stopPlayback(message) {
    if (timer) window.clearTimeout(timer);
    timer = null;
    playing = false;
    controls.play.textContent = "▶ Play";
    controls.play.setAttribute("aria-label", "Play story");
    controls.play.setAttribute("aria-pressed", "false");
    if (message) $("playback-status").textContent = message;
  }

  function schedule() {
    if (!playing || motionIsOff()) return;
    const delay = 5200 * Number(controls.speed.value);
    timer = window.setTimeout(function () {
      if (index === scenes.length - 1) {
        stopPlayback();
        return;
      }
      show(index + 1, true);
      schedule();
    }, delay);
  }

  function show(nextIndex, announce) {
    index = Math.max(0, Math.min(scenes.length - 1, nextIndex));
    const scene = scenes[index];
    $("scene-position").textContent = `Scene ${index + 1} of ${scenes.length}`;
    $("scene-heading").textContent = scene.title;
    $("caption-text").textContent = scene.caption;
    $("scene-detail").textContent = scene.detail;
    $("security-note").textContent = scene.security;
    $("contract-label").textContent = scene.contract;
    $("terminal-status").textContent = scene.status;
    $("story-progress").value = index + 1;
    $("story-progress").textContent = `${index + 1} of ${scenes.length}`;
    controls.scene.value = String(index);
    controls.previous.disabled = index === 0;
    controls.next.disabled = index === scenes.length - 1;

    document.querySelectorAll(".node").forEach((node) => {
      node.classList.add("is-visible");
      node.classList.toggle("is-focus", scene.focus.includes(node.id.replace("node-", "")));
    });
    document.querySelectorAll(".edges path").forEach((edge) => {
      edge.classList.toggle("is-active", scene.edges.includes(edge.id.replace("edge-", "")));
    });
    sceneButtons.forEach((button, buttonIndex) => {
      if (buttonIndex === index) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    if (announce) {
      $("caption-region").setAttribute("aria-label", `Scene ${index + 1}: ${scene.title}. ${scene.caption}`);
    }
  }

  function togglePlay() {
    if (motionIsOff()) {
      stopPlayback("Automatic playback is unavailable while motion is disabled. Previous, Next, and the scene selector still work.");
      return;
    }
    if (playing) {
      stopPlayback();
    } else {
      if (index === scenes.length - 1) show(0, true);
      playing = true;
      controls.play.textContent = "❚❚ Pause";
      controls.play.setAttribute("aria-label", "Pause story");
      controls.play.setAttribute("aria-pressed", "true");
      schedule();
    }
  }

  function resetAndPlay() {
    stopPlayback();
    show(0, true);
    if (!motionIsOff()) togglePlay();
  }

  scenes.forEach((scene, sceneIndex) => {
    const option = document.createElement("option");
    option.value = String(sceneIndex);
    option.textContent = `${sceneIndex + 1}. ${scene.title}`;
    controls.scene.appendChild(option);

    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = scene.title;
    button.setAttribute("aria-label", `Go to scene ${sceneIndex + 1}: ${scene.title}`);
    button.addEventListener("click", () => {
      stopPlayback();
      show(sceneIndex, true);
    });
    item.appendChild(button);
    $("scene-list").appendChild(item);
    sceneButtons.push(button);
  });

  controls.previous.addEventListener("click", () => { stopPlayback(); show(index - 1, true); });
  controls.next.addEventListener("click", () => { stopPlayback(); show(index + 1, true); });
  controls.play.addEventListener("click", togglePlay);
  controls.replay.addEventListener("click", resetAndPlay);
  controls.stop.addEventListener("click", () => { stopPlayback(); show(0, true); });
  controls.scene.addEventListener("change", () => { stopPlayback(); show(Number(controls.scene.value), true); });
  controls.speed.addEventListener("change", () => {
    if (playing) {
      if (timer) window.clearTimeout(timer);
      schedule();
    }
  });
  controls.captions.addEventListener("change", () => {
    $("caption-region").hidden = !controls.captions.checked;
  });
  controls.motion.addEventListener("change", () => {
    document.body.classList.toggle("no-motion", controls.motion.checked);
    if (motionIsOff()) stopPlayback();
    controls.play.disabled = motionIsOff();
    controls.play.setAttribute("aria-disabled", String(motionIsOff()));
  });
  controls.contrast.addEventListener("change", () => {
    document.body.classList.toggle("high-contrast", controls.contrast.checked);
  });

  function updateMotionPreference() {
    document.body.classList.toggle("no-motion-system", reducedMotion.matches);
    if (reducedMotion.matches) stopPlayback();
    controls.play.disabled = motionIsOff();
    controls.play.setAttribute("aria-disabled", String(motionIsOff()));
  }
  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", updateMotionPreference);
  } else if (typeof reducedMotion.addListener === "function") {
    reducedMotion.addListener(updateMotionPreference);
  }

  document.addEventListener("keydown", (event) => {
    const interactive = event.target.closest("button, select, input, a");
    if (interactive) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      togglePlay();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      stopPlayback();
      show(index - 1, true);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      stopPlayback();
      show(index + 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      stopPlayback();
      show(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      stopPlayback();
      show(scenes.length - 1, true);
    } else if (event.key.toLowerCase() === "r") {
      event.preventDefault();
      resetAndPlay();
    } else if (event.key === "Escape") {
      event.preventDefault();
      stopPlayback();
      show(0, true);
    } else if (/^[1-9]$/.test(event.key)) {
      stopPlayback();
      show(Number(event.key) - 1, true);
    } else if (event.key === "0") {
      stopPlayback();
      show(9, true);
    }
  });

  updateMotionPreference();
  show(0, false);
}());

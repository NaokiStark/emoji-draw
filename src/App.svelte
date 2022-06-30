<script>
  import Toolbar from "./toolbar/toolbar.svelte";
  import SavedThings from "./components/saved_things.svelte";
  import ImageFrame from "./components/image_frame.svelte";
  import { _, _lang } from "./lang.js";

  let lang = "en";

  let userLang = navigator.language ?? "en";

  if (userLang.split("-")[0] in _lang) {
    lang = userLang.split("-")[0];
  } else {
    lang = "en";
  }

  let canvas;
  let grid_size = [3, 3];
  let grid_sizes = [[3], [6], [9], [12], [16], [24], [48]];
  let user_select = "none";

  let pallete = {
    square_red: "🟥",
    square_orange: "🟧",
    square_yellow: "🟨",
    square_green: "🟩",
    square_blue: "🟦",
    square_purple: "🟪",
    square_brown: "🟫",
    square_black: "⬛",
    square_white: "⬜",

    circle_red: "🔴",
    circle_orange: "🟠",
    circle_yellow: "🟡",
    circle_green: "🟢",
    circle_blue: "🔵",
    circle_purple: "🟣",
    circle_brown: "🟤",
    circle_black: "⚫",
    circle_white: "⚪",
  };

  let clicked = false;
  let actual_bg_color = pallete["square_white"];
  let actual_picked_color = pallete["square_black"];

  let display_save_panel = false;

  let editing_title = "";

  let grid_canvas = [];
  changeCanvasSize(grid_size);
  let canvas_render_size = 3; //em

  let show_pic_frame = false;

  function changeCanvasSize(size) {
    let tmpcanvas = [];

    if (size.length < 2) {
      for (let x = 0; x < size[0]; x++) {
        let row = [];
        for (let y = 0; y < size[0]; y++) {
          row.push(actual_bg_color);
        }
        tmpcanvas.push(row);
      }
    } else {
      for (let x = 0; x < size[0]; x++) {
        let row = [];
        for (let y = 0; y < size[1]; y++) {
          row.push(actual_bg_color);
        }
        tmpcanvas.push(row);
      }
    }
    grid_canvas = tmpcanvas;
  }

  function copy_to_clipboard() {
    user_select = "initial";
    setTimeout(function () {
      var r = document.createRange();
      r.selectNode(document.getElementById("canvas"));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      try {
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        alert(_("copied", lang));
      } catch (err) {
        console.log("Unable to copy!");
      }
      setTimeout((x) => (user_select = "none"), 500);
    }, 500);

    //user_select = "none";
  }

  function shareOnTwitter() {
    let url = "https://twitter.com/intent/tweet?text=";
    let text = canvas.innerText + "\n" + "https://emoji-draw.vercel.app";

    window.open(url + encodeURIComponent(text));
  }
</script>

<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  />
</head>

<h1>
  {_("site_title", lang)}
  <small style="font-size: .5em;">
    <a href="https://github.com/NaokiStark/emoji-draw" target="_blank">
      GitHub
    </a>
    {editing_title}
  </small>
</h1>

<Toolbar
  {grid_size}
  {pallete}
  {grid_sizes}
  {actual_bg_color}
  {canvas_render_size}
  {actual_picked_color}
  {lang}
  {_}
  on:size_change={(e) => {
    grid_size = e.detail;
    changeCanvasSize(e.detail);
  }}
  on:render_size={(e) => (canvas_render_size = e.detail)}
  on:bg_change={(e) => {
    actual_bg_color = e.detail;
    changeCanvasSize(grid_size);
    console.log(e.detail);
  }}
  on:change_color={(e) => (actual_picked_color = e.detail)}
  on:copy_clipboard={(e) => copy_to_clipboard()}
  on:toggle_save_menu={(e) => (display_save_panel = !display_save_panel)}
  on:tweet={shareOnTwitter}
/>

<div class="d-flex flex-row flex-wrap justify-content-center">
  <div
    id="canvas"
    class="emoji-container mx-3"
    style="font-size:{canvas_render_size}em;user-select: {user_select};"
    bind:this={canvas}
  >
    {#each grid_canvas as row, i}
      {#each row as pixel, e}
        <span
          class="cursor-crosshair"
          on:mousedown={() => {
            grid_canvas[i][e] = actual_picked_color;
            clicked = true;
            console.log("mousedown", clicked);
          }}
          on:touchstart={() => {
            grid_canvas[i][e] = actual_picked_color;
            clicked = true;
            console.log("touchstart", clicked);
          }}
          on:mouseup={() => {
            clicked = false;
            console.log("mouseup", clicked);
          }}
          on:mouseenter={() => {
            console.log("mouseenter", clicked);
            if (clicked) {
              grid_canvas[i][e] = actual_picked_color;
              console.log("i, e", i, e);
            }
          }}
          on:touchmove={() => {
            console.log("touchmove", clicked);
            if (clicked) {
              grid_canvas[i][e] = actual_picked_color;
              console.log("i, e", i, e);
            }
          }}
        >
          {pixel}
        </span>
      {/each}
      <br alt="&NewLine;" />
    {/each}
  </div>
  {#if show_pic_frame}
    <ImageFrame {lang} {_} />
  {/if}
</div>

<SavedThings
  {lang}
  {_}
  {display_save_panel}
  {grid_canvas}
  {canvas_render_size}
  on:save-close={() => {
    display_save_panel = !display_save_panel;
  }}
  on:load_work={(e) => {
    grid_canvas = e.detail.grid;
    editing_title = `| ${_("editing", lang)} ${e.detail.name}`;
    canvas_render_size = e.detail.canvas_render_size;
  }}
/>

<style>
  .emoji-container {
    overflow: auto;
    text-align: center;
  }
  .emoji-container span {
    padding: 0;
    margin: 0;
  }
  .cursor-crosshair {
    cursor: crosshair;
  }
</style>

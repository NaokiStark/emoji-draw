<script>
    import ColorPicker from "./color_picker.svelte";
    import ColorReset from "./color_reset.svelte";
    import CanvasSize from "./canvas_size.svelte";
    import { createEventDispatcher } from "svelte/internal";

    let ev = createEventDispatcher();

    export let grid_size;
    export let pallete;
    export let grid_sizes;
    export let actual_bg_color;
    export let canvas_render_size;
    export let actual_picked_color;
    export let lang;
    export let _;

    let some_controls_visible = true;
</script>

<div class="toolbar d-flex">
    {#if some_controls_visible}
        <CanvasSize
            {grid_size}
            {pallete}
            {grid_sizes}
            {actual_bg_color}
            {canvas_render_size}
            {lang}
            {_}
            on:size_change={(e) => ev("size_change", e.detail)}
            on:render_size={(e) => ev("render_size", e.detail)}
        />
        <ColorReset
            {grid_size}
            {pallete}
            {grid_sizes}
            {actual_bg_color}
            {lang}
            {_}
            on:bg_change={(e) => ev("bg_change", e.detail)}
        />
    {/if}
    <ColorPicker
        {grid_size}
        {pallete}
        {grid_sizes}
        {actual_bg_color}
        {actual_picked_color}
        {lang}
        {_}
        on:change_color={(e) => ev("change_color", e.detail)}
        on:copy_clipboard={(e) => ev("copy_clipboard")}
    />
    <div class="toolbar-item">
        <button
            type="button"
            class="btn btn-success btn-sm hide-some-controls"
            on:click={() => (some_controls_visible = !some_controls_visible)}
        >
            {#if some_controls_visible}
                {_("hide_some_controls", lang)}
            {:else}
                {_("show_some_controls", lang)}
            {/if}
        </button>
    </div>
    <div class="toolbar-item">
        <button
            type="button"
            class="btn btn-success btn-sm"
            on:click={(x) => ev("toggle_save_menu")}
        >
            {_("open_save_button", lang)}
        </button>
    </div>
    <div class="toolbar-item">
        <button
            type="button"
            class="btn btn-primary btn-sm"
            on:click={() => ev("tweet")}
        >
            {_("twitter", lang)}
        </button>
    </div>
</div>

<style>
    .toolbar {
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        align-items: center;
        background: #f0f0f0;
        border: solid 1px #cdcdcd;
    }
    :global(.toolbar-item) {
        margin-left: 0.5em;
        padding: 0.5em;
    }
</style>

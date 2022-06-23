<script>
    export let grid_size;
    export let pallete;
    export let grid_sizes;
    export let actual_bg_color;
    export let actual_picked_color;
    export let lang;
    export let _;

    import { createEventDispatcher } from "svelte/internal";

    let ev = createEventDispatcher();

    function change_color(colr) {
        ev("change_color", colr);
    }
</script>

<div class="toolbar-item">
    <div class="color-picker d-flex">
        {#each Object.keys(pallete) as color}
            {#if pallete[color] == actual_picked_color}
                <span class="selected" title={_(color, lang)}
                    >{pallete[color]}</span
                >
            {:else}
                <span
                    title={_(color, lang)}
                    on:click={() => change_color(pallete[color])}
                >
                    {pallete[color]}
                </span>
            {/if}
        {/each}
    </div>
</div>
<div class="toolbar-item">
    <button
        type="button"
        class="btn btn-primary btn-sm"
        on:click={(e) => ev("copy_clipboard")}
    >
        {_("copy_clipboard", lang)}
    </button>
</div>

<style>
    .color-picker {
        max-width: 19em;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .color-picker .selected {
        border: solid 1px #000;
        border-radius: 3px;
    }
    .color-picker span {
        cursor: pointer;
        font-size: 1.5em;
    }
</style>

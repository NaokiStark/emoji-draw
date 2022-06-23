<script>
    export let grid_size;
    export let pallete;
    export let grid_sizes;
    export let actual_bg_color;
    export let lang;
    export let _;

    import { createEventDispatcher } from "svelte/internal";

    let ev = createEventDispatcher();
</script>

<div class="toolbar-item">
    {_("reset", lang)}
    <select
        id=""
        bind:value={actual_bg_color}
        class="form-select form-select-sm"
    >
        {#each Object.keys(pallete) as color}
            <option value={pallete[color]}>{_(color, lang)}</option>
        {/each}
    </select>

    <button
        type="button"
        class="btn btn-danger btn-sm"
        on:click={() => {
            ev("bg_change", actual_bg_color);
        }}
    >
        {_("clear_canvas", lang)}
    </button>
</div>

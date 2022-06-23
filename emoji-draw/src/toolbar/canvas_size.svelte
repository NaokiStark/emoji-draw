<script>
    export let grid_size;
    export let pallete;
    export let grid_sizes;
    export let actual_bg_color;
    export let canvas_render_size;
    export let lang;
    export let _;

    let custom_size_enabled = false;
    import { createEventDispatcher } from "svelte/internal";
    import { slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    let ev = createEventDispatcher();
</script>

<div class="toolbar-item">
    {_("size", lang)}
    <select
        id=""
        bind:value={grid_size}
        on:change={() => ev("size_change", grid_size)}
        class="form-select form-select-sm"
    >
        {#each grid_sizes as size}
            {#if size.length < 2}
                <option value={size}>{size[0]}x{size[0]}</option>
            {:else}
                <option value={size}>{size[1]}x{size[0]}</option>
            {/if}
        {/each}
    </select>
    <label for="custom_size">{_("custom_size", lang)}</label>
    <input
        type="checkbox"
        name="custom_size"
        id="custom_size"
        on:change={function (e) {
            custom_size_enabled = this.checked;
        }}
    />
    {#if custom_size_enabled}
        <span transition:slide={{ duration: 200, easing: quintOut }}>
            <input
                type="number"
                bind:value={grid_size[1]}
                on:change={() => ev("size_change", grid_size)}
                class="form-control form-control-sm"
            />x
            <input
                type="number"
                bind:value={grid_size[0]}
                on:change={() => ev("size_change", grid_size)}
                class="form-control form-control-sm"
            />
        </span>
    {/if}
</div>

<div class="toolbar-item">
    {_("show", lang)}
    <input
        type="range"
        min="0.5"
        max="5"
        class="slider form-range"
        step="0.5"
        bind:value={canvas_render_size}
        on:change={() => ev("render_size", canvas_render_size)}
    />
</div>

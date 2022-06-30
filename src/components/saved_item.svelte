<script>
    export let lang;
    export let _;
    export let work;
    export let id;

    import { twiemoji } from "../twemoji";
    import { createEventDispatcher } from "svelte/internal";

    let ev = createEventDispatcher();
</script>

<div class="saved-item card m-1">
    <button
        type="button"
        class="del_btn btn btn-danger"
        on:click={() => ev("save-delete")}
    >
        X
    </button>
    <div class="saved-name text-center">
        <h4>{work.name}</h4>
    </div>
    <br />
    <div
        use:twiemoji
        class="saved-content text-center"
        on:click={() => ev("load_work", id)}
    >
        {#each work.grid as row, i}
            {#if i < 10}
                {#each row as pixel, e}
                    {#if e < 10}
                        <span class="saved-pixel">{pixel}</span>
                    {/if}
                {/each}
                <br />
            {/if}
        {/each}
    </div>
    <br />
    <small class="text-muted text-center">
        <i>{_("saved_at", lang)} {work.saved_at}</i>
    </small>
</div>

<style>
    .saved-item {
        width: 100%;
        min-height: 4em;
        cursor: pointer;
        line-height: 1em;
        letter-spacing: 0.01em;
    }
    .saved-pixel {
        font-size: 1em;
    }
    .del_btn {
        position: absolute;
        right: 0;
    }
    :global(img.emoji) {
        height: 1em;
        width: 1em;
        margin: 0 0.05em 0 0.1em;
        vertical-align: -0.1em;
    }
</style>

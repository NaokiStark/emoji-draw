<script>
    export let lang;
    export let _;
    export let display_save_panel;
    export let grid_canvas;
    export let canvas_render_size;

    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte/internal";
    import SavedItem from "./saved_item.svelte";
    import {
        get_works,
        save_work,
        delete_work,
    } from "../local_storage_handler";

    let ev = createEventDispatcher();
    let works = get_works();
    import { beforeUpdate } from "svelte";

    beforeUpdate(() => {
        if (!display_save_panel) {
            works = get_works();
        }
    });

    let name;

    function save_new_item() {
        if (grid_canvas.length > 100 || grid_canvas[0].length > 100) {
            alert(_("grid_size_cannot_save", lang));
            return;
        }

        if (name == null || name.length < 1) {
            alert(_("name_cannot_be_blank", lang));
            return;
        }

        save_work({
            name: name,
            grid: grid_canvas,
            canvas_render_size: canvas_render_size,
        });

        alert(_("grid_saved", lang));
        name = "";
        works = get_works();
    }

    function delete_saved(id) {
        delete_work(id);
        name = "";
        works = get_works();
    }
</script>

{#if display_save_panel}
    <div class="saved" transition:fly={{ x: 0, duration: 300 }}>
        <button
            type="button"
            class="close_btn btn btn-warning"
            on:click={() => ev("save-close")}
        >
            X
        </button>
        <div class="d-flex flex-column p-1">
            <div class="text-center">
                <h3>
                    {_("saved_work", lang)}
                </h3>
                <p>{@html _("save_warning_advice", lang)}</p>
            </div>
            <div>
                <br />
                <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder={_("input_save_name", lang)}
                    bind:value={name}
                />
                <br />
                <button
                    type="button"
                    class="btn btn-success"
                    on:click={save_new_item}
                >
                    {_("save_button", lang)}
                </button>
            </div>
            <br />
            <div class="saved-work">
                <h4>{_("saved_work_title", lang)}</h4>
                <div
                    class="saved-work-container d-flex flex-row justify-content-center align-items-center"
                >
                    {#if works.length > 0}
                        {#each works as work, id}
                            <SavedItem
                                {_}
                                {lang}
                                {work}
                                {id}
                                on:load_work={(e) => {
                                    ev("load_work", work);

                                    ev("save-close");
                                }}
                                on:save-delete={(e) => {
                                    delete_saved(id);
                                }}
                            />
                        {/each}
                    {:else}
                        <small class="text-muted">
                            {_("empty_list", lang)}
                        </small>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    .saved {
        width: 20vw;
        height: 100%;
        background-color: #f0f0f0;
        position: fixed;
        top: 0;
    }
    .close_btn {
        position: absolute;
        right: 0;
    }
    .saved {
        overflow: auto;
    }
    .saved-work-container {
        flex-wrap: wrap;
    }
    @media (max-width: 1000px) {
        .saved {
            width: 100%;
            height: 100%;
            background-color: #f0f0f0;
            position: fixed;
            top: 0;
        }
    }
</style>

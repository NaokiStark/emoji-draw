<script>
    export let lang;
    export let _;

    let width = 100;
</script>

<div class="f-main mx-3">
    <div class="image-container">
        <img
            src="https://i.pinimg.com/originals/dd/12/11/dd1211855488b1da03116481b79c1e25.gif"
            alt=""
            class="image-frame"
            style="width:{width}%"
        />
    </div>

    <div class="frame-controls flex-row flex-wrap justify-content-center">
        <div>
            {_("size", lang)}
            <input
                type="range"
                min="1"
                max="1000"
                class="slider form-range"
                step="1"
                bind:value={width}
            />
        </div>
        <div>
            <button type="button" class="btn btn-primary btn-sm"
                >{_("open_pic", lang)}</button
            >
        </div>
    </div>
</div>

<style>
    .image-container {
        image-rendering: pixelated;
        width: 400px;
        height: 400px;
        overflow: auto;
    }
</style>

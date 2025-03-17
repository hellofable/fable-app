<script>
    let isPlaying = false;
    const audio = new Audio("https://ice1.somafm.com/groovesalad-128-mp3");

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
        }
    }
</script>

<div class="player">
    <button class="btn btn-secondary" on:click={togglePlay}
        >{isPlaying ? "Pause" : "Play"}</button
    >
</div>

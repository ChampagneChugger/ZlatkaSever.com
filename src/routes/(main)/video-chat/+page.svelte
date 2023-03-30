<script lang="ts">
	import type { PageData } from "./$types"
	import VideoHeader from "$lib/components/videoheader.svelte"

	export let data: PageData

	$: videosesije = data.videosesije
</script>

<VideoHeader />

<div class="video">
	{#if videosesije.length > 0}
		<h1>
			Trenutno imate {videosesije.length}
			{videosesije.length == 1 ? "video poziv." : "video poziva."}
		</h1>
		<div class="sesije">
			{#each videosesije as { url }}
				<a href="/video-chat/{url}">
					<h3>Pridruži se video pozivu</h3>
				</a>
			{/each}
		</div>
	{:else}
		<div class="nema">
			<iconify-icon icon="material-symbols:question-mark" />
			<h2>Nemate aktivnih video poziva.</h2>
		</div>
	{/if}
</div>

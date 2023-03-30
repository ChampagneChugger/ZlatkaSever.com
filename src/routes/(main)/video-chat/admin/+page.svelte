<script lang="ts">
	import type { PageData } from "./$types"
	import VideoHeader from "$lib/components/videoheader.svelte"

	export let data: PageData

	$: videosesije = data.videosesije
</script>

<VideoHeader title={"Sve aktivne video sesije"} />

<div class="video">
	{#if videosesije.length > 0}
		<h1>
			Broj aktivnih poziva: {videosesije.length}
		</h1>
		<div class="sesije">
			{#each videosesije as { url, User }}
				<a href="/video-chat/{url}">
					<h3>Pridruži se video pozivu<br />{User.name}</h3>
				</a>
			{/each}
		</div>
	{:else}
		<div class="nema">
			<iconify-icon icon="material-symbols:question-mark" />
			<h2>Ne postoji ni jedan aktivan poziv.</h2>
		</div>
	{/if}
	<div class="kreirajsesiju">
		<a href="/video-chat/admin/create">Kreiraj novu video sesiju</a>
	</div>
</div>

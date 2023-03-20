<script lang="ts">
	import type { PageData } from "./$types"
	import Blogheader from "$lib/components/blogheader.svelte"
	import Blogitem from "$lib/components/parts/blogitem.svelte"

	export let data: PageData

	$: blogposts = data.blog
</script>

<Blogheader />

<div class="blog">
	{#if blogposts}
		{#each blogposts as { title, coverImage, User, slug, likes, id }}
			<Blogitem {title} {coverImage} {User} {slug} {likes} {id} />
		{/each}
	{:else}
		<div class="noblog">
			<iconify-icon icon="material-symbols:question-mark" />
			<p>Ne postoji ni jedna objava.</p>
		</div>
	{/if}
</div>

<script lang="ts">
	import type { PageData } from "./$types"
	import Blogheader from "$lib/components/blogheader.svelte"
	import Blogitem from "$lib/components/parts/blogitem.svelte"
	import { goto } from "$app/navigation"

	export let data: PageData

	let loggedin: boolean

	$: blogposts = data.blog

	if (data.user) {
		loggedin = true
	}
</script>

<Blogheader />

<div class="blog">
	{#if blogposts}
		{#each blogposts as { title, coverImage, User, slug, likes, id, PostLikes, views }}
			<Blogitem {title} {coverImage} {User} {slug} {likes} {id} {loggedin} {PostLikes} {views} />
		{/each}
		<div class="pagination">
			{#if data.postcount > 4}
				<div class="next">
					<button
						on:click={() => {
							goto("/blog/2")
						}}><iconify-icon icon="material-symbols:keyboard-arrow-right" /></button
					>
				</div>
			{/if}
		</div>
	{:else}
		<div class="noblog">
			<iconify-icon icon="material-symbols:question-mark" />
			<p>Ne postoji ni jedna objava.</p>
		</div>
	{/if}
</div>

<script lang="ts">
	import type { PageData } from "./$types"
	import Blogheader from "$lib/components/blogheader.svelte"
	import Blogitem from "$lib/components/parts/blogitem.svelte"
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"

	export let data: PageData

	let loggedin: boolean

	$: blogposts = data.blog

	if (data.user) {
		loggedin = true
	}

	$: pagenumber = $page.params.slug
</script>

<Blogheader />

<div class="blog">
	{#each blogposts as { title, coverImage, User, slug, likes, id, PostLikes, views }}
		<Blogitem {title} {coverImage} {User} {slug} {likes} {id} {loggedin} {PostLikes} {views} />
	{/each}
	<div class="pagination">
		<div class="prev">
			<button
				on:click={() => {
					if (Number(pagenumber) == 2) {
						goto("/blog")
					} else {
						goto("/blog/" + (Number(pagenumber) - 1))
					}
				}}><iconify-icon icon="material-symbols:keyboard-arrow-left" /></button
			>
		</div>
		{#if data.postcount > 4 * Number(pagenumber)}
			<div class="next">
				<button
					on:click={() => {
						goto("/blog/" + (Number(pagenumber) + 1))
					}}><iconify-icon icon="material-symbols:keyboard-arrow-right" /></button
				>
			</div>
		{/if}
	</div>
</div>

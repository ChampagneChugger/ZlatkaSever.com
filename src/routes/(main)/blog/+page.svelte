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

	$: role = data.admin?.role
</script>

<svelte:head>
	<title>Zlatka Sever - Blog</title>
</svelte:head>

<Blogheader />

<div class="blog">
	{#if blogposts.length > 0}
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
		{#if role == 1}
			<a class="createa" href="/blog/create">Kreiraj objavu</a>
		{/if}
	{:else}
		<div class="noblog">
			<iconify-icon icon="material-symbols:question-mark" />
			<p>Ne postoji ni jedna objava.</p>
			{#if role == 1}
				<a class="createa" href="/blog/create">Kreiraj objavu</a>
			{/if}
		</div>
	{/if}
</div>

<script lang="ts">
	import type { PageData } from "./$types"
	import Blogheader from "$lib/components/blogheader.svelte"
	import Blogitem from "$lib/components/parts/blogitem.svelte"
	import PageHeader from "$lib/components/pageheader.svelte"
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"

	export let data: PageData

	let loggedin: boolean

	$: blogposts = data.blog
	$: postcount = data.postcount

	$: if (data.user) {
		loggedin = true
	}

	$: pagenumber = $page.params.slug

	// Post

	$: postcontent = data.post

	let vlasnik: boolean = false

	$: if (postcontent?.userId == data.user?.userID) {
		vlasnik = true
	}

	$: role = data.admin?.role
</script>

<svelte:head>
	<title>Zlatka Sever - {postcontent?.title}</title>
</svelte:head>

{#if Number(pagenumber) && blogposts && postcount}
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
			{#if postcount > 4 * Number(pagenumber)}
				<div class="next">
					<button
						on:click={() => {
							goto("/blog/" + (Number(pagenumber) + 1))
						}}><iconify-icon icon="material-symbols:keyboard-arrow-right" /></button
					>
				</div>
			{/if}
		</div>
		{#if role == 1}
			<a href="/blog/create" class="createa">Kreiraj objavu</a>
		{/if}
	</div>
{:else if postcontent}
	<div class="page">
		<PageHeader
			{vlasnik}
			{loggedin}
			PostLikes={postcontent.PostLikes}
			naslov={postcontent.title}
			korisnik={postcontent.User.username}
			ime={postcontent.User.name}
			likes={postcontent.likes}
			id={postcontent.id}
		/>
		<div class="pagecontent">
			<iconify-icon icon="ic:baseline-format-quote" />
			{@html postcontent.content}
		</div>
	</div>
{:else}
	<div class="noblog">
		<iconify-icon icon="material-symbols:question-mark" />
		<p>Ne postoji ni jedna objava.</p>
		{#if role == 1}
			<a href="/blog/create" class="createa">Kreiraj objavu</a>
		{/if}
	</div>
{/if}

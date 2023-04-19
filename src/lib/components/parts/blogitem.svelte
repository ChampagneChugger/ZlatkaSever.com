<script lang="ts">
	import { enhance } from "$app/forms"
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	export let coverImage: string
	export let title: string
	export let likes: bigint
	export let views: bigint

	interface userObject {
		username: string
		name: string
	}

	export let User: userObject
	export let slug: string
	export let id: number

	export let loggedin: boolean = false

	export let PostLikes: object

	let heart: string = ""

	$: if (Object.keys(PostLikes).length > 0) {
		heart = "liked"
	} else {
		heart = ""
	}

	let copied: boolean

	$: if (copied) {
		setTimeout(() => {
			copied = false
		}, 2000)
	}

	$: url = $page.url.href
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={() => {
		goto("/blog/" + slug)
	}}
	class="blogitem"
>
	<div class="views">
		<iconify-icon icon="ic:round-remove-red-eye" />
		<span>{views}</span>
	</div>
	<img src={coverImage} alt={title} />
	<h1>{title}</h1>
	<p>
		By <button
			class="pbutton"
			on:click|stopPropagation={() => {
				goto("/profile/" + User.username)
			}}>{User.name}</button
		>
	</p>
	<div class="blogitemactions">
		<div class="like">
			{#if loggedin}
				<form
					use:enhance={() => {
						return async ({ update }) => {
							update({ reset: false })
						}
					}}
					method="POST"
				>
					<button on:click|stopPropagation={() => {}} formaction="?/like">
						<iconify-icon icon="mdi:cards-heart" class={heart} />
					</button>
					<input name="blogpostid" type="text" value={id} hidden />
					<span>{likes}</span>
				</form>
				<button
					on:click|stopPropagation={() => {
						navigator.share({
							title: title,
							text: "Blog post",
							url: "https://zlatkasever.com/blog/" + slug
						})
						copied = true
					}}
					class="blogspan"
				>
					{#if copied}
						<div class="copied">
							<iconify-icon icon="ic:baseline-check" />
							<p>Copied!</p>
						</div>
					{/if}
					<iconify-icon icon="mdi:share" class="share" />
					<p>Share</p>
				</button>
			{:else}
				<span>{likes} {likes == BigInt(1) ? "like" : "likes"}</span>
				<button
					on:click|stopPropagation={() => {
						navigator.clipboard.writeText(url + "/" + slug)
						copied = true
					}}
					class="blogspan"
				>
					{#if copied}
						<div class="copied">
							<iconify-icon icon="ic:baseline-check" />
							<p>Copied!</p>
						</div>
					{/if}
					<iconify-icon icon="mdi:share" class="share" />
					<p>Share</p>
				</button>
			{/if}
		</div>
	</div>
</div>

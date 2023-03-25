<script lang="ts">
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"
	import { enhance } from "$app/forms"
	export let naslov: string
	export let korisnik: string
	export let ime: string
	export let vlasnik: boolean
	export let likes: bigint
	export let loggedin: boolean
	export let id: number

	$: url = $page.url.href

	export let PostLikes: object

	let heart: string = ""

	$: if (PostLikes && Object.keys(PostLikes).length > 0) {
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
</script>

<div class="pageheader">
	<h1>{naslov}</h1>
	<span>
		<p>Napisao:</p>
		<a href="/profile/{korisnik}">{ime}</a>
		{#if vlasnik}
			<button
				on:click={() => {
					goto($page.params.slug + "/edit")
				}}>Uredi</button
			>
		{/if}
		{#if loggedin}
			<div class="loggedinactions">
				<div class="likeaction">
					<form
						use:enhance={() => {
							return async ({ update }) => {
								update({ reset: false })
							}
						}}
						method="POST"
					>
						<button class="noclassb" on:click|stopPropagation={() => {}} formaction="?/like">
							<iconify-icon icon="mdi:cards-heart" class={heart} />
						</button>
						<input name="blogpostid" type="text" value={id} hidden />
					</form>
					<p>{likes}</p>
				</div>
				<button
					on:click|stopPropagation={() => {
						navigator.clipboard.writeText(url)
						copied = true
					}}
					class="blogspan noclassb"
				>
					{#if copied}
						<div class="copied copied2">
							<iconify-icon icon="ic:baseline-check" />
							<p>Copied!</p>
						</div>
					{/if}
					<iconify-icon icon="mdi:share" class="share share2" />
					<p>Share</p>
				</button>
			</div>
		{:else if likes}
			<p class="loggedoutlikes">{likes} {likes == BigInt(1) ? "like" : "likes"}</p>
		{/if}
	</span>
</div>

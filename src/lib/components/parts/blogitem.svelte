<script lang="ts">
	import { enhance } from "$app/forms"
	import { goto } from "$app/navigation"
	export let coverImage: string
	export let title: string
	export let likes: number

	interface userObject {
		username: string
		name: string
	}

	export let User: userObject
	export let slug: string
	export let id: number
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={() => {
		goto("/blog/" + slug)
	}}
	class="blogitem"
>
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
			<form
				use:enhance={() => {
					return async ({ update }) => {
						update({ reset: false })
					}
				}}
				method="POST"
			>
				<button on:click|stopPropagation={() => {}} formaction="?/like">
					<iconify-icon icon="mdi:cards-heart" />
				</button>
				<input name="blogpostid" type="text" value={id} hidden />
			</form>
			<span>{likes}</span>
		</div>
	</div>
</div>

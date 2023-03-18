<script lang="ts">
	import { goto } from "$app/navigation"
	import Profileheader from "$lib/components/profileheader.svelte"
	import type { PageData } from "./$types"

	export let data: PageData

	$: profile = data.profile
</script>

<div class="profile">
	<Profileheader />
	<div class="profilecontent">
		<a class="pa" href={profile.profile_picture}>
			<!-- svelte-ignore a11y-img-redundant-alt -->
			<img src={profile.profile_picture} alt="Profile picture" />
		</a>
		<h1>
			{profile.name}
			{#if profile.role == 1}
				<iconify-icon icon="material-symbols:star" />
			{/if}
		</h1>
		<a class="ptag" href="/profile/{profile.username}">@{profile.username}</a>
		<div class="aboutprofile">
			<h3>O meni</h3>
			<p>
				{#if profile.about == null || profile.about == ""}
					Korisnik nije nadopunio svoj profil.
				{:else}
					<p>{profile.about}</p>
				{/if}
			</p>
		</div>
		{#if data.user?.username == profile.username}
			<div class="profileoptions">
				<button
					on:click={() => {
						goto("/profile/" + profile.username + "/edit")
					}}>Uredi profil</button
				>
				<form method="POST" action="/logout">
					<button type="submit">Odjava</button>
				</form>
			</div>
		{/if}
	</div>
</div>

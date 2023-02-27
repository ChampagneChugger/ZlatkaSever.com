<script lang="ts">
	import { goto } from "$app/navigation"

	let showpassword: boolean = false
	let showpasswordtype: string = "password"

	$: if (showpassword) {
		showpasswordtype = "text"
	} else {
		showpasswordtype = "password"
	}

	import type { PageData } from "../../routes/(main)/./$types"

	export let data: PageData
</script>

<div class="konzultacije">
	<div class="kh">
		<div class="krugh" />
		<h1>Termin za konzultacije</h1>
	</div>
	<div class="tkontakt">
		<div class="kslika">
			<div class="kslikaframe" />
			<img src="ja.jpg" alt="Ja" />
		</div>
		<div class="forma">
			<h3>Pomoći ću ti da pronađeš sklad sebi</h3>
			{#if !data.user}
				<form action="/login?from=/" method="POST">
					<input required type="email" placeholder="Email adresa..." />
					<span
						><input required type={showpasswordtype} placeholder="Vaša lozinka..." />
						<button
							on:click|preventDefault={() => {
								showpassword = !showpassword
							}}><iconify-icon icon="ic:baseline-remove-red-eye" /></button
						></span
					>
					<button type="submit">Prijavi se</button>
					<p>Nemaš profil? <a href="/register">Registriraj se.</a></p>
				</form>
			{:else}
				<div class="bc">
					<button
						on:click={() => {
							goto("/profile/" + data.user?.username)
						}}>Posjeti svoj kutak</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>

<script lang="ts">
	import popup from "$lib/stores/popup"

	let showpassword: boolean = false
	let showpasswordtype: string = "password"

	$: if (showpassword) {
		showpasswordtype = "text"
	} else {
		showpasswordtype = "password"
	}

	export let err: string | null
</script>

<div class="popupc">
	<div class="popup">
		<div class="popborder" />
		<div class="kh">
			<div class="krugh" />
			<h1>Prijavite se</h1>
		</div>
		<form action="/login?from=/" method="POST">
			<input required name="email" type="email" maxlength="30" placeholder="Email adresa..." />
			<span
				><input name="lozinka" required type={showpasswordtype} placeholder="Vaša lozinka..." />
				<button
					on:click|preventDefault={() => {
						showpassword = !showpassword
					}}><iconify-icon icon="ic:baseline-remove-red-eye" /></button
				></span
			>
			{#if err != null}
				<p>{err}</p>
			{/if}
			<div class="popbuttons">
				<button type="submit">Prijavi se</button>
				<button
					on:click|preventDefault={() => {
						$popup = false
					}}>Odustani</button
				>
			</div>
			<p>Nemaš profil? <a href="/register">Registriraj se.</a></p>
		</form>
	</div>
</div>

<script lang="ts">
	import popup from "$lib/stores/popup"

	import type { PageData } from "../../routes/(main)/./$types"

	export let data: PageData
</script>

<div class="rad">
	<div class="kh">
		<div class="krugh" />
		<h1>S kim radim</h1>
	</div>
	<h2>Trebate posjetiti terapeuta ako...</h2>
	<table>
		<tr>
			<p>Zbunjen ili zaglavljen u nekom stanju</p>
		</tr>
		<tr>
			<p>Iscrpljen, izgubljen, manjak samopouzdanja i snage</p>
		</tr>
		<tr>
			<p>Želite bolje upoznati sebe</p>
		</tr>
		<tr>
			<p>Želite preuzeti odgovornost za vlastiti život</p>
		</tr>
		<tr>
			<p>Koče Vas unutarnje instalacije i kompleksi</p>
		</tr>
		<tr>
			<p>Kada je naizgled sve u redu, ali vi niste sretni</p>
		</tr>
		<tr>
			<p>Samo želite znati više</p>
		</tr>
	</table>
	{#if !data.user}
		<h2 class="prijaviseh2">Ako ste ovo Vi, prijavite se</h2>
		<button
			on:click={() => {
				$popup = true
			}}>Prijavi se</button
		>
	{/if}
</div>

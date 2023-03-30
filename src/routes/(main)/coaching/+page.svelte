<script lang="ts">
	import Citem from "$lib/components/parts/citem.svelte"
	import Recenzije from "$lib/components/recenzije.svelte"
</script>

<div class="coaching">
	<div class="coachingc">
		<img src="ja.jpg" alt="Zlatka Sever" />
		<h1>Ovdje ide neki nasloni tekst</h1>
	</div>
	<div class="coachingitems">
		<Citem icon="ic:baseline-people-alt" title="Neki naslov" text="Neki tekst" />
		<Citem icon="mdi:puzzle" title="Neki naslov" text="Neki tekst" />
		<Citem icon="material-symbols:star" title="Neki naslov" text="Neki tekst" />
	</div>
	<div class="coachingr">
		<h1>Što klijenti kažu o meni?</h1>
		<Recenzije />
	</div>
</div>

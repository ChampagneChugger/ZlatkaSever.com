<script lang="ts">
	import Citem from "$lib/components/parts/citem.svelte"
	import Recenzije from "$lib/components/recenzije.svelte"
</script>

<div class="coaching">
	<div class="coachingc">
		<img src="ja.jpg" alt="Zlatka Sever" />
		<h1>Daj mi drugačiju percepciju</h1>
		<p>
			Većina ljudi koja dolazi na terapiju, nakon riješavanja problema zbog kojeg su došli, nastave
			s vremena na vrijeme doći na termin kada imaju situaciju u životu koja im predstavlja
			takozvani "zid" i trebaju drugačiju percepciju "zida". Često nam je neutralna percepcija
			zaklonjena i zamućena emocijama i konfliktnim mišljenjima u "glavi" i nismo sigurni u kojem
			smjeru krenuti. U tom trenutku dobro dođe "pogled iz drugog kuta" i neutralni promatrač koji
			će pomoći vidjeti "neutralnu sliku" i razvijetliti je.
		</p>
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

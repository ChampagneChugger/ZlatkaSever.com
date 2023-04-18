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
		<Citem
			icon="ph:plant-fill"
			title="Ima li život smisla?"
			text="Nema, kompletno postojanje samo po sebi je neutralno. Mi smo ti koji mu daju značenje i naš smisao života ovisi o nama."
		/>
		<Citem
			icon="material-symbols:star"
			title="Što je uspjeh?"
			text="Niti novac, niti veza, niti kuća, niti auto. Uspjeh je poznavati sebe, prihvaćati sebe i biti zadovoljan bez obzira na vanjske okolnosti."
		/>
		<Citem
			icon="game-icons:galaxy"
			title="Jesmo li sami u svemiru?"
			text="Mi smo mala točkica na rubu galaksije dobrovoljno došli u treću dimenziju. Činimo se nevažni, a opet, o nama ovisi kompletna ekspanzija svemira."
		/>
	</div>
	<div class="coachingr">
		<h1>Što klijenti kažu o meni?</h1>
		<Recenzije />
	</div>
</div>

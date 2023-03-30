<script lang="ts">
	export let icon: string
	export let title: string
	export let text: string
</script>

<div class="citem">
	<iconify-icon {icon} />
	<h2>{title}</h2>
	<p>{text}</p>
</div>

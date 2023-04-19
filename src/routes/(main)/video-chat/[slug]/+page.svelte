<script lang="ts">
	import type { PageData } from "./$types"
	import { page } from "$app/stores"
	//@ts-ignore
	import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt/rtc-js-prebuilt"
	import { onMount } from "svelte"

	let slug = $page.params.slug

	export let data: PageData

	onMount(() => {
		if (data.role == 0) {
			const config = {
				name: data.user?.username,
				meetingId: slug,
				apiKey: "539e389f-a3d0-4e6f-afbf-a4c0bf4f2dbd",
				containerId: "poziv",
				micEnabled: true,
				webcamEnabled: true,
				participantCanToggleSelfWebcam: true,
				participantCanToggleSelfMic: true,
				chatEnabled: true,
				screenShareEnabled: false,
				theme: "DARK",
				permissions: {
					askToJoin: false
				},
				redirectOnLeave: "https://zlatkasever.com/video-chat/"
			}

			meeting.init(config)
		} else {
			const config = {
				name: data.user?.username,
				meetingId: slug,
				apiKey: "539e389f-a3d0-4e6f-afbf-a4c0bf4f2dbd",
				containerId: "poziv",
				micEnabled: true,
				webcamEnabled: true,
				participantCanToggleSelfWebcam: true,
				participantCanToggleSelfMic: true,
				chatEnabled: true,
				screenShareEnabled: false,
				theme: "DARK",
				permissions: {
					askToJoin: false,
					toggleParticipantMic: true,
					toggleParticipantWebcam: true,
					toggleParticipantScreenshare: true,
					drawOnWhiteboard: true,
					toggleWhiteboard: true,
					toggleRecording: true,
					removeParticipant: true,
					endMeeting: true
				},
				redirectOnLeave: "https://zlatkasever.com/video-chat/" + slug + "/delete"
			}

			meeting.init(config)
		}
	})

	const meeting = new VideoSDKMeeting()
</script>

<svelte:head>
	<title>Zlatka Sever - Aktualna video sesija</title>
</svelte:head>

<div class="pozivwrapper">
	<div id="poziv" />
</div>

<script>
  import { onMount } from "svelte";

  import { supabase } from "../supabaseclient";
  let count;
  let loading = true;
  let ratelimit = 0;
  let ratetimer = null;

  onMount(async () => {
    let { data } = await supabase
      .from("counter")
      .select(`counter`)
      .eq("id", "1")
      .single();
    count = data.counter;

    loading = false;
  });
  async function add() {
    if (ratelimit > 5) {
      alert("Calm your tits");
      if (ratetimer != null) {
        clearTimeout(ratetimer);
        ratetimer = null;
      } else {
        ratetimer = setTimeout(() => {
          ratelimit = 0;
        }, 180000);
      }
      return;
    }
    ratelimit++;
    loading = true;
    count = count + 1;
    let { data } = await supabase
      .from("counter")
      .select(`counter`)
      .eq("id", "1")
      .single();
    const { data2 } = await supabase
      .from("counter")
      .update({ counter: data.counter + 1 })
      .match({ id: "1" });
    loading = false;
  }
  async function minus() {
    if (ratelimit > 5) {
      alert("Calm your tits");
      if (ratetimer != null) {
        clearTimeout(ratetimer);
        ratetimer = null;
      } else {
        ratetimer = setTimeout(() => {
          ratelimit = 0;
        }, 180000);
      }
      return;
    }
    ratelimit++;
    loading = true;
    if (count - 1 < 0) {
      return;
    }
    count = count - 1;
    let { data } = await supabase
      .from("counter")
      .select(`counter`)
      .eq("id", "1")
      .single();
    const { data2 } = await supabase
      .from("counter")
      .update({ counter: data.counter - 1 })
      .match({ id: "1" });

    loading = false;
  }
</script>

<section
  class="h-screen bg-black text-white grid place-items-center overflow-hidden "
>
  <img
    src="image.png"
    class="object-cover w-full h-full absolute top-0 left-0 z-0 opacity-20"
    alt=""
    srcset=""
  />
  <div class="z-10 max-w-screen-sm p-10">
    <div class="text-5xl text-center">Meghnaify</div>
    <div class="opacity-50 newfont text-center">
      +1 everytime meg uses a reference to a meme, yt video, movie or anything
    </div>
    <div class="text-7xl text-center mt-10 flex items-center justify-between">
      <div
        class="p-4 rounded-full hover:bg-gray-800 transition-all"
        on:click={minus}
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4"
          /></svg
        >
      </div>
      {#if loading}
        <div class="spinner" />
      {:else}
        <div>{count}</div>
      {/if}
      <div
        on:click={add}
        class="p-4 rounded-full hover:bg-gray-800 transition-all"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          /></svg
        >
      </div>
    </div>
  </div>
</section>

<style>
  section {
    font-family: "Albegos", sans-serif;
  }
  .newfont {
    font-family: "Inter", sans-serif;
  }
  .spinner {
    width: 40px;
    height: 40px;
    background-color: rgb(255, 255, 255);

    margin: 5px auto;
    -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
    animation: sk-rotateplane 1.2s infinite ease-in-out;
  }

  @-webkit-keyframes sk-rotateplane {
    0% {
      -webkit-transform: perspective(120px);
    }
    50% {
      -webkit-transform: perspective(120px) rotateY(180deg);
    }
    100% {
      -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
    }
  }

  @keyframes sk-rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    }
    50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
      -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    }
    100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
      -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
</style>

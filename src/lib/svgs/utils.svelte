<script context="module" lang="ts">
  export { Highlighted1, Highlighted2, Highlighted3 };
</script>

{#snippet Highlighted1(className:string)} 
 <svg
    viewBox="0 0 238 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="{className}"
  >
    <g>
      <path
        class="path-1"
        d="M0.68306 20.9995C44.7761 18.8457 73.3363 15.3457 237.683 13.9995"
        stroke="var(--color-ld-accent-500)"
        stroke-width="28"
      />
    </g>
  </svg>
{/snippet}

{#snippet Highlighted2(className:string)} 
 <svg
   viewBox="0 0 244 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="{className}"
  >
      <path
      class="path-2"
      d="M117.31 1C51.6512 2.5873 1 4.92139 1 33.7483C1 49.5614 27.3792 51.9417 49.1706 50.7288C70.9621 49.5159 191.389 50.7288 197.123 50.7288C213.18 50.7288 243 43.4514 243 28.8967C243 1 120.342 4.57143 98.5504 4.57143"
      stroke="var(--color-ld-accent-500)"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
{/snippet}

{#snippet Highlighted3(className:string)} 
 <svg
    viewBox="0 0 309 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
  >
    <path
      class="path-3"
      d="M0.141418 3.97803C7.14142 2.97803 280.641 6.97803 308.641 0.978027"
      stroke="var(--color-ld-accent-500)"
      stroke-width="2"
    />
  </svg>
{/snippet}
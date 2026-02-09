<script lang="ts">
    type Loading = 'lazy'|'eager'|undefined;
    type FetchPriority = 'high' | 'low' | 'auto';
    type Decoding = 'async' | 'sync' | 'auto';
    let { src, alt, width, height, loading, srcset, sizes, priority='auto', decoding='auto', className  }:{
        src:string, alt:string, width:number, height:number, loading?:Loading, srcset?:string, sizes?:string, priority:FetchPriority, decoding:Decoding, className?:string 
    } = $props();
</script>

<img
    class="image {className}"
	src={src}
	alt={alt}
	width={width}
	height={height}
	{srcset}
	{sizes}
	loading={loading}
    decoding={decoding}
	fetchpriority={priority}
/>

<style>
    
</style>
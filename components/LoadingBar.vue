<template>
  <div v-if="loading" class="loading-page">
    <div class='loader loader3'>
  <div>
    <div>
      <div>
        <div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script >

<style scoped lang="scss"> 

.loading-page {
    position: fixed;
    
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: 100;
  }
  $grey: rgba(0, 0, 0, .5);
$blue: rgba(0, 0, 255, .5);

@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

@keyframes rotate2 {
	0% {
		transform: rotate(0deg);
		border-top-color: $grey;
	}
	50% {
		transform: rotate(180deg);
		border-top-color: $blue;
	}
	100% {
		transform: rotate(360deg);
		border-top-color: $grey;
	}
}

* {
	box-sizing: border-box;
}

body {
	background: #f9f9f9;
	padding-bottom: 100px;
}

h1, h3 {
	display: block;
	margin: 0px auto;
	text-align: center;
	font-family: 'Tahoma';
	font-weight: lighter;
	color: $grey;
	letter-spacing: 1.5px;
}

h1 {
	margin: 50px auto;
}

@mixin loaderDivMixin {
	border-radius: 50%;
	padding: 8px;
	border: 2px solid transparent;
	animation: rotate linear 3.5s infinite;
}

.loader {
	position: relative;
	margin: 75px auto;
	width: 150px;
	height: 150px;
	display: block;
	overflow: hidden;
	div {
		height: 100%;
	}
}

/* loader 1 */
.loader1, .loader1 div {
	@include loaderDivMixin;
	border-top-color: $grey;
	border-bottom-color: $blue;
}

/*loader 2  */
.loader2, .loader2 div {
	@include loaderDivMixin;
	border-top-color: $blue;
	border-left-color: $grey;
	border-right-color: $grey;
}

/*loader 3  */
.loader3, .loader3 div {
	@include loaderDivMixin;
	border-top-color: $grey;
	border-left-color: $blue;
	animation-timing-function: cubic-bezier(.55, .38, .21, .88);
	animation-duration: 3s;
}

/* loader 4 */
.loader4, .loader4 div {
	@include loaderDivMixin;
	border-radius: 50%;
	padding: 4px;
	animation: rotate2 4s infinite linear;
}

div:hover {
	animation-play-state: paused;
}

.loader, .loader * {
	will-change: transform;
}

</style>
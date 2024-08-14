<template>
  <div class="background-image">
    <router-view />
  </div>


</template>

<script>
</script>

<style>

 .background-image {
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #ccc; 
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../public/background.png');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
} 

</style>

<template>
  <div class="background-image">
    <router-view />
    <footer>
        <p>© 2024 Polardag | All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
</script>

<style scoped>
.background-image {
  max-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #ccc; 
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../public/background.png');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Ändra till flex-start för att placera innehållet högre upp */
}

footer {
  margin-top: auto; /* Placerar footern längst ner */
  display: flex;
  justify-content: center;
}

p {
  margin: 1rem;
}

</style>

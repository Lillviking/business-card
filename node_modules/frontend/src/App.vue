<template>
  <div class="background-image">
    <div class="content-wrapper">
      <router-view />
    </div>
    <footer>
      <p>© 2024 Polardag | All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
</script>

<style scoped>
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
  position: relative;

  /* Flexbox settings */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Vertikalt centrerad */
  align-items: center;
  /* Horisontellt centrerad */
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1; /* Tar upp allt tillgängligt utrymme ovanför footern */
  width: 100%;
}

footer {
  margin-top: auto;
  /* Placerar footern längst ner */
  display: flex;
  justify-content: center;
}

p {
  margin: 1rem;
  font-size: 1rem;
}
</style>

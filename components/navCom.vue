<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand" href="/">
         <img src="/img/logo.png" alt="" class="footer__logo">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav mx-auto">
            <a class="nav-link active" aria-current="page" href="#">Главная</a>
            <a class="nav-link" href="#">Каталог</a>
            <a class="nav-link" href="#">О нас</a>
            <a class="nav-link" href="#">Расcрочка</a>
            <a class="nav-link" href="#">Гарантия</a>
            <a class="nav-link" href="#">Контакты</a>
          </div>
          <div class="navbar-nav">
            <a class="nav-link" href="#">Войти</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
  
<script>
export default {

  data() {
    return {
      title: 'Привет, мир!',
      description: 'Это мой компонент.'
    };
  }
};
</script>
  
<style scoped>
/* Стили для вашего компонента */
</style>
  
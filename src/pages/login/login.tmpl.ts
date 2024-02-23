import common from '@/styles/common.module.scss';

export default `
<main class="${common.layout_notAuth}">
  <div class="${common.card}">
    <h2>Авторизция</h2>
    <form>
      <field label="Логин" id="login" type="text"/>
      <field label="Пароль" id="password" type="password"/>
      <button type="submit"   class="${common.btn} ${common.mb1}">Войти</button>
      <a href="/?page=registration">Создать аккаунт</a>
    </form>
  </div>    
</main>
`;

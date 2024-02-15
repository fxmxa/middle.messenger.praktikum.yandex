import common from '@/styles/common.module.scss'

export default `
<main class="${common.layout_notAuth}">
  <div class="${common.card} ${common.card_modal}">
    <h2>Регистрация</h2>
    <form>
      <field label="Имя" id="first_name" type="text"/>
      <field label="Фамилия" id="second_name" type="text"/>
      <field label="Логин" id="login" type="text"/>
      <field label="Email" id="email" type="email"/>
      <field label="Пароль" id="password" type="password"/>
      <field label="Телефон" id="phone" type="text"/>
      <button type="submit"   class="${common.btn} ${common.mb1}">Зарегистрироваться</button>
      <a href="/?page=login">Воите в аккаунт</a>
    </form>
  </div>
</main>
`

import common from '@/styles/common.module.scss'

export default `
<div class="${common.layout_notAuth}">
  <div class="${common.card}">
    <h2>Настройки профиля</h2>
    <form>
      <avatarUpload/>
      <field value="Михаил" label="Имя" id="first_name" type="text"/>
      <field value="Костиков" label="Фамилия" id="second_name" type="text"/>
      <field value="Михаил_Костиков" label="Отображаемое_имя" id="display_name" type="text"/>
      <field value="kostikovmu" label="Логин" id="login" type="text"/>
      <field value="kostikovmu@ya.ru" label="Eamil" id="email" type="eamil"/>
      <field value="+7-977-343-12-12" label="Телефон" id="phone" type="text"/>
      <div class="${common.dFlex}  ${common.mb1}">
        <button type="submit" class="${common.btn} ${common.btn_secondary} ${common.mr1}">Отмена</button>
        <button type="submit" class="${common.btn}">Сохранить</button>
      </div>
      <a href="/?page=password-edit">Изменить пароль</a>
    </form>
  </div>    
</div>
`

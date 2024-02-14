import common from '@/styles/common.module.scss'

export default `
<div class="${common.layout_notAuth}">
  <div class="${common.card}">
    <h2>Изменить пароль</h2>
    <form>
      <field label="Старый_пароль" id="pass" type="password"/>
      <field label="Новый_пароль" id="newpass" type="password"/>
      <field label="Повторите_новый_пароль" id="repeatNewpass" type="password"/>
      <div class="${common.dFlex}  ${common.mb1}">
        <button type="submit" class="${common.btn} ${common.btn_secondary} ${common.mr1}">Отмена</button>
        <button type="submit" class="${common.btn}">Сохранить</button>
      </div>
    </form>
  </div>    
</div>
`

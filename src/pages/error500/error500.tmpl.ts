import common from '@/styles/common.module.scss';

export default `
<div>
  <h1 class="${common.mb0}">500</h1>
  <p class="${common.mt0}">Внутренняя ошибка сервера</p>
  <a href="/">Вернуться на главную</a>
  <a href="mailto:kostikovmu@ya.ru" target="_blank" class="${common.dB} ${common.mt1}">Сообщить об ошибке</a>
</div>    
`.trim();

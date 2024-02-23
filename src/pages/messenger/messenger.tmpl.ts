import common from '@/styles/common.module.scss';
import classes from './messenger.module.scss';

export default `
<div class="${common.layout_notAuth}">
  <div class="${classes.messenger}">
    <div class="${classes.messenger__sidebar}">
      <div class="${classes.messenger__contacts}">
        <contact name="Саша" message="Привет_как_дела" avatar="/avatar-default.png"/>
        <contact name="Дима" message="Ура)" avatar="/avatar-default.png"/>
      </div>
      <div class="${classes.messenger__settings}">
        <a href="/?page=profile">Настройки</a>
      </div>
    </div>
    <main class="${classes.messenger__main}">
        <div class="${classes.info}">
          <contact name="Дима" message="Занят" avatar="/avatar-default.png"/>
        </div>
        <div class="${classes.log}">
            <span class="${classes.log__date}">12.02.24</span>
            <ul>
              <li class="${classes.message}">
                <contact avatar="/avatar-default.png" name="Михаил" message="19:30"/>
                <div class="${classes.message__item}">Привет</div>
                <div class="${classes.message__item}">Как дела</div>
              </li>
              <li class="${classes.message}">
                <contact avatar="/avatar-default.png" name="Дима" message="19:45"/>
                <div class="${classes.message__item}">Отлично! :)</div>
                <div class="${classes.message__item}">Делаю свой мессаенджер)</div>
                <div class="${classes.message__item}">Ура)</div>
              </li>
              <li class="${classes.message}">
                <contact avatar="/avatar-default.png" name="Дима" message="19:45"/>
                <div class="${classes.message__item}">Отлично! :)</div>
                <div class="${classes.message__item}">Делаю свой мессаенджер)</div>
                <div class="${classes.message__item}">Ура)</div>
              </li>
              <li class="${classes.message}">
                <contact avatar="/avatar-default.png" name="Дима" message="19:45"/>
                <div class="${classes.message__item}">Отлично! :)</div>
                <div class="${classes.message__item}">Делаю свой мессаенджер)</div>
                <div class="${classes.message__item}">Ура)</div>
              </li>
              <li class="${classes.message}">
                <contact avatar="/avatar-default.png" name="Дима" message="19:45"/>
                <div class="${classes.message__item}">Отлично! :)</div>
                <div class="${classes.message__item}">Делаю свой мессаенджер)</div>
                <div class="${classes.message__item}">Ура)</div>
              </li>
              <li class="${classes.message}">
                <contact avatar="/avatar-default.png" name="Дима" message="19:45"/>
                <div class="${classes.message__item}">Отлично! :)</div>
                <div class="${classes.message__item}">Делаю свой мессаенджер)</div>
                <div class="${classes.message__item}">Ура)</div>
              </li>
            </ul>
        </div>
        <form class="${classes.send}">
          <input type="text" class="${classes.send__input}">
          <button class="${classes.send__button}">Отправить</button>
        </form>
    </div>
  </div>    
</div>
`;
